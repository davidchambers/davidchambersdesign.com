import {a, blockquote, i, p} from "../elements.js";
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
const body = [p(["From Wikipedia on Mies van der Rohe's ", a({
  href: "http://en.wikipedia.org/wiki/Seagram_Building"
})(["Seagram Building"]), ":"]), blockquote([p(["[An] interesting feature of the Seagram Building is the window blinds.\n      As was common with International Style architects, Mies wanted the\n      building to have a uniform appearance. One aspect of a façade which\n      Mies disliked, was the disordered irregularity when window blinds are\n      drawn. Inevitably, people using different windows will draw blinds to\n      different heights, making the building appear disorganized. To reduce\n      this disproportionate appearance, Mies specified window blinds which\n      only operated in three positions – fully open, halfway open/closed,\n      or fully closed."])]), p(["This, taken from Werner Blaser's ", i(["Mies van der Rohe"]), ",\n    is also brilliant:"]), blockquote([p(["The plan of the brick villa is a good example of the\n      way in which Mies van der Rohe developed the art of\n      structure from the very beginning. The structure of\n      a brick wall begins with the smallest unit into which\n      the whole can be divided: the brick. The dimensions are\n      calculated in terms of the basic unit of the brick."])])];
export default {
  id: 64,
  slug: "man-after-my-own-heart",
  title: ["Man after my own heart"],
  datetime: datetime("2010-07-23")("00:07:00")("Pacific/Auckland"),
  tags: ["architecture", "design"],
  body
};
