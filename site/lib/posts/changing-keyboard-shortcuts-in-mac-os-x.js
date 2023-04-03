import {a, li, p, strong, ul} from "../elements.js";
import datetime from "../datetime.js";
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = {
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
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter($ => not(f($))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const excerpt = [p(["I've been using OS X almost exclusively for the last three\n    or four years, but it was only recently that I discovered the\n    system-wide method for changing keyboard shortcuts. I think\n    the reason that this feature eluded me for so long is that so\n    many of the hours I've spent on OS X have involved the use of\n    the Adobe applications Photoshop, Illustrator, and InDesign,\n    which provide their own means of changing keyboard shortcuts.\n    I assumed that since application developers sometimes provide\n    their own interfaces for changing keyboard shortcuts, the\n    operating system must lack this functionality. I was wrong."])];
const body = [...excerpt, p(["I stumbled upon this useful information while reading ", a({
  href: "http://caminobrowser.org/documentation/faq/#cust_change"
})(["Camino's FAQ"]), ". I have reproduced its step-by-step instructions\n    below, since they are right on the money."]), ul([li(["First, quit «application»; if it is running."]), li(["Open ", strong(["System Preferences"]), "."]), li(["Choose the ", strong(["\"Keyboard & Mouse\""]), " pane."]), li(["Select the \"Keyboard Shortcuts\" tab."]), li(["Press the \"+\" button at the bottom of that tab."]), li(["In the ", strong(["Application"]), " pop-up menu, choose ", strong(["<application>"]), "."]), li([`In the "Menu Title" field, type the exact name of the menu
      item you want to change, and in the "Keyboard Shortcut" field,
      type the new shortcut you want that menu item to have. Press
      the "OK" button to save the new shortcut.`]), li(["You may now relaunch <application>."])])];
export default {
  id: 9,
  slug: "changing-keyboard-shortcuts-in-mac-os-x",
  title: ["Changing keyboard shortcuts in Mac OS X"],
  datetime: datetime("2009-03-25")("16:36:00")("Pacific/Auckland"),
  tags: ["keyboard-shortcuts", "mac-os-x"],
  body
};
