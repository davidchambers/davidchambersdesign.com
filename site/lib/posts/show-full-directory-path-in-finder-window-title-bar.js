import {a, p, strong} from "../elements.js";
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
const excerpt = [p(["If you have ever found yourself command-clicking the\n    title of a Finder window to find out where you are (", strong(["/Library/Fonts"]), " or ", strong(["~/Library/Fonts"]), "\n    is one I've double-checked many times), you'll understand how\n    pleased I was to discover that there is a command which can be\n    entered in Terminal to ", a({
  href: "http://osxdaily.com/2007/12/02/show-full-directory-path-in-finder-window-title-bars/"
})(["show full directory paths in Finder window title bars"]), "."])];
const body = [...excerpt, captioned$002Dimages([{
  alt: "Finder windows without paths",
  src: "/images/posts/2/finder-windows-without-paths.png",
  caption: [strong(["Before:"]), "\n      Finder windows with directory name only in title bar"]
}]), p(["In the screenshot above, it is clear that the two Finder windows are\n    displaying different Fonts folders, but it is unclear which is which."]), p(["To display the full path, copy and paste the following into Terminal\n    and hit ", strong(["return"]), "."]), code$002Dblock("console")(`defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES
`), p(["For the changes to take effect, you will need to restart Finder:"]), code$002Dblock("console")(`killall Finder
`), captioned$002Dimages([{
  alt: "Finder windows with paths",
  src: "/images/posts/2/finder-windows-with-paths.png",
  caption: [strong(["After:"]), "\n      Finder windows with full directory path in title bar"]
}]), p(["Confusion resolved! Please note that this is ", strong(["only applicable for OS X 10.5"]), " users."]), p(["To revert to the default title bar treatment, simply enter:"]), code$002Dblock("console")(`defaults write com.apple.finder _FXShowPosixPathInTitle -bool NO
`), p(["Then, restart Finder once again:"]), code$002Dblock("console")(`killall Finder
`)];
export default {
  id: 2,
  slug: "show-full-directory-path-in-finder-window-title-bar",
  title: ["Show full directory path in Finder window title bar"],
  datetime: datetime("2008-11-29")("19:07:00")("Pacific/Auckland"),
  tags: ["mac-os-x"],
  body
};
