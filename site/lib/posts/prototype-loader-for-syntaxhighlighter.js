import {a, code, em, h3$0027, li, ol, p, strong} from "../elements.js";
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
