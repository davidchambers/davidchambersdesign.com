import {attempt, attemptP, fork, resolve} from "fluture";
import {generate} from "astring";
import * as Node from "./Node.js";
import * as serif from "./index.js";
const construct = constructor => args => globalThis.Reflect.construct(constructor, args);
const equals = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return (() => {
        switch (globalThis.Object.prototype.toString.call(that)) {
          case "[object Array]":
            return this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]));
          default:
            return false;
        }
      })();
    default:
      return this$ === that;
  }
})();
const concat = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
    case "[object String]":
      return this$.concat(that);
    default:
      return this$["fantasy-land/concat"](that);
  }
})();
const reduce = f => y => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.reduce((y, x) => f(y)(x), y);
    default:
      return xs["fantasy-land/reduce"](f, y);
  }
})();
const map = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const chain = f => x => (() => {
  switch (globalThis.Object.prototype.toString.call(x)) {
    case "[object Array]":
      return x.flatMap(x => f(x));
    case "[object Function]":
      return y => x(f(y))(y);
    default:
      return x["fantasy-land/chain"](f);
  }
})();
const contains = this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these);
const readInput = reader => (() => {
  const decoder = construct(TextDecoder)([]);
  const uint8 = construct(Uint8Array)([1024]);
  const recur = text => chain(n => equals(null)(n) ? resolve(text) : recur(concat(text)(decoder.decode((args => target => target.slice.apply(target, args))([0, n])(uint8)))))(attemptP(() => reader.read(uint8)));
  return recur("");
})();
const $00230 = "\u001b[0m";
const $00231 = "\u001b[1m";
const $00237 = "\u001b[7m";
const $002322 = "\u001b[22m";
const $002327 = "\u001b[27m";
const $002332 = "\u001b[32m";
const $002333 = "\u001b[33m";
const $002335 = "\u001b[35m";
const print = x => (() => {
  switch ((args => target => target.call.apply(target, args))([x])(Object.prototype.toString)) {
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
      return equals("")(x.flags) ? "RegExp " + print(x.source) : "RegExp (" + print(x.source) + ", " + print(x.flags) + ")";
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
const processInput = serifSourceText => chain(serifAst => chain(serifAst => (({exports, statements}) => (esAst => (esSourceText => chain(esResult => resolve(print(esResult)))(attempt(() => eval(esSourceText))))(generate(esAst)))(serif.esModuleFromSerifModule(Node.BlockExpression(statements)(exports[0].declaration))))(serif.changeExtensions(serifAst)))(serif.rewrite(serifAst)(importPath => [])))(serif.parse("[repl]")(concat("export default ")(concat(serifSourceText)(";"))));
const repl = _ => (() => {
  const input = prompt("\n>>>");
  return contains((args => target => target.trim.apply(target, args))([])(input))([":exit", ":quit"]) ? (() => {
    console.log("");
    return Deno.exit();
  })() : fork($ => repl(console.error($)))($ => repl(console.log($)))(processInput(input));
})();
console.log(concat($00237)(concat(" Serif REPL ")(concat($002327)(concat(" ")(concat($00231)(concat(":quit")(concat($002322)(" to exit"))))))));
repl(8);
