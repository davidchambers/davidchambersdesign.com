import {code, h3, p, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
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
const body = [p(["JavaScript's regular expressions are less than awesome, sadly.\n    One limitation is the lack of start of string and end of string\n    anchors. In Perl, for example, ", code(["\\A"]), " matches the\n    start of a string, ", code(["\\Z"]), " the end."]), p(["Most of the time it's possible to get by with ", code(["^"]), " and ", code(["$"]), " which act like ", code(["\\A"]), " and ", code(["\\Z"]), " ", strong(["except in multiline mode"]), " where they match the start and\n    end of any line."]), p(["It's possible, though, to have a lookahead act as an end of string\n    anchor in multiline mode:"]), code$002Dblock("javascript")(`> /bar(?![\\s\\S])/m.test('foo\\nbar')
true
> /bar(?![\\s\\S])/m.test('foo\\nbar\\n')
false
> /bar(?![\\s\\S])/m.test('foo\\nbar\\nbaz')
false
`), p([code(["(?![\\s\\S])"]), " at the end of the pattern is equivalent to ", code(["\\Z"]), "."]), h3(["Start of string anchor?"]), p(["Unfortunately, since JavaScript offers lookahead but not lookbehind,\n    this approach can't be used to simulate ", code(["\\A"]), "."])];
export default {
  id: 86,
  slug: "end-of-string-anchor-in-javascript-regular-expressions",
  title: ["End of string anchor in JavaScript regular expressions"],
  datetime: datetime("2011-05-22")("18:30:00")("America/Los_Angeles"),
  tags: ["javascript", "regex", "regular-expressions"],
  body
};
