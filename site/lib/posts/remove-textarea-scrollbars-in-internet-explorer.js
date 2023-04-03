import {a, code, em, p} from "../elements.js";
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
const body = [p(["I was delighted to discover this \"trick\"\n    over on CSS-Tricks in a post titled ", a({
  href: "http://css-tricks.com/textarea-tricks/"
})(["Textarea Tricks"]), ".\n    (See, Chris, I ", em(["do"]), " like you!)"]), p(["Internet Explorer displays a (completely pointless) inactive scrollbar in\n    empty ", code(["textarea"]), " elements, unlike other browsers which wait\n    until a scrollbar is actually ", em(["required"]), " before displaying it."]), p(["As it turns out, there's a dead simple way to prevent this,\n    and once again its everybody's friend ", code(["overflow"]), "\n    to the rescue."]), code$002Dblock("css")(`textarea { overflow: auto; }
`), p(["The ", code(["overflow"]), " property seems to be a magical remedy\n    for a variety of different ailments, most significant of which\n    is the collapsing of an element whose children are all floated.\n    Applying ", code(["overflow: auto"]), " makes the element wrap its\n    children rather than letting them \"hang\"."]), p(["One thing that I sometimes ponder, though, is why ", code(["visible"]), "\n    was selected as the default ", code(["overflow"]), " value – it seems\n    inferior to ", code(["auto"]), " in most use cases."])];
export default {
  id: 59,
  slug: "remove-textarea-scrollbars-in-internet-explorer",
  title: ["Remove textarea scrollbars in Internet Explorer"],
  datetime: datetime("2010-07-18")("22:00:00")("Pacific/Auckland"),
  tags: ["css"],
  body
};
