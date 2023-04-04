import {a, blockquote, code, h3, li, p, ul} from "../elements.js";
import {captioned$002Dimages, $2014} from "../components.js";
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
