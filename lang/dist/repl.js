import os from "node:os";
import repl from "node:repl";
import vm from "node:vm";
import {generate} from "astring";
import {attemptP, fork, promise, resolve} from "fluture";
import * as serif from "./index.js";
import * as path from "./path.js";
import rewrite from "./rewrite.js";
const Prelude = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["<<"]: rhs => lhs => lhs << rhs,
      [">>"]: rhs => lhs => lhs >> rhs,
      [">>>"]: rhs => lhs => lhs >>> rhs,
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => Prelude.filter(x => Prelude.not(f(x))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const evaluateModule = sourceText => (context => (module => Prelude.chain(_ => Prelude.chain(_ => resolve(module.namespace.default))(attemptP(() => Prelude._apply("evaluate")([])(module))))(attemptP(() => Prelude._apply("link")([(specifier, referencingModule) => map(map(entries => promise((() => {
  const module = construct(vm.SyntheticModule)([Prelude.map(([name]) => name)(entries), () => Prelude._apply("forEach")([flip(Prelude._apply("setExport"))(module)])(entries), {
    identifier: specifier,
    context: referencingModule.context
  }]);
  return module;
})())))(map(Object.entries)(attemptP(() => import(specifier))))])(module))))(construct(vm.SourceTextModule)([sourceText, {
  context
}])))(vm.createContext(global));
const read = serifSource => Prelude.chain(serifAst => Prelude.chain(serifAst$0027 => (serifAst$0027$0027 => (esAst => (esSourceText => evaluateModule(esSourceText))(apply([esAst, {}])(generate)))(serif.esModuleFromSerifModule(serifAst$0027$0027)))(serif.changeExtensions(serifAst$0027)))(serif.rewrite(serifAst)(_importPath => [])))(serif.parse("[repl]")("export default " + serifSource + ";"));
const $00230 = "\u001b[0m";
const $002332 = "\u001b[32m";
const $002333 = "\u001b[33m";
const $002335 = "\u001b[35m";
const print = x => (() => {
  switch (apply([Object.prototype.toString, x, []])(Reflect.apply)) {
    case "[object Null]":
      return $002335 + x + $00230;
    case "[object Undefined]":
      return $002335 + x + $00230;
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
      return Prelude.equals("")(x.flags) ? "RegExp " + print(x.source) : "construct RegExp [" + print(x.source) + ", " + print(x.flags) + "]";
    case "[object Set]":
      return "construct Set [" + print(Array.from(x)) + "]";
    case "[object Map]":
      return "construct Map [" + print(Array.from(x)) + "]";
    case "[object Array]":
      return "[" + Prelude._apply("join")([", "])(Prelude.map(print)(x)) + "]";
    case "[object Object]":
      return "{" + Prelude._apply("join")([", "])(map(k => "[" + print(k) + "]: " + print(x[k]))(Reflect.ownKeys(x))) + "}";
    default:
      return String(x);
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
