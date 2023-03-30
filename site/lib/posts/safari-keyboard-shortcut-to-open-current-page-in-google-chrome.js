import {a, li, ol, p, strong} from "../elements.js";
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
const body = [p(["I followed ", a({
  href: "http://daringfireball.net/2010/11/flash_free_and_cheating_with_google_chrome"
})(["John Gruber's suggestion"]), " and removed Flash Player from my Mac.\n    Like John, I've come to rely upon Google Chrome for viewing the\n    occasional Flash movie. As a result I've become proficient at the\n    keyboard dance required to open in Chrome the page I'm currently\n    viewing in Safari:"]), ol([li([strong(["⌘L"]), "\n      (", strong(["File"]), " > ", strong(["Open Location..."]), ")"]), li([strong(["⌘C"]), "\n      (", strong(["Edit"]), " > ", strong(["Copy"]), ")"]), li([strong(["⌘Space"]), "\n      (invoke Quicksilver/Spotlight)"]), li([strong(["C-H-R-↩"]), "\n      (open Google Chrome)"]), li([strong(["⌘L"]), "\n      (", strong(["File"]), " > ", strong(["Open Location..."]), ")"]), li([strong(["⌘V"]), "\n      (", strong(["Edit"]), " > ", strong(["Paste"]), ")"]), li([strong(["↩"]), "\n      (go, go, go!)"])]), p(["Well, I've performed this dance for the last time.\n    I now do this instead:"]), ol([li([strong(["⌥⌘G"])])]), p(["Credit for this simple but brilliant idea goes to Rob McBroom.\n    Rob's post on ", a({
  href: "http://projects.skurfer.com/posts/2011/chrome_shortcut/"
})(["opening pages in Google Chrome"]), " lists the (very easy)\n    steps required to enable this shortcut."]), update(datetime("2011-01-30")("23:30:00")("America/Los_Angeles"))([p(["Chris points out that John himself mentioned this trick\n      in his aforelinked post."])])];
export default {
  id: 77,
  slug: "safari-keyboard-shortcut-to-open-current-page-in-google-chrome",
  title: ["Safari keyboard shortcut to open current page in Google Chrome"],
  datetime: datetime("2011-01-30")("21:35:00")("America/Los_Angeles"),
  tags: ["flash", "google-chrome", "keyboard-shortcuts", "mac-os-x", "safari"],
  body
};
