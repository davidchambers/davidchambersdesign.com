import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {captioned$002Dimages, $2014} from "../components.js";
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
const {operators, _apply, apply, construct, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const body = [p(["On 19 April 2011, at around noon Pacific time, I published a short tweet."]), blockquote([p(["Hashify is officially live as of now! ", a({
  href: "http://bit.ly/dXYxGU"
})(["bit.ly/dXYxGU"])])]), p(["Quite to my surprise word of the release spread\n    incredibly quickly, thanks in large part to the ", a({
  href: "http://news.ycombinator.com/item?id=2464213"
})(["Hacker News thread"]), " that sprang up and\n    received a great deal of attention."]), p([`The vast majority of the ensuing discussion focused on the
    implications of stuffing documents into URLs, and of using bit.ly
    as a document store. While there was much debate as to whether this
    "cool hack" will turn out to have practical application, the one
    undoubtedly useful component was overlooked.`]), h3(["Markdown editing for the masses"]), p(["Before dropping off the face of the earth, John Fraser created ", a({
  href: "https://bitbucket.org/davidchambers/showdown.js"
})(["Showdown"]), "\n    and ", a({
  href: "http://code.google.com/p/wmd/"
})(["wmd"]), ".\n    The latter is a WYSIWYM Markdown editor, popularized by ", a({
  href: "http://stackoverflow.com/"
})(["Stack Overflow"]), ".\n    I've long been supportive of wmd's goals, but I've never\n    liked its implementation."]), p(["Several drawbacks of wmd encouraged me to write my own Markdown editor:"]), ul([li(["Its use of inline styles makes it difficult to customize the\n      toolbar's appearance."]), li(["Many HTTP requests are required to retrieve the toolbar icons."]), li(["Lack of modularity: Showdown is a dependency."]), li(["Unnatural keyboard shortcuts."])]), p([a({
  href: "https://bitbucket.org/davidchambers/hashify-editor"
})(["Hashify Editor"]), "\n    addresses these concerns. Styles are applied via a style sheet, and\n    selector specificity has been kept low to make overriding default\n    styling simple. Selectors are prefixed with ", code(["hashify-editor"]), "\n    to prevent erroneous matches. Additionally, the images have been sprited,\n    optimized, Base64 encoded, and included in the style sheet as a data URI."]), p(["Hashify Editor does not require Showdown, as its focus is on turning\n    the humble ", code(["textarea"]), " into a useful Markdown editor.\n    TextMate-style keyboard shortcuts make it a joy to work with\n    metacharacters and text selections."]), p(["Best of all is the preview option: one is able to view", $2014, "and of course,\n    edit", $2014, "the text at ", a({
  href: "http://hashify.me/"
})(["hashify.me"]), "\n    with a single click."]), captioned$002Dimages([{
  alt: "Hashify Editor at David Chambers Design",
  src: "/images/posts/85/hashify-editor-at-david-chambers-design.png",
  caption: ["Hashify Editor at David Chambers Design"]
}, {
  alt: "Comment preview at hashify.me",
  src: "/images/posts/85/comment-preview-at-hashify.me.png",
  caption: ["Comment preview at hashify.me"]
}]), h3(["Adoption"]), p(["I love sites which support Markdown commenting. Unfortunately many of\n    those that do", $2014, "even ", a({
  href: "http://forrst.com/"
})(["Forrst"]), $2014, "don't provide previews. As a result, each time I'm about to submit\n    a lengthy comment I select all, copy, open a new tab, go to hashify.me,\n    tab into the editor, and paste in my comment. Were Forrst to integrate\n    Hashify Editor, six of these steps could be replaced by a single mouse\n    click. :D"])];
export default {
  id: 85,
  slug: "hashify-editor",
  title: ["Hashify Editor"],
  datetime: datetime("2011-04-24")("06:15:00")("America/Los_Angeles"),
  tags: ["hashify", "markdown", "showdown", "ux"],
  body
};
