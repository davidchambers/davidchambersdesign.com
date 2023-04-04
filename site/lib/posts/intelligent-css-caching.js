import {a, code, p, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
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
const body = [p(["If you've ever worked with CSS, you'll understand how frustrating\n    it is to edit a style sheet and be unable to view the change because\n    a cached version of the file is being used. One line of PHP will fix\n    this problem, and will also ensure that visitors never view your site\n    through the lens of an outdated style sheet."]), p(["If you've ever worked with CSS, you'll understand how frustrating\n    it is to edit a style sheet and be unable to view the change because\n    a cached version of the file is being used."]), p(["In the past, I've adopted an unscientific approach to working\n    around this problem: I've done forced refreshes, relaunched browsers,\n    emptied caches, and even disabled caching entirely using Firefox's\n    Web Developer extension."]), p(["Each of these workarounds is problematic in some way: browsers do\n    not agree on exactly what a page refresh should do; quitting and\n    relaunching a browser is time-consuming (particularly with Firefox\n    on OS X); emptying the cache gobbles up bandwidth; and disabling\n    caching slows down the testing process by forcing a bunch of static\n    files to be retrieved from the server every time the page is loaded."]), p(["While the problem of cached style sheets is largely an annoyance\n    confined to the development environment, it occasionally causes\n    problems at other times. For example, let's say that you've made\n    a minor change to a site's source code – you've changed ", code([`<div id="wrapper">`]), " to ", code([`<div id="wrap">`]), ". You've also done a find and replace on the style sheet, and\n    rolled both changes live. A new visitor to the site will have\n    no problems, but a returning visitor may see the site through\n    the lens of an out-of-date style sheet. Yikes!"]), p(["I decided that it was time to find a reliable solution\n    to the above problems. I came across an article on ", a({
  href: "http://css-tricks.com/can-we-prevent-css-caching/"
})(["timestamping CSS"]), "\n    which suggests appending a unique string to a style sheet's\n    href when linking to it in a page's ", code(["<head>"]), "."]), p(["After reading the replies to the above post, and taking on board\n    several good suggestions, here is the PHP code I have decided upon:"]), code$002Dblock("php")(`href="path/to/style.css?<?php echo date('Y-m-d-H-i-s', filectime('path/to/style.css')); ?>"
`), p(["The above generates something like this:"]), code$002Dblock("html")(`href="path/to/style.css?2008-12-16-20-02-53"
`), p(["The nice thing about using ", a({
  href: "http://php.net/manual/en/function.filectime.php"
})(["PHP's filectime function"]), "\n    is that the timestamp is dependent on the time at which the CSS file\n    was last modified. This means that the cached style sheet is used when\n    it is ", strong(["up to date"]), ", but the file is retrieved from the\n    server when it has been ", strong(["changed in any way"]), "."])];
export default {
  id: 4,
  slug: "intelligent-css-caching",
  title: ["Intelligent CSS caching"],
  datetime: datetime("2008-12-18")("14:50:00")("Pacific/Auckland"),
  tags: ["css", "php"],
  body
};
