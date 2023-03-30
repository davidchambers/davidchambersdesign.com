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
const excerpt = [p([a({
  href: "http://alexgorbatchev.com/wiki/SyntaxHighlighter"
})(["SyntaxHighlighter"]), " is a fully functional self-contained\n    code syntax highlighter developed in JavaScript (as stated on\n    its wiki). One of its deficiencies is that it retrieves all\n    its brushes each time a page is loaded, despite the fact that\n    in many cases only one or two (or none) are required."]), p(["Currently, ", a({
  href: "http://prototypejs.org/"
})(["Prototype"]), "\n    is my JavaScript framework of choice (although I'm really looking\n    forward to trying ", a({
  href: "http://jquery.com/"
})(["jQuery"]), ").\n    I have used Prototype to create a ", strong(["brush loader for\n    SyntaxHighlighter"]), ", which retrieves brushes on demand to\n    reduce page loading times (in certain circumstances)."])];
const body = [p(["Skip to ", a({
  href: "#setup"
})(["setup"]), "\n    or ", a({
  href: "#usage"
})(["usage"])]), ...excerpt, update(datetime("2009-06-27")("06:21:00")("Pacific/Auckland"))([p(["I have completely rewritten the code so that it no longer\n      requires empty functions inside the brush files to act as\n      indicators of readiness. Instead, the required brushes are\n      retrieved in a daisy chain. This is both more elegant and\n      more reliable. Additionally, style sheets are now also\n      retrieved on demand."])]), h3$0027({
  id: "setup"
})(["Setup"]), p([strong(["Requires Prototype!"])]), p(["If you are not already using Prototype on your site,\n    I recommend using SyntaxHighlighter in the conventional\n    manner, since there is significant overhead associated\n    with loading ", code(["prototype.js"]), "."]), p(["If you ", em(["are"]), " using Prototype, follow these steps\n    to have brushes retrieved dynamically:"]), ol([li([p(["Download ", a({
  href: "/downloads/loader.js"
})(["loader.js"]), " or the ", a({
  href: "/downloads/loader.min.js.gz"
})(["minified and gzipped version"]), "\n        and upload it to your SyntaxHighlighter ", strong(["scripts"]), " directory."])]), li([p(["Replace:"]), code$002Dblock("html")(`<script src="/path/to/scripts/shCore.js"></script>
<script src="/path/to/scripts/shBrushAS3.js"></script>
<script src="/path/to/scripts/shBrushBash.js"></script>
.
.
.
<script src="/path/to/scripts/shBrushVb.js"></script>
<script src="/path/to/scripts/shBrushXml.js"></script>

<script>SyntaxHighlighter.all()</script>
`), p(["with:"]), code$002Dblock("html")(`<script>
    function Brush(name, filename, aliases)
    {
        this.name = name;
        this.filename = filename;
        this.aliases = aliases;
    }
    var settings = {
        selector: 'head',
        path: 'http://example.com/sh/',
        stylesheets: ['shThemeDefault'],
        brushes: [],
        extensions: { stylesheet: 'css', brush: 'js' },
        defaults: {}
    };
</script>
<script src="/path/to/scripts/loader.js"></script>
`)]), li([p(["Replace both instances of ", code(["http://example.com/sh/"]), "\n        in the above snippet with the path to your ", strong(["SyntaxHighlighter"]), " directory."])])]), h3$0027({
  id: "usage"
})(["Usage"]), p(["The ", code(["settings"]), " object provides flexibility by allowing\n    various things to be modified or included."]), p([strong(["Selector."]), " By default, ", code(["settings.selector"]), "\n    is set to 'head', which means that script elements will be inserted\n    into the head element. This can be replaced with any CSS selector to\n    have script elements inserted into a different element."]), p([strong(["Style sheets."]), " By default, ", code(["settings.stylesheets"]), "\n    is an array containing just the default style sheet. This can easily be\n    modified:"]), code$002Dblock("javascript")(`stylesheets: ['shThemeCoda', 'shThemeAppleScript'],
`), p([strong(["Brushes."]), " By default, ", code(["settings.brushes"]), "\n    is an empty array. All the bundled brushes are handled automatically,\n    but additional brushes can be included by adding them to this array:"]), code$002Dblock("javascript")(`brushes: [
    new Brush('AppleScript', 'shBrushAppleScript', ['applescript'])
],
`), p(["When creating a ", code(["Brush"]), " object, provide the constructor\n    with the brush's name, its file name (sans extension), and an array\n    of aliases."]), p([strong(["Extensions."]), " By default, ", code(["settings.extensions"]), "\n    has 'css' set against ", code(["stylesheet"]), " and 'js' set against ", code(["brush"]), ". It is useful to be able to change these values if,\n    for example, gzipped versions of the brushes are to be used."]), p([strong(["Defaults."]), " SyntaxHighlighter defaults can be set by\n    modifying ", code(["settings.defaults"]), ":"]), code$002Dblock("javascript")(`defaults: {
    'auto-links': false,
    'html-script': true
}
`), p(["Many thanks to Dan Breslau for letting me know about ", code(["SyntaxHighlighter.highlight()"]), " and for his thorough\n    testing of each of the early iterations of this code. Dan's ", a({
  href: "http://www.outofwhatbox.com/blog/2009/06/syntaxhighlighter-revised-again-works-on-its-own-once-again/"
})(["SyntaxHighlighter improvements"]), " are well worth a look!"]), update(datetime("2009-06-27")("06:21:00")("Pacific/Auckland"))([p(["Thanks also to Bob Matsuoka for sharing his ", a({
  href: "http://ajaxian.com/archives/a-technique-for-lazy-script-loading"
})(["technique for lazy script loading"]), " which provides\n      workarounds for browsers that do not support the onload\n      event when applied to script elements."])]), update(datetime("2009-08-16")("01:24:00")("Pacific/Auckland"))([p(["I've updated the script to ensure that the XML brush is always\n      loaded when at least one of the following conditions is true:"]), ol([li([code(["settings.defaults['html-script']"]), " is set to ", code(["true"])]), li(["a pre element to be highlighted has ", code(["html-script: true"]), " in its class name"])])])];
export default {
  id: 18,
  slug: "prototype-loader-for-syntaxhighlighter",
  title: ["Prototype loader for SyntaxHighlighter"],
  datetime: datetime("2009-06-22")("01:04:00")("Pacific/Auckland"),
  tags: ["javascript", "optimization", "prototype", "syntaxhighlighter"],
  body
};
