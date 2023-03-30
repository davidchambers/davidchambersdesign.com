import {a, dd, dl, dt, object, p, param, strong} from "../elements.js";
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
const body = [p(["One of my flatmates linked me to this clip recently. It's titled ", a({
  href: "http://www.ted.com/index.php/talks/david_carson_on_design.html"
})(["Design, discovery and humor"]), " and certainly delivers the\n    entertainment it promises. It's well worth a look."]), dl([dt([object({
  type: "application/x-shockwave-flash",
  width: "446",
  height: "326",
  data: "http://video.ted.com/assets/player/swf/EmbedPlayer.swf"
})([param({
  name: "movie",
  value: "http://video.ted.com/assets/player/swf/EmbedPlayer.swf"
}), param({
  name: "wmode",
  value: "transparent"
}), param({
  name: "allowFullScreen",
  value: "true"
}), param({
  name: "flashvars",
  value: "vu=http://video.ted.com/talks/embed/DavidCarson_2003-embed_high.flv&su=http://images.ted.com/images/ted/tedindex/embed-posters/DavidCarson-2003.embed_thumbnail.jpg&vw=432&vh=240&ap=0&ti=436"
})])]), dd([p(["David Carson presents ", strong(["Design, discovery and humor"]), "\n        at TED, February 2003"])])])];
export default {
  id: 6,
  slug: "david-carsons-2003-ted-lecture",
  title: ["David Carson's 2003 TED lecture"],
  datetime: datetime("2009-02-10")("11:21:00")("Pacific/Auckland"),
  tags: ["design", "typography", "video"],
  body
};
