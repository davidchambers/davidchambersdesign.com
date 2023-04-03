import {a, p} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
import datetime from "../datetime.js";
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = {
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
  apply: f => args => f.apply(null, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter($ => not(f($))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const body = [p(["Earlier this week I discovered ", a({
  href: "http://ethanschoonover.com/solarized"
})(["Solarized"]), ",\n    \"a sixteen color palette [...] designed for use with\n    terminal and gui applications\"."]), p(["Bundles are available for all the popular editors;\n    I went ahead and cloned the ", a({
  href: "https://github.com/bobthecow/solarized-seestyle"
})(["Coda bundle"]), ".\n    While the code on my screen immediately looked very nice, a few of\n    Justin's colour choices didn't sit well with me.* I spent an hour\n    or two trying a large number of different combinations until my\n    JavaScript file was harmoniously highlighted."]), captioned$002Dimages([{
  alt: "Solarized code snippet",
  src: "/images/posts/84/solarized-code-snippet.png",
  caption: ["Solarized code snippet"]
}]), p(["I wanted an even intensity, but didn't allow myself to deviate\n    from Ethan's prescribed colours. I'm happy with the result: the\n    soft highlighting makes the code easier to understand without\n    being a distraction. Only regular expression literals leap\n    forward, but these tend to occur infrequently."]), p(["Coda users may be surprised to see method invocations\n    highlighted. That's one of the minor enhancements I've made\n    to the default mode. If you're interested, have a look at ", a({
  href: "https://bitbucket.org/davidchambers/javascript.mode"
})(["Javascript.mode"]), " on Bitbucket."]), p(["* Blue escape sequences within red regular expression literals\n    are too striking for my liking!"])];
export default {
  id: 84,
  slug: "solarized",
  title: ["Solarized"],
  datetime: datetime("2011-04-23")("02:20:00")("America/Los_Angeles"),
  tags: ["coda", "design", "programming", "solarized"],
  body
};
