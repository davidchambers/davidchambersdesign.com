import {a, blockquote, code, img, li, p, strong, ul} from "../elements.js";
import {code$002Dblock, update} from "../components.js";
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
  src: "/images/posts/decorative/right/textmate-icon.png"
})]), p(["Using the ", code(["-m"]), " flag can be a timesaver, but for several\n    reasons I prefer to write my commit messages in a text editor:"]), ul([li(["Spell-checking"]), li(["Familiar keyboard navigation"]), li(["No need to escape quotation marks"])]), p([a({
  href: "http://macromates.com/"
})(["TextMate"]), "\n    is particularly well suited to my needs due to its built-in ", a({
  href: "http://daringfireball.net/projects/markdown/syntax"
})(["Markdown"]), "\n    highlighting and previewing – yes, I write commit messages in Markdown!"]), p([strong(["To set TextMate as Mercurial's editor, add ", code(["editor = mate -w"]), " to the ", code(["[ui]"]), "\n      section of your ", code(["~/.hgrc"]), " file."])]), p([a({
  href: "http://vincecima.com/post/578017364/using-textmate-as-mercurials-editor"
})(["Vince Cima explains"]), ":"]), blockquote([p(["Next time you do ", code(["hg commit"]), " TextMate will open\n      a temporary file you write your commit message into. Type your\n      message, save the file and then close the window to finish the\n      commit. The ", code(["-w"]), " flag on the ", code(["mate"]), "\n      command tells TextMate not to return control to the command\n      line until the editor window has been closed."])]), update(datetime("2011-01-22")("15:20:00")("Australia/Sydney"))([p(["To use TextMate as your git editor, run the following command:"]), code$002Dblock("console")(`git config --global core.editor "mate -w"
`), p(["This adds ", code(["editor = mate -w"]), " to the ", code(["[core]"]), "\n      section of your ", code(["~/.gitconfig"]), " file."])])];
export default {
  id: 76,
  slug: "composing-mercurial-commit-messages-in-textmate",
  title: ["Composing Mercurial commit messages in TextMate"],
  datetime: datetime("2011-01-10")("01:25:00")("Australia/Sydney"),
  tags: ["hg", "mac-os-x", "markdown", "mercurial", "textmate"],
  body
};
