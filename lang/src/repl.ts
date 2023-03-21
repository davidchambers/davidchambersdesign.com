import os           from 'node:os';
import path         from 'node:path';
import repl         from 'node:repl';
import vm           from 'node:vm';

import escodegen    from 'escodegen';

import serif        from './index.js';


async function evaluateModule(source: string): Promise<unknown> {
  const context = vm.createContext(global);
  const module: any = Reflect.construct((vm as any).SourceTextModule, [source, {context}]);
  await module.link(async (specifier: string, referencingModule: any) => {
    const entries = Object.entries(await import(specifier));
    const module: any = Reflect.construct((vm as any).SyntheticModule, [
      entries.map(([name]) => name),
      () => {
        for (const [name, value] of entries) {
          module.setExport(name, value);
        }
      },
      {identifier: specifier, context: referencingModule.context},
    ]);
    return module;
  });
  await module.evaluate();
  return module.namespace.default;
}

async function read(serifSource: string): Promise<unknown> {
  const serifAst = serif.parse(`export default ${serifSource};`, '[repl]');
  const jsAst = await serif.trans(serifAst, _importPath => []);
  const jsSource = escodegen.generate(jsAst);
  return evaluateModule(jsSource);
}

function print(x: any): string {
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
      return `Symbol.for ${print(Symbol.keyFor(x))}`;
    case '[object Date]':
      return `Reflect.construct (Date, [${print(Number(x))}])`;
    case '[object RegExp]':
      return `RegExp (${print(x.source)}, ${print(x.flags)})`;
    case '[object Set]':
      return `Reflect.construct (Set, [${print(Array.from(x))}])`;
    case '[object Map]':
      return `Reflect.construct (Map, [${print(Array.from(x))}])`;
    case '[object Array]':
      return '[' + x.map(print).join(', ') + ']';
    case '[object Object]':
      return '{' + Reflect.ownKeys(x).map(k => `[${print(k)}]: ${print(x[k])}`).join(', ') + '}';
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
      console.error(err);
      console.log();
      server.displayPrompt(false);
    }
  },
  writer: value => print(value) + '\n',
});

server.setupHistory(
  path.join(os.homedir(), '.serif-repl-history'),
  err => { if (err != null) throw err; }
);
