import {a, blockquote, em, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
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
const body = [p(["I recently came across an interesting article at ", a({
  href: "http://wonko.com/"
})(["wonko.com"]), " on ", a({
  href: "http://wonko.com/post/html-escaping"
})(["HTML escaping"]), ",\n    which provoked me to rewrite Bitbucket's escape function\n    (invoked from within Underscore templates):"]), code$002Dblock("javascript")(`function makeSafe(text) {
  return text.replace(/[&<>"'\`]/g, function (chr) {
    return '&#' + chr.charCodeAt(0) + ';';
  });
};
`), p(["This ensures that inserted content cannot escape the confines of a\n    quoted attribute value. Unquoted attributes are more problematic:"]), blockquote([p(["Unquoted attribute values are one of the single biggest XSS vectors\n      there is. If you don’t quote your attribute values, you’re essentially\n      leaving the door wide open for naughty people to inject naughty things\n      into your HTML. Very few escaper implementations cover all the edge\n      cases necessary to prevent unquoted attribute values from becoming\n      XSS vectors."])]), p(["To accommodate unquoted attribute values, the following function could\n    be used instead:"]), code$002Dblock("javascript")(`function makeSafe(text) {
  return text.replace(/\\W/g, function (chr) {
    return '&#' + chr.charCodeAt(0) + ';';
  });
};
`), p(["I created a ", a({
  href: "http://jsperf.com/html-escaping-perf"
})(["jsPerf test case"]), "\n    which confirms that there's a performance hit associated with using\n    this more liberal regular expression. Keep in mind, though, that if\n    “A” takes 1ms to execute and “B” takes ten times as long, “B” still\n    only takes 10ms. Quite often a significant ", em(["comparative"]), "\n    speed difference is insignificant in absolute terms; I'd argue that\n    this is the case here."])];
export default {
  id: 88,
  slug: "escaping-html-in-javascript",
  title: ["Escaping HTML in JavaScript"],
  datetime: datetime("2011-05-30")("15:00:00")("America/Los_Angeles"),
  tags: ["best-practice", "javascript", "security"],
  body
};
