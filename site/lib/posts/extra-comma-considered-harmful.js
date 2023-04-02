import {a, blockquote, em, p, time} from "../elements.js";
import {code$002Dblock} from "../components.js";
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
const body = [p(["On ", time({
  datetime: "2010-03-19T13:58-00:00"
})(["19 March 2010"]), ",\n    David Chambers wrote:"]), blockquote([p(["Hi Douglas,"]), p(["[...] Moments ago I used ", a({
  href: "http://www.jslint.com/"
})(["JSLint"]), "\n      for the first time; I plan to use it frequently\n      from this point forward. I have one question,\n      though, concerning the acceptability of extra\n      commas. Consider the following code snippet:"]), code$002Dblock("javascript")(`var ninja = {
    name: 'Hattori Hanzou Masashige',
    shuriken: 5,
    attack: function () {
        if (ninja.shuriken) {
            ninja.shuriken -= 1;
            window.alert('Hai-Ya!');
        }
    },
};
`), p(["JSLint returns an ", em(["extra comma"]), " error for the unnecessary\n      comma preceding the closing brace. I would argue, though, that this in\n      not an error. As far as I'm aware, this comma will not cause problems."]), p(["In fact, quite the opposite is true. If one were to insert an\n      additional property or method after ", em(["attack"]), " one would\n      not need to remember to first add a comma. In Django it's considered\n      best practice to include a comma after every item (including the last)\n      in a one item per line collection for this very reason."]), p(["I thought I'd give you my two cents, anyway. :)"]), p(["Regards,"]), p(["David Chambers"])]), p(["On ", time({
  datetime: "2010-03-19T15:13-00:00"
})(["19 March 2010"]), ",\n    Douglas Crockford wrote:"]), blockquote([p(["Your awareness is incorrect. Have you tested on IE6?"])])];
export default {
  id: 46,
  slug: "extra-comma-considered-harmful",
  title: ["Extra comma considered harmful"],
  datetime: datetime("2010-03-29")("15:30:00")("Pacific/Auckland"),
  tags: ["best-practice", "javascript"],
  body
};
