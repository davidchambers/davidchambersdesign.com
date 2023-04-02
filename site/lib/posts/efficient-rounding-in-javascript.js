import {code, p, strong} from "../elements.js";
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
const body = [p(["So you have some number, ", code(["x"]), ", which you want to round\n    to the nearest integer. Easy, right?"]), code$002Dblock("javascript")(`x = Math.round(x);
`), p(["Sure, but is this the fastest option? I think not."]), code$002Dblock("javascript")(`x = x < 0 ? x - 0.5 >> 0 : x + 0.5 >> 0;
`), p(["What the heck's going on here? ", code([">>"]), " is JavaScript's\n    right shift operator. It shifts a number's binary representation ", code(["n"]), " bits to the right, where ", code(["n"]), " is the\n    value to the right of the operator. Since ", code(["n"]), " is ", code(["0"]), " in this case, no shifting will occur, although ", strong(["the resulting value will be an integer"]), "."]), p(["Note that this approach results in ", code(["-82.5"]), " being\n    rounded to ", code(["-83"]), "."]), p(["If, for some reason, your code calls ", code(["Math.round()"]), "\n    millions of times, it may be worth investigating the bitwise\n    approach to avoid the overhead of all those function calls."]), p(["Stick to ", code(["Math.round()"]), " the rest of the\n    time, though, as it makes for much clearer code. ", strong(["Never optimize prematurely."])])];
export default {
  id: 68,
  slug: "efficient-rounding-in-javascript",
  title: ["Efficient rounding in JavaScript"],
  datetime: datetime("2010-08-31")("22:20:00")("Pacific/Auckland"),
  tags: ["javascript", "optimization", "performance"],
  body
};
