import {a, em, p} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
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
const body = [p(["Generally speaking browsers rerender elements as required\n    – in response to DOM changes effected via JavaScript, for\n    instance. There are times, though, when the browser ", em(["Internet Explorer, I'm looking at you!"]), "\n    needs a gentle nudge."]), p([a({
  href: "http://ajaxian.com/archives/forcing-a-ui-redraw-from-javascript"
})(["Forcing a UI redraw from JavaScript"]), " highlights the solution\n    employed by Thomas Fuchs, creator of the popular JavaScript library ", a({
  href: "http://script.aculo.us/"
})(["script.aculo.us"]), ":"]), code$002Dblock("javascript")(`Element.addMethods({
    redraw: function (element) {
        element = $(element);
        var n = document.createTextNode(' ');
        element.appendChild(n);
        (function () { n.parentNode.removeChild(n); }).defer();
        return element;
    }
});
`), p(["The post's first comment includes an alternative approach:"]), code$002Dblock("javascript")(`element.className = element.className;
`), p(["I gather that there are situations in which this simple solution fails", $2014, "it's no silver bullet", $2014, "but it fixed a problem I encountered in\n    IE8 earlier this evening so I'm pleased to have discovered it!"])];
export default {
  id: 42,
  slug: "forcing-browsers-to-rerender-elements",
  title: ["Forcing browsers to rerender elements"],
  datetime: datetime("2010-03-22")("19:40:00")("Pacific/Auckland"),
  tags: ["dom", "ie", "javascript"],
  body
};
