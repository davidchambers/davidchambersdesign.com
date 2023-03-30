import {$2014} from "../components.js";
import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
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
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
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
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
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
