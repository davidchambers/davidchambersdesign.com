import {em, img, li, li$0027, ol, p, strong} from "../elements.js";
import {captioned$002Dimages, $2014} from "../components.js";
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
const body = [p([img({
  alt: "",
  src: "/images/posts/decorative/right/no-apple.png"
})]), p(["The following conversation took place a couple of days ago in\n    my apartment. Matt's my flatmate, Doug's one of Matt's friends.\n    I was in the room at the time."]), ol([li$0027({
  class: "interviewer"
})([strong(["Matt:"]), "\n      So, Doug, do you think you could go the way of Mac?"]), li([strong(["Doug:"]), "\n      I already have, really, but I'd never buy one."]), li$0027({
  class: "interviewer"
})([strong(["Matt:"]), "\n      Why's that?"]), li([strong(["Doug:"]), "\n      Well", $2014, "no offense, David", $2014, "if I were to buy one I'd be\n      getting something a retard could use, and I'm not a retard."])]), p(["I found this exchange both entertaining and enlightening. Never had\n    I considered the possibility that certain individuals use Windows ", em(["because"]), " it's poorly designed and difficult to use!"]), p(["There's certainly some sound reasoning behind Doug's stance: Doug\n    is proficient in Windows; gaining proficiency in Windows requires\n    a certain level of intelligence; Doug's proficiency in Windows is\n    therefore indicative of his intelligence."]), p(["Why, then, does Doug say that he's switched camps? He's using one\n    of these at school:"]), captioned$002Dimages([{
  alt: "27-inch iMac",
  src: "/images/posts/44/27-inch-imac.jpg",
  caption: ["27-inch iMac"]
}]), p(["Talk about having one's cake and eating it, too."])];
export default {
  id: 44,
  slug: "fascinating-insight-into-the-mind-of-a-windows-user",
  title: ["Fascinating insight into the mind of a Windows user"],
  datetime: datetime("2010-03-25")("15:06:00")("Pacific/Auckland"),
  tags: ["mac-os-x", "windows"],
  body
};
