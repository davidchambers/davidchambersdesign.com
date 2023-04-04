import os from "node:os";
import repl from "node:repl";
import vm from "node:vm";
import {generate} from "astring";
import {attemptP, fork, promise, resolve} from "fluture";
import * as serif from "./index.js";
import * as path from "./path.js";
const apply = f => args => f.apply(null, args);
const construct = constructor => args => globalThis.Reflect.construct(constructor, args);
const equals = this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that;
const map = f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f);
const flip = f => y => x => f(x)(y);
const chain = f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f);
const evaluateModule = sourceText => (context => (module => chain(_ => chain(_ => resolve(module.namespace.default))(attemptP(() => (args => target => target.evaluate.apply(target, args))([])(module))))(attemptP(() => (args => target => target.link.apply(target, args))([(specifier, referencingModule) => map(map(entries => promise((() => {
  const module = construct(vm.SyntheticModule)([map(([name]) => name)(entries), () => (args => target => target.forEach.apply(target, args))([flip(args => target => target.setExport.apply(target, args))(module)])(entries), {
    identifier: specifier,
    context: referencingModule.context
  }]);
  return module;
})())))(map(Object.entries)(attemptP(() => import(specifier))))])(module))))(construct(vm.SourceTextModule)([sourceText, {
  context
}])))(vm.createContext(globalThis));
const read = serifSource => chain(serifAst => chain(serifAst$0027 => (serifAst$0027$0027 => (esAst => (esSourceText => evaluateModule(esSourceText))(apply(generate)([esAst, {}])))(serif.esModuleFromSerifModule(serifAst$0027$0027)))(serif.changeExtensions(serifAst$0027)))(serif.rewrite(serifAst)(_importPath => [])))(serif.parse("[repl]")("export default " + serifSource + ";"));
const $00230 = "\u001b[0m";
const $002332 = "\u001b[32m";
const $002333 = "\u001b[33m";
const $002335 = "\u001b[35m";
const print = x => (() => {
  switch (apply(Reflect.apply)([Object.prototype.toString, x, []])) {
    case "[object Null]":
    case "[object Undefined]":
    case "[object Boolean]":
      return $002335 + x + $00230;
    case "[object Number]":
      return $002333 + x + $00230;
    case "[object String]":
      return $002332 + JSON.stringify(x) + $00230;
    case "[object Symbol]":
      return "Symbol.for " + print(Symbol.keyFor(x));
    case "[object Date]":
      return "construct Date [" + print(Number(x)) + "]";
    case "[object RegExp]":
      return equals("")(x.flags) ? "RegExp " + print(x.source) : "construct RegExp [" + print(x.source) + ", " + print(x.flags) + "]";
    case "[object Set]":
      return "construct Set [" + print(Array.from(x)) + "]";
    case "[object Map]":
      return "construct Map [" + print(Array.from(x)) + "]";
    case "[object Array]":
      return "[" + (args => target => target.join.apply(target, args))([", "])(map(print)(x)) + "]";
    case "[object Object]":
      return "{" + (args => target => target.join.apply(target, args))([", "])(map(k => "[" + print(k) + "]: " + print(x[k]))(Reflect.ownKeys(x))) + "}";
    default:
      return String(x);
  }
})();
const server = repl.start({
  prompt: ">>> ",
  eval: (code, _context, _filename, callback) => fork(err => (() => {
    console.error(err);
    console.log("");
    return (args => target => target.displayPrompt.apply(target, args))([false])(server);
  })())(result => apply(callback)([null, result]))(read(code)),
  writer: value => print(value) + "\n"
});
(args => target => target.setupHistory.apply(target, args))([path.join([apply(os.homedir)([]), ".serif-repl-history"]), error => undefined])(server);
