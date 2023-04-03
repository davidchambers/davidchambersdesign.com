import {a, code, em, h3, h4, li, ol, p, strong} from "../elements.js";
import {captioned$002Dimages, code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = {
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
  apply: f => args => f.apply(null, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter($ => not(f($))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const excerpt = [p([strong(["Chris Coyier has done it again."]), "\n    Compelled me to stay up all night, that is\n    (it's 7am as I type this). In Chris's latest screencast, ", a({
  href: "http://css-tricks.com/video-screencasts/82-css-image-switcher/"
})(["CSS Image Switcher"]), ", he demonstrates how to create an\n    \"image switcher\" using CSS. The problem, though, is that ", strong(["his process is wrong"]), "."]), h4(["Incorrect process"]), ol([li(["What effect or experience do I want to create?"]), li(["How can I achieve this using CSS (and JavaScript if necessary)?"]), li(["What can my markup do to help me?"])]), h4(["Correct process"]), ol([li(["What effect or experience do I want to create?"]), li(["What is the most correct and meaningful way to describe the content?"]), li(["How can I achieve the desired effect or experience (or something close\n      to it) ", em(["without"]), " altering my markup?"])])];
const body = [...excerpt, p(["Chris simply isn't in the right mindset. He's thinking\n    about ", em(["how"]), " he's going to present the content\n    on the page, but he's forgetting to consider the content\n    itself. This is a crucial error. If one views Chris's ", a({
  href: "http://css-tricks.com/examples/CSSImageSwitcher/"
})(["CSS image switcher demo"]), " with styles disabled,\n    one sees something most unhelpful:"]), captioned$002Dimages([{
  alt: `Chris Coyier's CSS image switcher demo displays nothing
but four unhelpful links when styles are disabled
`,
  src: "/images/posts/43/css-tricks-image-switcher-demo-sans-styles.png",
  caption: ["CSS image switcher demo as seen at CSS-Tricks\n      (with styles disabled; note the lack of images)"]
}]), p(["Well, at least one could click on these links to view the\n    images, right? Wrong! The hrefs contain nothing but the hash\n    sign. Chris does mention in the screencast that these links ", em(["could"]), " go somewhere, but it's as if to say ", strong(["hey, here're some links if you need 'em"]), " rather than ", strong(["yikes! this page'll be worthless when styles are disabled,\n    you'd sure as hell better link to the images as backup"]), "."]), p(["I assume that Chris opted to use anchor elements to allow him to\n    employ the ", strong([":hover"]), " pseudo-class and have it work\n    in IE6. It's well and truly time, however, to stop bending over\n    backwards to accommodate IE6's shortcomings, and Google agrees: ", a({
  href: "http://www.sitepoint.com/blogs/2009/07/20/youtube-drop-ie6/"
})(["YouTube to drop support for IE6"]), "."]), h3(["Why meaningful markup matters"]), p(["Meaningful HTML is not just important to markup geeks who like\n    to use the word \"semantic\". ", strong(["It's vitally important\n    to search engines."]), " While in most cases discussion of the\n    relationship between structured content and search engines\n    centres on whether Google favours sites with clean, descriptive\n    markup, in the case of Chris's CSS image switcher it's a matter of\n    whether the content is indexable at all! Consider the consequences\n    of a site such as ", a({
  href: "http://www.flickr.com/"
})(["Flickr"]), "\n    adopting this approach: any new photo uploaded to the site would\n    be invisible to web crawlers."]), p(["One should not rely on either CSS or JavaScript to deliver ", em(["content"]), " – HTML exists to contain and describe content.\n    This is a pragmatic consideration as well as an idealogical one:\n    HTML is the one component of the HTML+CSS+JavaScript stack to\n    which all users have access (certain devices, for example,\n    eschew CSS support in favour of faster page loads)."]), h3(["Meaningful markup for image–caption pairs"]), p(["As I state in ", a({
  href: "/captions-over-images/"
})(["Captions over images"]), ",\n    my response to an earlier CSS-Tricks screencast, the ", strong(["definition list"]), " is the most appropriate tool\n    in our toolbox."]), captioned$002Dimages([{
  alt: "Definition list markup",
  src: "/images/posts/43/definition-list-markup.png",
  caption: ["The screenshot above is marked up within a ", strong(["dt"]), "\n      and this caption is a ", strong(["dd"]), " (how meta!)"]
}]), p(["Each term in a definition list should have ", em(["at least"]), " one\n    definition. This enables more than one description", $2014, "a title and\n    a caption, for instance", $2014, "to be tied to an image:"]), code$002Dblock("html")(`<dl>
    <dt><img src="images/ds81.jpg" alt="Vancouver architecture" /></dt>
    <dd>This is not like that</dd>
    <dd>Contrasting ideas engage the mind. Make a photo today that tells
    a story with contrasting elements. — <i>Daily Shoot 81</i></dd>
    ...
</dl>
`), p(["Beautiful, isn't it? No pointless (literally) anchors, no meaningless\n    ids, no class names, just content wrapped in descriptive HyperText\n    Markup Language. This ensures that the page's content is accessible\n    to all: those viewing the page on mobile phones; those using screen\n    readers or feed readers; and, of course, web crawlers."]), captioned$002Dimages([{
  alt: "Meaningful markup degrades gracefully",
  src: "/images/posts/43/meaningful-markup-degrades-gracefully.jpg",
  caption: ["The page's content is accessible even with styles disabled"]
}]), h3(["Demo"]), p(["Check out the ", a({
  href: "/examples/css-image-switcher/"
})(["CSS image switcher demo"]), "\n    to see what's possible with straightforward, structured markup\n    (and some rather less straightforward CSS). The demo works in\n    the latest versions of Firefox, Internet Explorer, Opera, and\n    Camino. Unfortunately the core feature does ", em(["not"]), " work\n    in Safari or Google Chrome, as these WebKit-based browsers fail\n    to handle the ", code(["dt+dd:hover~dt"]), " selector."])];
export default {
  id: 43,
  slug: "css-image-switcher-done-the-right-way",
  title: ["CSS image switcher (done the right way)"],
  datetime: datetime("2010-03-24")("12:47:00")("Pacific/Auckland"),
  tags: ["accessibility", "best-practice", "css", "meaningful-markup", "seo", "ux"],
  body
};
