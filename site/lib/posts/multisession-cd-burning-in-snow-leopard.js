import {a, h3, img, li, ol, p} from "../elements.js";
import {$2014} from "../components.js";
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
const body = [p([img({
  alt: "",
  src: "/images/posts/decorative/right/disk-utility-icon.png"
})]), p(["The days of the compact disc are surely numbered. The ", a({
  href: "http://www.apple.com/macbookair/"
})(["MacBook Air"]), "\n    is the first computer from Apple to jettison the optical\n    drive; others will undoubtedly follow, eventually."]), p(["Since the vast majority of Mac OS X users currently possess the\n    means to read and burn CDs, however, I thought this information", $2014, "lifted straight from Disk Utility Help", $2014, "worth sharing.\n    These instructions apply to Snow Leopard, although I would guess\n    that the process is identical for older versions of OS X (the more\n    recent ones, at any rate)."]), h3(["Recording on a recordable CD more than once"]), p(["Normally, you can burn items to a recordable CD, such\n    as a CD-R or CD-RW disc, only one time. However, if you\n    use Disk Utility to burn the disc, you can burn items to a\n    disk in more than one session as long as space is available.\n    This is also called \"multisession burning.\""]), p(["To burn a disc, you need an optical drive in your computer\n    or connected directly to your computer. You can’t burn a disc\n    using a remote optical drive."]), h3(["To burn to a recordable CD so you can burn to it again:"]), ol([li([p(["In Disk Utility, create a disk image that contains\n        the files you want to burn to the disc."]), p(["The files must be from a partition with a Mac OS\n        Extended disk format. To check a partition’s format,\n        select the disk in Disk Utility, and look at the\n        information at the bottom of the Disk Utility window."])]), li([p(["Select the disk image in the list at the left,\n        and then choose Images > Burn."])]), li([p([`Select the "Leave disc appendable" checkbox.
        If you don’t see this option, click the triangle
        in the upper-right corner.`])]), li([p(["Insert a blank recordable CD in the optical drive\n         and click Burn."])])]), p(["To add more files to the disc later, follow the steps above.\n    You can continue this process until all available space on the\n    disc is used."])];
export default {
  id: 29,
  slug: "multisession-cd-burning-in-snow-leopard",
  title: ["Multisession CD burning in Snow Leopard"],
  datetime: datetime("2009-10-27")("08:58:00")("Pacific/Auckland"),
  tags: ["mac-os-x", "snow-leopard"],
  body
};
