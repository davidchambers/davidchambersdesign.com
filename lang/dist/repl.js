import os from 'node:os';
import path from 'node:path';
import repl from 'node:repl';
import vm from 'node:vm';
import escodegen from 'escodegen';
import {
  attemptP,
  fork,
  promise
} from 'fluture';
import serif from './index.js';
import rewrite from './rewrite.js';
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain['fantasy-land/chain'](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f)
};
const {chain, map} = Prelude;
const evaluateModule = source => (() => {
  const context = vm.createContext(global);
  const module = Reflect.construct(vm.SourceTextModule, [
    source,
    { context }
  ]);
  return chain(_ => map(_ => module.namespace.default)(attemptP(() => module.evaluate())))(attemptP(() => module.link((specifier, referencingModule) => promise(map(entries => (() => {
    const module = Reflect.construct(vm.SyntheticModule, [
      entries.map(([name]) => name),
      () => entries.forEach(([name, value]) => module.setExport(name, value)),
      {
        identifier: specifier,
        context: referencingModule.context
      }
    ]);
    return module;
  })())(map(Object.entries)(attemptP(() => import(specifier))))))));
})();
const read = serifSource => (() => {
  const serifAst = serif.parse(`export default ${ serifSource };`)('[repl]');
  return Prelude.chain(jsAst => evaluateModule(escodegen.generate(jsAst)))(serif.trans(rewrite(serifAst))(_importPath => []));
})();
const print = x => (() => {
  const repr = Object.prototype.toString.call(x);
  return repr === '[object Null]' || repr === '[object Undefined]' || repr === '[object Boolean]' ? `\x1B[35m${ x }\x1B[0m` : repr === '[object Number]' ? `\x1B[33m${ x }\x1B[0m` : repr === '[object String]' ? `\x1B[32m${ JSON.stringify(x) }\x1B[0m` : repr === '[object Symbol]' ? `Symbol.for ${ print(Symbol.keyFor(x)) }` : repr === '[object Date]' ? `Reflect.construct (Date, [${ print(Number(x)) }])` : repr === '[object RegExp]' ? `RegExp (${ print(x.source) }, ${ print(x.flags) })` : repr === '[object Set]' ? `Reflect.construct (Set, [${ print(Array.from(x)) }])` : repr === '[object Map]' ? `Reflect.construct (Map, [${ print(Array.from(x)) }])` : repr === '[object Array]' ? '[' + x.map(print).join(', ') + ']' : repr === '[object Object]' ? '{' + Reflect.ownKeys(x).map(k => `[${ print(k) }]: ${ print(x[k]) }`).join(', ') + '}' : `${ x }`;
})();
const server = repl.start({
  prompt: '>>> ',
  eval: (code, _context, _filename, callback) => fork(err => (() => {
    console.error(err);
    console.log();
    return server.displayPrompt(false);
  })())(result => callback(null, result))(read(code)),
  writer: value => print(value) + '\n'
});
server.setupHistory(path.join(os.homedir(), '.serif-repl-history'), error => undefined);
