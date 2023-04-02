import {a, em, li, p, strong, ul} from "../elements.js";
import {code$002Dblock} from "../components.js";
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
  apply: f => args => f.apply(null, args),
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
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const excerpt = [p(["This is my response to Chris Coyier's screencast titled ", a({
  href: "http://css-tricks.com/video-screencasts/67-jquery-part-3-image-title-plugin/"
})(["jQuery Part 3 – Image Title Plugin"]), " which I watched\n    a couple of days ago. Something didn't sit right with me\n    at the time, and I've now worked out what it was: ", strong(["JavaScript is not required!"])]), p(["I'll present a JavaScript-free approach for displaying captions\n    over images that uses ", em(["truly"]), " meaningful markup."])];
const body = [...excerpt, p(["So what ", em(["is"]), " meaningful markup for images and image\n    captions? This is a debated issue, but I believe the definition\n    list to be the most appropriate element at our disposal. While\n    an image is clearly not a \"term\", a caption does ", em(["describe"]), "\n    an image, just as a definition ", em(["describes"]), " a term.\n    Meaningful markup for an image and its caption should look\n    something like the following:"]), code$002Dblock("html")(`<dl>
    <dt><img src="images/paris.jpg" alt="View from Notre Dame de Paris" /></dt>
    <dd>View from Notre Dame de Paris</dd>
</dl>
`), p(["Ideally, images appearing one after the other should belong to the\n    same definition list."]), p(["My aim was to achieve a result similar to Chris's ", a({
  href: "http://css-tricks.com/examples/TypeOverImagePlugin/"
})(["image title plugin demo"]), "\n    simply by styling a definition list containing images and their\n    captions. In the end, I was forced to abandon the ideal of using a\n    single definition list for multiple images and captions: the nature\n    of CSS positioning dictates that each image–caption pair reside in\n    its own element. The final markup, however, is still quite clean:"]), code$002Dblock("html")(`<dl class="captioned-image">
    <dt><img src="images/paris.jpg" alt="View from Notre Dame de Paris" /></dt>
    <dd><span>View from Notre Dame de Paris</span></dd>
</dl>
`), p(["Additional markup required:"]), ul([li(["Each definition list must have a class name of ", strong(["captioned-image"]), " applied"]), li(["Each caption must be wrapped in a span element (captions to\n      appear on multiple lines require multiple span elements)"])]), p(["Check out the ", a({
  href: "/examples/captions-over-images/"
})(["captions over images demo"]), " to see the approach in action.\n    The CSS responsible for the appearance of the captions is as follows:"]), code$002Dblock("css")(`dl.captioned-image         { position: relative; margin: 1em 0; }
dl.captioned-image dt img  { display: block; }
dl.captioned-image dd      { position: absolute; left: 0; bottom: 1.25em;
                             font: bold 2em/1.25em Helvetica, sans-serif; }
dl.captioned-image.top dd  { top: 1.25em; }
dl.captioned-image dd span { display: block; float: left; clear: both;
                             background: #000; background: rgba(0, 0, 0, 0.7);
                             padding: 0.25em 0.5em; color: #fff; }
`), p(["I set out to display captions over images without the use\n    of JavaScript while keeping meaningless markup to a minimum. ", strong(["Have I succeeded, do you think?"])])];
export default {
  id: 24,
  slug: "captions-over-images",
  title: ["Captions over images"],
  datetime: datetime("2009-08-31")("03:36:00")("Pacific/Auckland"),
  tags: ["best-practice", "css", "html", "javascript", "jquery", "meaningful-markup"],
  body
};
