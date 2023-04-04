import {a, em, p, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const {XOR, OR, subtract, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, empty, reduce, reduceRight, filter, reject, map, flip, of, chain, contains} = {
  XOR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
      default:
        return lhs ^ rhs;
    }
  })(),
  OR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
      default:
        return lhs | rhs;
    }
  })(),
  subtract: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
      default:
        return lhs - rhs;
    }
  })(),
  apply: f => args => f.apply(null, args),
  construct: constructor => args => globalThis.Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[globalThis.Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : globalThis.Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  empty: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return [];
      case "Object":
        return {};
      case "String":
        return "";
      case "Set":
      case "Map":
        return globalThis.Reflect.construct(typeRep, [[]]);
      default:
        return typeRep["fantasy-land/empty"]();
    }
  })(),
  reduce: f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter(x => !f(x)),
  map: f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  of: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return globalThis.Array.of;
      case "Function":
        return x => y => x;
      case "Set":
        return x => globalThis.Reflect.construct(typeRep, [[x]]);
      default:
        return typeRep["fantasy-land/of"];
    }
  })(),
  chain: f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f),
  contains: this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these)
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
