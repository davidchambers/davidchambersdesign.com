import {attempt, fork, resolve} from "fluture";
import {generate} from "astring";
import {Just} from "./Maybe.js";
import {Block} from "./Node.js";
import * as serif from "./index.js";
const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const trim = string => string.trim();
const joinWith = separator => xs => xs.join(separator);
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
    case "[object Object]":
      return (() => {
        switch (globalThis.Object.prototype.toString.call(that)) {
          case "[object Object]":
            return typeof$(this$["fantasy-land/equals"]) === "function" ? this$["fantasy-land/equals"](that) : this$ === that;
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
      return this$.concat(that);
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
      return xs["fantasy-land/reduce"]((y, x) => f(y)(x), y);
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
const flip = f => y => x => f(x)(y);
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
const match = pattern => value => {
  switch (pattern.type) {
    case "any":
      return {};
    case "identifier":
      return {
        [pattern.name]: value
      };
    case "literal":
      if (equals(pattern.value)(value)) return {};
      return null$;
    case "data":
      if (typeof$(value) === "object" && value.$tag === pattern.tag && value.$values.length === pattern.patterns.length) {
        const context = {};
        for (let index = 0; index < pattern.patterns.length; index += 1) {
          const fragment = match(pattern.patterns[index])(value.$values[index]);
          if (fragment === null$) return null$;
          globalThis.Object.assign(context, fragment);
        }
        return context;
      }
      return null$;
    case "array":
      if (globalThis.Array.isArray(value)) {
        const patterns = pattern.patterns;
        const lengths = [];
        let slices = 0;
        for (let index = 0; index < patterns.length; index += 1) {
          if (patterns[index].type === "slice") {
            lengths[patterns[index].index = slices] = 0;
            slices += 1;
          }
        }
        if (slices === 0) {
          if (value.length !== patterns.length) return null$;
          const context = {};
          for (let index = 0; index < value.length; index += 1) {
            const fragment = match(patterns[index])(value[index]);
            if (fragment === null$) return null$;
            globalThis.Object.assign(context, fragment);
          }
          return context;
        }
        const min = patterns.length - slices;
        if (value.length < min) return null$;
        const lastIndex = slices - 1;
        lengths[lastIndex] = value.length - min;
        const fragments = globalThis.Array(patterns.length);
        while (true) {
          let index = 0;
          let valid = true;
          for (let patternIndex = 0; patternIndex < fragments.length; patternIndex += 1) {
            const pattern = patterns[patternIndex];
            const fragment = pattern.type === "slice" ? match({
              type: "identifier",
              name: pattern.name
            })(value.slice(index, index += lengths[pattern.index])) : match(pattern)(value[index++]);
            if (fragment === null$) {
              valid = false;
              break;
            }
            fragments[patternIndex] = fragment;
          }
          if (valid) return globalThis.Object.assign({}, ...fragments);
          index = lastIndex;
          while (lengths[index] === 0) index -= 1;
          if (index === 0) return null$;
          lengths[index - 1] += 1;
          while (index < lastIndex) lengths[index++] = 0;
          lengths[lastIndex] = value.length - min;
          index = 0;
          while (index < lastIndex) lengths[lastIndex] -= lengths[index++];
        }
      }
      return null$;
  }
};
const $00230 = "\u001b[0m";
const $00231 = "\u001b[1m";
const $00237 = "\u001b[7m";
const $002322 = "\u001b[22m";
const $002327 = "\u001b[27m";
const $002332 = "\u001b[32m";
const $002333 = "\u001b[33m";
const $002335 = "\u001b[35m";
const print = x => ($value => {
  const $match = flip(match)($value);
  {
    const $result = $match({
      type: "literal",
      value: "[object Null]"
    });
    if ($result != null$) {
      return (({}) => $002335 + x + $00230)($result);
    }
  }
  {
    const $result = $match({
      type: "literal",
      value: "[object Undefined]"
    });
    if ($result != null$) {
      return (({}) => $002335 + x + $00230)($result);
    }
  }
  {
    const $result = $match({
      type: "literal",
      value: "[object Boolean]"
    });
    if ($result != null$) {
      return (({}) => $002335 + x + $00230)($result);
    }
  }
  {
    const $result = $match({
      type: "literal",
      value: "[object Number]"
    });
    if ($result != null$) {
      return (({}) => $002333 + x + $00230)($result);
    }
  }
  {
    const $result = $match({
      type: "literal",
      value: "[object String]"
    });
    if ($result != null$) {
      return (({}) => $002332 + JSON.stringify(x) + $00230)($result);
    }
  }
  {
    const $result = $match({
      type: "literal",
      value: "[object Symbol]"
    });
    if ($result != null$) {
      return (({}) => "Symbol.for " + print(Symbol.keyFor(x)))($result);
    }
  }
  {
    const $result = $match({
      type: "literal",
      value: "[object Date]"
    });
    if ($result != null$) {
      return (({}) => "Date.new " + print(Number(x)))($result);
    }
  }
  {
    const $result = $match({
      type: "literal",
      value: "[object RegExp]"
    });
    if ($result != null$) {
      return (({}) => equals(x.flags)("") ? "RegExp " + print(x.source) : "RegExp (" + print(x.source) + ", " + print(x.flags) + ")")($result);
    }
  }
  {
    const $result = $match({
      type: "literal",
      value: "[object Set]"
    });
    if ($result != null$) {
      return (({}) => "Set.new " + print(Array.from(x)))($result);
    }
  }
  {
    const $result = $match({
      type: "literal",
      value: "[object Map]"
    });
    if ($result != null$) {
      return (({}) => "Map.new " + print(Array.from(x)))($result);
    }
  }
  {
    const $result = $match({
      type: "literal",
      value: "[object Array]"
    });
    if ($result != null$) {
      return (({}) => "[" + joinWith(", ")(map(print)(x)) + "]")($result);
    }
  }
  {
    const $result = $match({
      type: "literal",
      value: "[object Object]"
    });
    if ($result != null$) {
      return (({}) => "{" + joinWith(", ")(map(function (k) {
        return "[" + print(k) + "]: " + print(x[k]);
      })(Reflect.ownKeys(x))) + "}")($result);
    }
  }
  {
    const $result = $match({
      type: "identifier",
      name: "x"
    });
    if ($result != null$) {
      return (({x}) => String(x))($result);
    }
  }
})(Object.prototype.toString.call(x));
const processInput = serifSourceText => chain(serifAst => (serifAst => (({exports, statements}) => (esAst => (esSourceText => chain(esResult => resolve(print(esResult)))(attempt(function () {
  return eval(esSourceText);
})))(generate(esAst)))(serif.esModuleFromSerifModule(Block(statements)(Just(exports[0].declaration)))))(serif.changeExtensions(serifAst)))(serif.rewrite(serifAst)))(serif.parse("[repl]")(concat("export default ")(concat(serifSourceText)(";"))));
const repl = _ => (() => {
  const input = window.prompt("\n>>>");
  return contains(trim(input))([":exit", ":quit"]) ? (() => {
    console.log("");
    return Deno.exit();
  })() : fork($ => repl(console.error($)))($ => repl(console.log($)))(processInput(input));
})();
console.log(concat($00237)(concat(" Serif REPL ")(concat($002327)(concat(" ")(concat($00231)(concat(":quit")(concat($002322)(" to exit"))))))));
repl(8);
