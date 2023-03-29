import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock, update} from "../components.js";
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
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
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
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
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
