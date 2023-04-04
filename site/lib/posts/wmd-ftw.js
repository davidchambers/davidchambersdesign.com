import {$2014} from "../components.js";
import {a, code, em, p, video} from "../elements.js";
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
const body = [p(["Comment forms that don't provide previews", $2014, "or at least an\n    indication of how comments are processed", $2014, "really annoy me.\n    If I decide to leave a comment I take care to avoid spelling\n    mistakes and grammatical errors. It's quite upsetting, then,\n    to see my code snippet completely mangled and my carefully\n    typed links displayed in plain text (<a href=\"...)."]), p(["Despite my appreciation of the preview, not one of my sites\n    provided this service until a few hours ago. Now that I've\n    migrated from WordPress to ", a({
  href: "http://mango.io/"
})(["Mango"]), "\n    I'm able to spend some time working on front-end code. My first\n    two challenges were localizing dates and times, and integrating ", a({
  href: "http://wmd-editor.com/"
})(["wmd"]), "."]), p(["Getting wmd working turned out to be extremely easy, but I was\n    not content with a live preview of the ", em(["comment"]), " only.\n    No, I wanted the preview to resemble as closely as possible\n    the published result, which meant updating the preview area in\n    response to changes to \"name\", \"e-mail\", and \"website\"\n    as well as to changes to the comment itself."]), video({
  src: "/images/posts/53/wmd.mp4",
  controls: "controls"
})([p(["Get with the programme; this video's in an HTML5 ", code(["video"]), " tag!"]), p(["It should be possible to access ", a({
  href: "/images/posts/53/wmd.mp4"
})(["wmd.mp4"]), " directly."])]), p(["This was a great deal of fun to implement!"])];
export default {
  id: 53,
  slug: "wmd-ftw",
  title: ["wmd ftw!"],
  datetime: datetime("2010-06-13")("11:25:00")("Pacific/Auckland"),
  tags: ["javascript", "markdown", "ux", "wmd"],
  body
};
