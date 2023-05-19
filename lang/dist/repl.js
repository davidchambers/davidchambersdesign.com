import {attempt, fork, resolve} from "fluture";
import {generate} from "astring";
import {Block, Expression, Number, String} from "./InternalNode.js";
import codegen from "./codegen.js";
import * as grammar from "./grammar.js";
import rewrite from "./rewrite.js";
const trim = string => string.trim();
const joinWith = separator => xs => xs.join(separator);
const concat = this$ => that => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return this$.concat(that);
  }
  if ($discriminant === "[object String]") {
    return this$.concat(that);
  }
  return this$["fantasy-land/concat"](that);
})(globalThis.Object.prototype.toString.call(this$));
const map = f => xs => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return xs.map(x => f(x));
  }
  return xs["fantasy-land/map"](f);
})(globalThis.Object.prototype.toString.call(xs));
const chain = f => x => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return x.flatMap(x => f(x));
  }
  if ($discriminant === "[object Function]") {
    return y => x(f(y))(y);
  }
  return x["fantasy-land/chain"](f);
})(globalThis.Object.prototype.toString.call(x));
const $00230 = "\u001b[0m";
const $00231 = "\u001b[1m";
const $00237 = "\u001b[7m";
const $002322 = "\u001b[22m";
const $002327 = "\u001b[27m";
const $002332 = "\u001b[32m";
const $002333 = "\u001b[33m";
const $002335 = "\u001b[35m";
const print = x => ($value => {
  if ($value === "[object Null]") {
    return $002335 + x + $00230;
  }
  if ($value === "[object Undefined]") {
    return $002335 + x + $00230;
  }
  if ($value === "[object Boolean]") {
    return $002335 + x + $00230;
  }
  if ($value === "[object Number]") {
    return $002333 + x + $00230;
  }
  if ($value === "[object String]") {
    return $002332 + JSON.stringify(x) + $00230;
  }
  if ($value === "[object Symbol]") {
    return "Symbol.for " + print(Symbol.keyFor(x));
  }
  if ($value === "[object Date]") {
    return "Date.new " + print(Number(x));
  }
  if ($value === "[object RegExp]") {
    return x.flags === "" ? "RegExp " + print(x.source) : "RegExp (" + print(x.source) + ", " + print(x.flags) + ")";
  }
  if ($value === "[object Set]") {
    return "Set.new " + print(globalThis.Array.from(x));
  }
  if ($value === "[object Map]") {
    return "Map.new " + print(globalThis.Array.from(x));
  }
  if ($value === "[object Array]") {
    return "[" + joinWith(", ")(map(print)(x)) + "]";
  }
  if ($value === "[object Object]") {
    return "{" + joinWith(", ")(map(k => "[" + print(k) + "]: " + print(x[k]))(Reflect.ownKeys(x))) + "}";
  }
  {
    const x = $value;
    return String(x);
  }
})(globalThis.Object.prototype.toString.call(x));
const processInput = serifSourceText => chain(serifAst => (serifAst => (esAst => (esSourceText => {
  console.error(esSourceText);
  return chain(esResult => resolve(print(esResult)))(attempt(() => {
    return eval(esSourceText);
  }));
})(generate(esAst)))(($value => {
  if ($value.$tag === "Module" && $value.$size === 3) {
    if (globalThis.Array.isArray($value[1])) {
      if ($value[1].length === 1) {
        if ($value[1][0].$tag === "ExportDefaultDeclaration" && $value[1][0].$size === 1) {
          const declaration = $value[1][0][0];
          {
            const statements = $value[2];
            return codegen(Block([...statements, Expression(declaration)]));
          }
        }
      }
    }
  }
  throw globalThis.Error("Pattern matching failure");
})(serifAst)))(rewrite(serifAst)))(attempt(() => {
  return grammar.parse(concat("export default ")(concat(serifSourceText)(";")), {
    grammarSource: "[repl]"
  });
}));
const repl = _ => {
  const input = window.prompt("\n>>>");
  ($value => {
    if ($value === ":exit") {
      console.log("");
      Deno.exit();
    }
    if ($value === ":quit") {
      console.log("");
      Deno.exit();
    }
    {
      fork($ => repl(console.error($)))($ => repl(console.log($)))(processInput(input));
    }
    throw globalThis.Error("Pattern matching failure");
  })(trim(input));
};
console.log(concat($00237)(concat(" Serif REPL ")(concat($002327)(concat(" ")(concat($00231)(concat(":quit")(concat($002322)(" to exit"))))))));
repl(8);
