import {a, p} from "../elements.js";
import {captioned$002Dimages, update, $2014} from "../components.js";
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
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const body = [update(datetime("2009-08-28")("18:12:00")("Pacific/Auckland"))([p(["An update to this post has been published: ", a({
  href: "/tiny-calendar-icons-sprite/"
})(["Tiny calendar icons sprite"]), "."])]), p(["I've always enjoyed creating icons in Photoshop. Not the gorgeous, often\n    richly detailed icons that grace OS X applications", $2014, "although I would\n    love to learn to create these as well", $2014, "but icons designed pixel by\n    pixel for display at very small scales."]), p(["Working with a tiny canvas and a limited palette (I restrict myself to\n    hexadecimal colours that can be written in shorthand) is a challenge,\n    but I find the experience rewarding. I recently redesigned this site's\n    archives page, for which I created a set of 16 x 16px calendar icons."]), captioned$002Dimages([{
  alt: "Calendar icons for every possible day of the month",
  src: "/images/posts/14/calendar-300pc.png",
  caption: ["Calendar icons shown at 300% of actual size"]
}, {
  alt: "Calendar icons for every possible day of the month",
  src: "/images/posts/14/calendar.png",
  caption: ["Calendar icons shown actual size"]
}]), p(["You are welcome to ", a({
  href: "/downloads/tiny-calendar-icon-set.zip"
})(["download the tiny calendar icon set"]), "."])];
export default {
  id: 14,
  slug: "tiny-calendar-icon-set",
  title: ["Tiny calendar icon set"],
  datetime: datetime("2009-04-24")("21:24:00")("Pacific/Auckland"),
  tags: ["design", "icons"],
  body
};
