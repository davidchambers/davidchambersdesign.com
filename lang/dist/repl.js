import os from "node:os";
import repl from "node:repl";
import vm from "node:vm";
import {generate} from "astring";
import {attemptP, fork, promise, resolve} from "fluture";
import * as serif from "./index.js";
import * as path from "./path.js";
const {XOR, OR, subtract, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, empty, reduce, reduceRight, filter, reject, map, flip, of, chain, contains} = {
  XOR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
      default:
        return lhs ^ rhs;
    }
  })(),
  OR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
      default:
        return lhs | rhs;
    }
  })(),
  subtract: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
      default:
        return lhs - rhs;
    }
  })(),
  apply: f => args => f.apply(null, args),
  construct: constructor => args => globalThis.Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[globalThis.Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : globalThis.Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  empty: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return [];
      case "Object":
        return {};
      case "String":
        return "";
      case "Set":
      case "Map":
        return globalThis.Reflect.construct(typeRep, [[]]);
      default:
        return typeRep["fantasy-land/empty"]();
    }
  })(),
  reduce: f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter(x => !f(x)),
  map: f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  of: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return globalThis.Array.of;
      case "Function":
        return x => y => x;
      case "Set":
        return x => globalThis.Reflect.construct(typeRep, [[x]]);
      default:
        return typeRep["fantasy-land/of"];
    }
  })(),
  chain: f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f),
  contains: this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these)
};
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
