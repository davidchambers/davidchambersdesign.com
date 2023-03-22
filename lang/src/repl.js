import os           from 'node:os';
import path         from 'node:path';
import repl         from 'node:repl';
import vm           from 'node:vm';

import escodegen    from 'escodegen';
import {attemptP, chain, fork, map, promise} from 'fluture';

import serif        from './index.js';
import rewrite      from './rewrite.js';


function evaluateModule(source) {
  const context = vm.createContext(global);
  const module = Reflect.construct(vm.SourceTextModule, [source, {context}]);
  return (
    chain (_ => map(_ => module.namespace.default)
                   (attemptP(() => module.evaluate())))
          (attemptP(() => module.link((specifier, referencingModule) =>
                      promise(map(entries => {
                                    const module = Reflect.construct(vm.SyntheticModule, [
                                      entries.map(([name]) => name),
                                      () => {
                                        for (const [name, value] of entries) {
                                          module.setExport(name, value);
                                        }
                                      },
                                      {identifier: specifier, context: referencingModule.context},
                                    ]);
                                    return module;
                                  })
                                 (map(Object.entries)
                                     (attemptP(() => import(specifier)))))
                    )))
  );
}

function read(serifSource) {
  const serifAst = serif.parse(`export default ${serifSource};`, '[repl]');
  return (
    chain(jsAst => {
            const jsSource = escodegen.generate(jsAst);
            return evaluateModule(jsSource);
          })
         (serif.trans(rewrite(serifAst), _importPath => []))
  );
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
  eval: (code, _context, _filename, callback) => {
    fork(err => {
           console.error(err);
           console.log();
           server.displayPrompt(false);
         })
        (result => {
           callback(null, result);
         })
        (read(code))
  },
  writer: value => print(value) + '\n',
});

server.setupHistory(
  path.join(os.homedir(), '.serif-repl-history'),
  err => { if (err != null) throw err; }
);
