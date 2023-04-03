import {a, aside$0027, code, em, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
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
const body = [p(["Many of those who write JavaScript do not come from programming\n    backgrounds (while I've written plenty of PHP, Python, and\n    JavaScript, I don't have much experience with \"real\" programming\n    languages", a({
  href: "#footnote"
})(["*"]), "). As a result, a significant\n    portion of JavaScript coders do not think of variables as pointers\n    to memory addresses. This leads to confusion in cases such as this:"]), code$002Dblock("javascript")(`var fruits = ['orange', 'lime'];
var colours = fruits; // naïve attempt to duplicate array
colours.push('yellow');
`), p(["One might be surprised to learn that ", code(["fruits"]), " now contains\n    not just \"orange\" and \"lime\" but also \"yellow\". Oops! Here's how\n    it went wrong:"]), code$002Dblock("javascript")(`var fruits = ['orange', 'lime'];
// fruits points to array containing "orange" and "lime"

var colours = fruits;
// colours now points to that same array!
`), p(["How, then, does one create a copy of the original array? ", em(["Slice!"])]), code$002Dblock("javascript")(`var colours = fruits.slice();
`), aside$0027({
  id: "footnote"
})(["* Languages such as C.\n    Like ", a({
  href: "http://www.quirksmode.org/about/"
})(["ppk"]), ",\n    I take care to include quotation marks. ;)"])];
export default {
  id: 35,
  slug: "duplicating-arrays-in-javascript",
  title: ["Duplicating arrays in JavaScript"],
  datetime: datetime("2010-01-09")("19:26:00")("Pacific/Auckland"),
  tags: ["javascript"],
  body
};
