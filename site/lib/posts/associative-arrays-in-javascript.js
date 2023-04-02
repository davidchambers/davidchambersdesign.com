import {a, code, em, p, strong} from "../elements.js";
import datetime from "../datetime.js";
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
  apply: f => args => f.apply(null, args),
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
const body = [p([strong(["JavaScript does not have associative arrays."]), "\n    (This will be old news to many.)"]), p(["Confusion arises from the fact that array syntax in JavaScript is\n    very similar to array syntax in PHP, a language that ", em(["does"]), "\n    have associative arrays. Additionally, ", strong(["any object in\n    JavaScript can be treated as an associative array"]), ". This means\n    that if one creates a JavaScript ", code(["Array"]), " object and\n    proceeds to use PHP's associative array syntax in an attempt to\n    add items to it, one ", em(["will"]), " succeed in assigning it\n    attribute–value pairs. The object in question need not be an ", code(["Array"]), " for this to work, though, so for the sake of\n    clarity using a vanilla ", code(["Object"]), " is advisable."]), p(["To gain a more detailed understanding of why JavaScript ", em(["appears"]), " to have associative arrays, read ", a({
  href: "http://andrewdupont.net/2006/05/18/javascript-associative-arrays-considered-harmful/"
})([`JavaScript "Associative Arrays" Considered Harmful`]), "."])];
export default {
  id: 19,
  slug: "associative-arrays-in-javascript",
  title: ["Associative arrays in JavaScript"],
  datetime: datetime("2009-06-29")("19:14:00")("Pacific/Auckland"),
  tags: ["best-practice", "javascript"],
  body
};
