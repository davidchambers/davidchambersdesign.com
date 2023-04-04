import {a, code, em, h3, h4, img, p} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
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
const excerpt = [p([img({
  alt: "",
  src: "/images/posts/decorative/right/at-sign-in-speech-bubble.png"
})]), p(["Regular expressions are powerful, useful, and", $2014, "in my opinion", $2014, "lots of fun! Thanks to the prevalence of Twitter, every web developer\n    will be exposed to regex sooner or later: before outputting tweets in\n    HTML, Twitter names and hyperlinks must be wrapped in anchor tags."]), h3(["Matching @names"]), p([`Here's the gist: a match will begin with "@" and the at sign must be
    followed by one or more word (letter / number / underscore) characters.
    The @name must either appear at the beginning of the tweet or be preceded
    by a space. This prevents the regular expression from matching "@example"
    in "me@example.com".`])];
const body = [...excerpt, h4(["JavaScript implementation"]), code$002Dblock("javascript")(`tweet.replace(/(^|\\s)(@\\w+)/gm, '$1<a href="http://twitter.com/$2">$2</a>');
`), p(["It would of course be nicer to write:"]), code$002Dblock("javascript")(`tweet.replace(/(?<=(?:^|\\s))(@\\w+)/gm, '<a href="http://twitter.com/$1">$1</a>');
`), p(["Unfortunately, JavaScript does not support lookbehinds in\n    regular expressions, so one's forced to capture the preceding\n    space character (if in fact there is one) and spit it out in\n    the replacement string."]), h4(["PHP implementation"]), code$002Dblock("php")(`preg_replace('/(^|\\s)(@\\w+)/m', '$1<a href="http://twitter.com/$2">$2</a>', $tweet);
`), h4(["Python implementation"]), p(["Python ", em(["does"]), " support lookbehinds, but only ", em(["fixed-width"]), " lookbehinds, so it won't allow ", code(["(?<=^|\\s)"]), ". No matter."]), code$002Dblock("python")(`import re
re.sub(r'(?m)(^|\\s)(@\\w+)',
        lambda m: m.group(1) + '<a href="http://twitter.com/' + m.group(2) + '">' + m.group(2) + '</a>',
        tweet)
`), p(["For once, Python's syntax is the least elegant!"]), p(["Interestingly, while testing these snippets I found I did not\n    need to specify multi-line mode. Perhaps multi-line mode is\n    assumed? I'd like to know the answer."]), h3(["Matching hyperlinks"]), p(["The regular expression involved in matching\n    hyperlinks is more complex. I'll point you to John Gruber's ", a({
  href: "http://daringfireball.net/2009/11/liberal_regex_for_matching_urls"
})(["liberal regex for matching URLs"]), " as he's clearly put a great\n    deal of thought into what is essentially a single line of code!"])];
export default {
  id: 48,
  slug: "linkify-tweets-with-regex",
  title: ["Linkify tweets with regex"],
  datetime: datetime("2010-04-10")("03:22:00")("Pacific/Auckland"),
  tags: ["javascript", "php", "python", "regex", "regular-expressions"],
  body
};
