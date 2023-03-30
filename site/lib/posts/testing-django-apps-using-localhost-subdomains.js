import {a, code, em, img, li, ol, p} from "../elements.js";
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
const body = [p(["This turned out to be quite a bit easier than I'd imagined.\n    Here are the things I did:"]), ol([li([p(["I saved ", a({
  href: "http://thingsilearned.com/2009/01/05/using-subdomains-in-django/"
})(["Dave Fowler's subdomain middleware"]), "\n        as ", code(["middleware.py"]), " in my project directory:"]), code$002Dblock("python")(`class SubdomainMiddleware:
    def process_request(self, request):
        '''Parse out the subdomain from the request'''
        request.subdomain = None
        host = request.META.get('HTTP_HOST', '')
        host_s = host.replace('www.', '').split('.')
        if len(host_s) > 2:
            request.subdomain = ''.join(host_s[:-2])
`)]), li([p(["I added this to my project's ", code(["MIDDLEWARE_CLASSES"]), ":"]), code$002Dblock("python")(`MIDDLEWARE_CLASSES = (
    ...,
    'middleware.SubdomainMiddleware',
)
`)]), li([p(["I edited my ", code(["/etc/hosts"]), " file as per Dave's suggestion:"]), code$002Dblock("plain-text")(`127.0.0.1 test.com
127.0.0.1 blog.test.com
127.0.0.1 search.test.com
`), p(["Initially I replaced ", code(["test.com"]), " with the\n        site's domain name, but I decided that it's useful to\n        be able to access both the live site and the test site\n        without editing the ", code(["/etc/hosts"]), " file."]), p(["At this point I expected everything to work as advertised.\n        Instead, I got this:"]), p([img({
  alt: "It works!",
  src: "/images/posts/windows/it-works!.png"
})]), p([`That would depend on one's definition of "works". I wanted my
        Django site to appear, which required a very simple tweak...`])]), li([p(["I added the port number to the address:"]), code$002Dblock("plain-text")(`http://test.com:8000/
`), p(["This ", em(["actually"]), " worked. :)"])])])];
export default {
  id: 56,
  slug: "testing-django-apps-using-localhost-subdomains",
  title: ["Testing Django apps using localhost subdomains"],
  datetime: datetime("2010-07-04")("08:23:00")("Pacific/Auckland"),
  tags: ["django", "mac-os-x"],
  body
};
