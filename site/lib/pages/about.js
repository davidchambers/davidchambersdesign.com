import {a, b, p} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
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
export default {
  slug: "about",
  title: ["About"],
  body: [p([b(["Greetings! My name is David Chambers and I'm a software developer\n      based in San Francisco."])]), p(["I work at ", a({
    href: "http://www.atlassian.com/"
  })(["Atlassian"]), "\n      with a great group of people dedicated to making ", a({
    href: "https://bitbucket.org/"
  })(["Bitbucket"]), " awesome.\n      Our efforts benefit tens of thousands of software developers,\n      which makes the job incredibly rewarding."]), p(["I've created several dozen ", a({
    href: "https://bitbucket.org/davidchambers"
  })(["open source projects"]), ",\n      many of which are small, self-contained JavaScript utilities\n      written in CoffeeScript. In 2011 I created and released ", a({
    href: "http://hashify.me/"
  })(["Hashify"]), ",\n      a little gift to the Internet. :)"]), captioned$002Dimages([{
    alt: "Me with friends Jo and Shaun at the Luge in Rotorua",
    src: "/images/about/david-jo-shaun.jpg",
    caption: ["Me with friends at the Luge in Rotorua"]
  }]), p(["Feel free to ", a({
    href: "http://twitter.com/davidchambers"
  })(["follow me on Twitter"]), ".\n      I tweet sporadically and infrequently."])]
};
