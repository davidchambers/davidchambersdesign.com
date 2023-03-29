import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
const Prelude = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => Prelude["match'"](type)(_ => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude.filter(x => Prelude.not(predicate(x))),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
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
