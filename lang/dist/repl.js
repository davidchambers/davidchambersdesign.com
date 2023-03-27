import os from "node:os";
import repl from "node:repl";
import vm from "node:vm";
import {generate} from "astring";
import {attemptP, fork, promise, resolve} from "fluture";
import * as serif from "./index.js";
import * as path from "./path.js";
import rewrite from "./rewrite.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b,
  reject: predicate => Prelude.filter(x => !predicate(x))
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, map, not, reject} = Prelude;
const evaluateModule = sourceText => (context => (module => Prelude.chain(_ => Prelude.chain(_ => resolve(module.namespace.default))(attemptP(() => Prelude._apply("evaluate")([])(module))))(attemptP(() => Prelude._apply("link")([(specifier, referencingModule) => map(map(entries => promise((() => {
  const module = construct(vm.SyntheticModule)([Prelude.map(([name]) => name)(entries), () => Prelude._apply("forEach")([flip(Prelude._apply("setExport"))(module)])(entries), {
    identifier: specifier,
    context: referencingModule.context
  }]);
  return module;
})())))(map(Object.entries)(attemptP(() => import(specifier))))])(module))))(construct(vm.SourceTextModule)([sourceText, {
  context
}])))(vm.createContext(global));
const read = serifSource => Prelude.chain(serifAst => Prelude.chain(serifAst$0027 => (serifAst$0027$0027 => (esAst => (esSourceText => evaluateModule(esSourceText))(apply([esAst, {}])(generate)))(serif.esModuleFromSerifModule(serifAst$0027$0027)))(serif.changeExtensions(serifAst$0027)))(serif.rewrite(serifAst)(_importPath => [])))(serif.parse("[repl]")(`export default ${serifSource};`));
const print = x => (() => {
  switch (apply([Object.prototype.toString, x, []])(Reflect.apply)) {
    case "[object Null]":
      return `\x1B[35m${x}\x1B[0m`;
    case "[object Undefined]":
      return `\x1B[35m${x}\x1B[0m`;
    case "[object Boolean]":
      return `\x1B[35m${x}\x1B[0m`;
    case "[object Number]":
      return `\x1B[33m${x}\x1B[0m`;
    case "[object String]":
      return `\x1B[32m${JSON.stringify(x)}\x1B[0m`;
    case "[object Symbol]":
      return `Symbol.for ${print(Symbol.keyFor(x))}`;
    case "[object Date]":
      return `construct Date [${print(Number(x))}]`;
    case "[object RegExp]":
      return Object.is("", x.flags) ? `RegExp ${print(x.source)}` : `apply [${print(x.source)}, ${print(x.flags)}] RegExp`;
    case "[object Set]":
      return `construct Set [${print(Array.from(x))}]`;
    case "[object Map]":
      return `construct Map [${print(Array.from(x))}]`;
    case "[object Array]":
      return `[${Prelude._apply("join")([", "])(Prelude.map(print)(x))}]`;
    case "[object Object]":
      return `{${Prelude._apply("join")([", "])(map(k => `[${print(k)}]: ${print(x[k])}`)(Reflect.ownKeys(x)))}}`;
    default:
      return `${x}`;
  }
})();
const server = repl.start({
  prompt: ">>> ",
  eval: (code, _context, _filename, callback) => fork(err => (() => {
    console.error(err);
    console.log("");
    return Prelude._apply("displayPrompt")([false])(server);
  })())(result => apply([null, result])(callback))(read(code)),
  writer: value => print(value) + "\n"
});
Prelude._apply("setupHistory")([path.join([apply([])(os.homedir), ".serif-repl-history"]), error => undefined])(server);
