import {a, p, strong} from "../elements.js";
import {captioned$002Dimages, update} from "../components.js";
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
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const body = [p(["I love ", a({
  href: "http://www.panic.com/coda/"
})(["Coda"]), ".\n    It's just so... sexy, somehow. I've just discovered ", a({
  href: "http://www.djangoproject.com/"
})(["Django"]), ", with which\n    I'm fast falling in love as well. Naturally, when I came to write\n    my first Django template I opened Coda.app and started coding."]), p(["It soon became apparent, however, that ", strong(["Coda does not apply\n    syntax highlighting to Django"]), ". The solution? Juan Pablo Claude's ", a({
  href: "http://weblog.bignerdranch.com/?p=49"
})(["Django and Django-template bundles for Coda"]), "."]), captioned$002Dimages([{
  alt: "Django syntax highlighting in Coda",
  src: "/images/posts/11/django-syntax-highlighting-in-coda.png",
  caption: ["Django syntax highlighting in Coda"]
}]), update(datetime("2010-11-14")("14:00:00")("Australia/Sydney"))([p(["I've since discovered an alternative mode which\n      is actively maintained over on GitHub. I now use ", a({
  href: "https://github.com/jbergantine/Django-Template"
})(["jbergantine's Django-Template"]), "."])])];
export default {
  id: 11,
  slug: "django-syntax-highlighting-for-coda",
  title: ["Django syntax highlighting for Coda"],
  datetime: datetime("2009-04-16")("22:15:00")("Pacific/Auckland"),
  tags: ["coda", "django", "mac-os-x"],
  body
};
