import {a, em, h3, li, p, strong, ul} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
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
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const excerpt = [p(["URL shortening is something that's been\n    at the back of my mind since listening to ", a({
  href: "http://www.sitepoint.com/blogs/2009/08/22/podcast-24-those-frames-are-ironic/"
})(["SitePoint Podcast #24"]), "\n    which discussed the near closure of ", a({
  href: "http://tr.im/"
})(["tr.im"]), "."]), p([strong([em(["Why are short URLs required?"]), " Twitter."]), "\n    Tweets are limited to 140 characters, and URLs often seem\n    recklessly long in this context. Of course, Twitter could\n    simply allow us to apply short, meaningful labels to our\n    links as we've been doing in HTML for years. Instead, each\n    time one includes a link in a tweet one must either:"]), ul([li(["spend a large number of characters on the full URL; or"]), li(["use a short URL generated by a service such as ", a({
  href: "http://bit.ly/"
})(["bit.ly"])])])];
const body = [...excerpt, p(["I'm opposed to short URLs for several reasons. First,\n    I believe that every reference to a resource should use that\n    resource's Uniform Resource Identifier (if it has one) in its\n    normalized form. In other words, we should ", em(["not"]), " use ", strong(["http://www.wikipedia.org/"]), " to refer to ", strong(["http://wikipedia.org/"]), ", and we should ", em(["certainly not"]), " use ", strong(["http://bit.ly/8RTk"]), ".\n    Having multiple URLs for a resource is a maintenance nightmare\n    (unless one is willing to accept URLs being temporal)."]), p(["Secondly, I have a simple rule: ", strong(["meaningful > meaningless"]), ".\n    Meaningful markup is wonderful, and meaningful URLs offer\n    similar benefits (to both people and search engines)."]), p(["Finally", $2014, "and this point relates to URL shortening services\n    rather than to short URLs themselves", $2014, "there's no guarantee\n    that sites which ", em(["currently"]), " provide a service will\n    continue to do so indefinitely."]), h3(["Enter John Gruber"]), p(["I noticed one day that ", a({
  href: "http://daringfireball.net/"
})(["Daring Fireball"]), "\n    now has its own ", a({
  href: "http://sites.google.com/a/snaplog.com/wiki/short_url"
})(["shorturl"]), "s, using the incredibly cool domain name ✪df.ws.\n    This got me thinking that perhaps I should procure a short domain\n    name and do something similar. Well, last week I did."]), p(["With dċd.ws safely registered in my name I began looking for an\n    open source URL shortener to run on that domain. I then struck\n    upon a ", strong(["simple, elegant solution"]), " which took all\n    of ten minutes to implement."]), code$002Dblock("TK")(`RewriteEngine On
RewriteRule ^(.*)$ http://davidchambersdesign.com/$1 [R=301,L]
`), p(["The code above forms the entirety of the ", strong([".htaccess"]), "\n    file on the dċd.ws server. All it does is redirect every request\n    to the corresponding davidchambersdesign.com URL. The key word\n    being ", em(["every"]), ". As a result, existing pages on this site\n    gained short", em(["er"]), " (though not necessarily short) URLs\n    automatically, and new pages gain a short URL the instant they\n    are published. ", strong(["No maintenance, no fuss. Nice!"])]), p(["So, for example, ", strong(["http://dċd.ws/twitter/"]), " → ", strong(["http://davidchambersdesign.com/twitter/"]), "\n    (a 17 character saving)."]), p(["If you're interested in acquiring your own short domain name,\n    I suggest trying .ws as it's one of the few top level domains\n    to allow virtually any Unicode character in its domain names.\n    As a result, there are plenty of short .ws domain names available.\n    I don't suggest this approach for normal use, however, as browsers\n    will display something like ", strong(["http://xn--dd-7la.ws/"]), "\n    in their address bars."])];
export default {
  id: 36,
  slug: "shockingly-simple-url-shortening",
  title: ["Shockingly simple URL shortening"],
  datetime: datetime("2010-01-26")("03:34:00")("Pacific/Auckland"),
  tags: [".htaccess", "twitter"],
  body
};
