import {i, p} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
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
const body = [p(["While creating documentation for ", i(["Dice Cricket"]), ",\n    a game a friend and I designed many years ago, I produced\n    a set of diagrams which represent the segments of a cricket\n    field. The isolated nature of this small design challenge\n    provided a refreshing break from the various and interrelated\n    considerations involved in designing for the Web."]), captioned$002Dimages([{
  alt: "Cricket field with mid-wicket area highlighted",
  src: "/images/posts/40/mid-wicket.png",
  caption: ["Mid-wicket"]
}, {
  alt: "Cricket field with covers highlighted",
  src: "/images/posts/40/down-the-ground.png",
  caption: ["Down the ground"]
}, {
  alt: "Cricket field with covers highlighted",
  src: "/images/posts/40/covers.png",
  caption: ["Covers"]
}, {
  alt: "Cricket field with area behind point highlighted",
  src: "/images/posts/40/behind-point.png",
  caption: ["Behind point"]
}, {
  alt: "Cricket field with area behind the wicket highlighted",
  src: "/images/posts/40/behind-the-wicket.png",
  caption: ["Behind the wicket"]
}, {
  alt: "Cricket field with area backward of square highlighted",
  src: "/images/posts/40/behind-square.png",
  caption: ["Behind square"]
}]), p(["You're free to make use of these images (they're transparent PNGs).\n    Attribution is appreciated but not required. :)"])];
export default {
  id: 40,
  slug: "cricket-field-diagrams",
  title: ["Cricket field diagrams"],
  datetime: datetime("2010-03-15")("00:58:00")("Pacific/Auckland"),
  tags: ["design", "icons"],
  ["article-id"]: "cricket-field-diagrams",
  body
};
