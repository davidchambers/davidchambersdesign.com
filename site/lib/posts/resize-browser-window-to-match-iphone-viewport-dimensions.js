import {li, p, strong, ul} from "../elements.js";
import {captioned$002Dimages, code$002Dblock} from "../components.js";
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
const excerpt = [p(["I've recently become interested in optimizing sites for\n    the iPhone and iPod touch. While nothing beats testing on\n    the device itself, I often find it quicker to test changes\n    on my Mac. Changing the user agent string is a piece of cake\n    in Safari (Develop > User Agent > Mobile Safari) but what\n    about adjusting the browser window's dimensions to match\n    those of the iPhone?"]), p(["I've created two bookmarklets to allow the current page to\n    be loaded in an iPhone-sized window with a single click:"]), ul([li([p([strong(["Portrait"]), ` (labelled "⁑")`]), code$002Dblock("plain-text")(`javascript:open(location,'iPhone:portrait','innerWidth='+(320+15)+',innerHeight='+(480+15)+',scrollbars=yes');
`)]), li([p([strong(["Landscape"]), ` (labelled "**")`]), code$002Dblock("plain-text")(`javascript:open(location,'iPhone:landscape','innerWidth='+(480+15)+',innerHeight='+(320+15)+',scrollbars=yes');
`)])]), captioned$002Dimages([{
  alt: "iPhone testing bookmarklets",
  src: "/images/posts/37/iphone-testing-bookmarklets.png",
  caption: ["iPhone testing bookmarklets: portrait and landscape"]
}])];
const body = [...excerpt, captioned$002Dimages([{
  alt: "Safari window resized to iPhone portrait dimensions",
  src: "/images/posts/windows/safari-window-iphone-dimensions-portrait.png",
  caption: ["320x480: iPhone portrait dimensions"]
}, {
  alt: "Safari window resized to iPhone landscape dimensions",
  src: "/images/posts/windows/safari-window-iphone-dimensions-landscape.png",
  caption: ["480x320: iPhone landscape dimensions"]
}]), p(["It appears that I need to rework this site's style sheet\n    to better present content in these smaller viewports!"])];
export default {
  id: 37,
  slug: "resize-browser-window-to-match-iphone-viewport-dimensions",
  title: ["Resize browser window to match iPhone viewport dimensions"],
  datetime: datetime("2010-02-16")("03:20:00")("Pacific/Auckland"),
  tags: ["bookmarklets", "iphone", "javascript"],
  body
};
