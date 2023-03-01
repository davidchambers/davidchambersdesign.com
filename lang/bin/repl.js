import os           from 'node:os';
import path         from 'node:path';
import repl         from 'node:repl';
import vm           from 'node:vm';

import escodegen    from 'escodegen';

import serif        from 'serif';


async function evaluateModule(source) {
  const context = vm.createContext(global);
  const module = new vm.SourceTextModule(source, {context});
  await module.link(async (specifier, referencingModule) => {
    const entries = Object.entries(await import(specifier));
    const module = new vm.SyntheticModule(
      entries.map(([name]) => name),
      () => {
        for (const [name, value] of entries) {
          module.setExport(name, value);
        }
      },
      {identifier: specifier, context: referencingModule.context}
    );
    return module;
  });
  await module.evaluate();
  return module.namespace.default;
}

async function read(serifSource) {
  const serifAst = serif.parse(
    `import * from "serif/es"\nexport default ${serifSource}`
  );
  const jsAst = await serif.trans(serifAst);
  const jsSource = escodegen.generate(jsAst);
  return evaluateModule(jsSource);
}

function print(x) {
  switch (Object.prototype.toString.call(x)) {
    case '[object Null]':
    case '[object Undefined]':
    case '[object Boolean]':
      return `\x1B[35m${x}\x1B[0m`;
    case '[object Number]':
      return `\x1B[33m${x}\x1B[0m`;
    case '[object String]':
      return `\x1B[32m${JSON.stringify(x)}\x1B[0m`;
    case '[object Symbol]':
      return `\x1B[36m:${Symbol.keyFor(x)}\x1B[0m`;
    case '[object Date]':
      return `(\x1B[1mnew\x1B[0m Date ${print(Number(x))})`;
    case '[object RegExp]':
      return `(\x1B[1mnew\x1B[0m RegExp ${print(x.source)} ${print(x.flags)})`;
    case '[object Set]':
      return `(\x1B[1mnew\x1B[0m Set ${print(Array.from(x))})`;
    case '[object Map]':
      return `(\x1B[1mnew\x1B[0m Map ${print(Array.from(x))})`;
    case '[object Array]':
      return '[' + x.map(print).join(' ') + ']';
    case '[object Object]':
      return '{' + (
        Reflect.ownKeys(x).map(k => print(k) + ' ' + print(x[k])).join(' ')
      ) + '}';
    default:
      return `${x}`;
  }
}

const server = repl.start({
  prompt: '>>> ',
  eval: async (code, _context, _filename, callback) => {
    try {
      callback(null, await read(code));
    } catch (err) {
      if (err.name === 'SyntaxError') {
        callback(new repl.Recoverable(err));
      } else if (err.name === 'ReferenceError') {
        err.message = err.message.replace(
          /^_([^ ]+)/,
          (_, encoded) => encoded.replace(
            /[$]([0-9A-F]{4})/g,
            (_, code) => String.fromCharCode(parseInt(code, 16))
          )
        );
        console.error(err);
        console.log();
        server.displayPrompt(false);
      }
    }
  },
  writer: value => print(value) + '\n',
});

server.setupHistory(
  path.join(os.homedir(), '.serif-repl-history'),
  err => { if (err != null) throw err; }
);
