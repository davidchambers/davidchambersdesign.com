import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {captioned$002Dimages, code$002Dblock} from "../components.js";
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
