import {code, p} from "../elements.js";
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
const body = [p(["This site's search field has been virtually unusable in Chrome\n    and Safari on Windows for several months. Fixing it was not high\n    on my priority list, but I finally got to it this evening."]), captioned$002Dimages([{
  alt: "-webkit-box-sizing: border-box",
  src: "/images/posts/58/-webkit-box-sizing=border-box.png",
  caption: ["Before"]
}]), p(["I did my best to get these browsers to respect the padding values\n    that I'd assigned in my style sheet, getting aggressive in the Web\n    Inspector. No joy."]), p(["I then noticed a curious property, ", code(["-webkit-box-sizing"]), ".\n    Sure enough, this was the culprit. Safari and Chrome both use ", code(["border-box"]), " as the default value, which means that\n    padding does not add to an element's dimensions the way it does\n    in the standard box model."]), p(["Specifying ", code(["content-box"]), " fixed the problem."]), captioned$002Dimages([{
  alt: "-webkit-box-sizing: content-box",
  src: "/images/posts/58/-webkit-box-sizing=content-box.png",
  caption: ["After"]
}]), p(["This is an extremely satisfying solution as it neatly targets\n    the source of the problem."]), p(["The question remains as to why these browsers default to ", code(["border-box"]), " as the ", code(["box-sizing"]), " for ", code(["input"]), " elements with ", code(["type=\"search\""]), ".\n    I don't know whether default styles are specified at the\n    rendering engine level or at the browser level, but either\n    way I would say that it's the result of Apple fiddling with\n    the controls to make search inputs look sexy on Mac OS X\n    (where they're rendered very differently)."])];
export default {
  id: 58,
  slug: "-webkit-box-sizing",
  title: ["-webkit-box-sizing"],
  datetime: datetime("2010-07-18")("21:30:00")("Pacific/Auckland"),
  tags: ["css", "webkit"],
  body
};
