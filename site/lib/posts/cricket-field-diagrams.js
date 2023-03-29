import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
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
const body = [p(["While creating documentation for ", i(["Dice Cricket"]), ",\n    a game a friend and I designed many years ago, I produced\n    a set of diagrams which represent the segments of a cricket\n    field. The isolated nature of this small design challenge\n    provided a refreshing break from the various and interrelated\n    considerations involved in designing for the Web."]), captioned$002Dimages([{
  alt: "Cricket field with mid-wicket area highlighted",
  src: "/images/posts/40/mid-wicket.png",
  caption: ["Mid-wicket"]
}, {
  alt: "Cricket field with covers highlighted",
  src: "/images/posts/40/down-the-ground.png",
  caption: ["Down the ground"]
}, {
  alt: "Cricket field with covers highlighted",
  src: "/images/posts/40/covers.png",
  caption: ["Covers"]
}, {
  alt: "Cricket field with area behind point highlighted",
  src: "/images/posts/40/behind-point.png",
  caption: ["Behind point"]
}, {
  alt: "Cricket field with area behind the wicket highlighted",
  src: "/images/posts/40/behind-the-wicket.png",
  caption: ["Behind the wicket"]
}, {
  alt: "Cricket field with area backward of square highlighted",
  src: "/images/posts/40/behind-square.png",
  caption: ["Behind square"]
}]), p(["You're free to make use of these images (they're transparent PNGs).\n    Attribution is appreciated but not required. :)"])];
export default {
  id: 40,
  slug: "cricket-field-diagrams",
  title: ["Cricket field diagrams"],
  datetime: datetime("2010-03-15")("00:58:00")("Pacific/Auckland"),
  tags: ["design", "icons"],
  ["article-id"]: "cricket-field-diagrams",
  body
};
