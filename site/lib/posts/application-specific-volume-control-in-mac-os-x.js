import {a, dd, dl, dt, dt$0027, em, h3, h4, img, p, strong} from "../elements.js";
import {update} from "../components.js";
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
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const excerpt = [p(["It's not uncommon to start watching a video online and discover\n    that its audio is quite quiet. This is not a problem in and of\n    itself, as one can simply crank up the output volume. What ", em(["is"]), " a problem, however, is a message then arriving in\n    one's inbox and waking the neighbours!"]), p(["This situation could be avoided if it were possible adjust the\n    browser's output volume without affecting the rest of the system.\n    As it is, though, one is forced to increase the volume of ", em(["everything"]), ". Not ideal."]), h3(["System Preferences > Sound > Application Volumes"]), p([img({
  alt: `Possible interface for application-specific volume settings in Mac OS X
`,
  src: "/images/posts/windows/application-volumes.png"
})]), p(["Wouldn't this be nice? Many months ago I did some Googling to find out\n    whether it's possible to control volume on an application-by-application\n    basis in OS X. The closest thing to a solution was an X11 (read: ugly)\n    app that ", em(["kinda"]), " worked."])];
const body = [...excerpt, p(["Apple, I don't bug you often, but here I will. ", strong(["Please build this into the OS and keep the neighbours happy."]), "\n    It'd be particularly sexy if applications such as iTunes which ", em(["do"]), " currently grant the user control of the application's\n    volume synchronized their volume settings with the ones in System\n    Preferences. That is, adjusting the volume in iTunes would adjust\n    the iTunes volume setting in System Preferences, and vice versa."]), p(["+1 in the comments if you'd like to see this feature implemented. :)"]), update(datetime("2010-04-15")("14:36:00")("Pacific/Auckland"))([p([a({
  href: "http://www.joesoft.com/products/hear.php"
})(["Hear"]), "\n      offers this functionality, but isn't cheap. I hope Hear's\n      developers decide to release a preference pane that provides\n      the functionality of Hear's mixer pane and nothing more\n      (I'm about to make this request)."]), p([img({
  alt: "Hear's mixer pane",
  src: "/images/posts/windows/hear-mixer-pane.png"
})])]), h4(["Bonus titbit"]), p(["While faking the drop shadow on the Sound window above I discovered\n    a combination of drop shadow values which pretty much perfectly match\n    those of an active window in OS X:"]), p([img({
  alt: "Photoshop's drop shadow dialog",
  src: "/images/posts/47/drop-shadow-settings.png"
})]), dl([dt$0027({
  class: "textual"
})(["shadow color"]), dd(["#000000 (black)"]), dt(["opacity"]), dd(["45%"]), dt(["angle"]), dd(["90°"]), dt(["distance"]), dd(["16px"]), dt(["spread"]), dd(["0%"]), dt(["size"]), dd(["32px"])])];
export default {
  id: 47,
  slug: "application-specific-volume-control-in-mac-os-x",
  title: ["Application-specific volume control in Mac OS X?"],
  datetime: datetime("2010-04-07")("02:04:00")("Pacific/Auckland"),
  tags: ["mac-os-x", "ux"],
  body
};
