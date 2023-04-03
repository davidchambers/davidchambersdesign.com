import {a, em, p, strong} from "../elements.js";
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
const excerpt = [p([strong(["Sticky footers should be ubiquitous. They are not."])]), p(["This leads me to believe that many developers are unaware\n    of how to prevent footers from floating up on pages without\n    much content."])];
const body = [...excerpt, p(["I'll explain how it's done. The markup must look something like\n    the following:"]), code$002Dblock("html")(`<body>
    <div id="wrap">
        <div id="main">
        </div>
    </div>
    <div id="footer">
    </div>
</body>
`), p(["The required CSS is also straightforward. First, set the heights\n    of the html and body elements to the height of the viewport:"]), code$002Dblock("css")(`html    { height: 100%; }
body    { height: 100%; }
`), p(["This makes it possible to set the ", em(["minimum"]), " height of\n    the wrapper div to the height of the viewport:"]), code$002Dblock("css")(`#wrap   { min-height: 100%; }
`), p(["Next, pull up the footer so that it's visible without scrolling\n    on pages without a lot of content:"]), code$002Dblock("css")(`#footer { margin-top: -5em; height: 5em; }
`), p(["Finally, apply bottom padding to the main content div to ensure\n    that nothing is covered by the footer:"]), code$002Dblock("css")(`#main   { padding-bottom: 5em; }
`), p(["Putting it all together gives the following:"]), code$002Dblock("css")(`html    { height: 100%; }
body    { height: 100%; }
#wrap   { min-height: 100%; }
#main   { padding-bottom: 5em; }
#footer { margin-top: -5em; height: 5em; }
`), p(["This CSS works in all modern browsers. If you need to support\n    antiquated browsers, you should have a look at the hacks suggested\n    at ", a({
  href: "http://www.cssstickyfooter.com/"
})(["CSS Sticky Footer"]), "."]), p([strong(["Check out the ", a({
  href: "/examples/sticky-footers/"
})(["sticky footer demo"]), "\n      to see all this theory in action."])])];
export default {
  id: 27,
  slug: "sticky-footers",
  title: ["Sticky footers"],
  datetime: datetime("2009-09-20")("01:08:00")("Pacific/Auckland"),
  tags: ["css", "html"],
  body
};
