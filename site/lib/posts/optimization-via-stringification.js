import {h4, p} from "../elements.js";
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
const excerpt = [p(["One way to reduce the number of HTTP requests a page requires\n    is to group (non-content) images into sprites. An even better\n    way is to remove these images from the server altogether;\n    instead include them as encoded strings in your style sheet."])];
const body = [...excerpt, p(["Instead of..."]), code$002Dblock("css")(`a[href="/contact/"] {
    background: url(/images/sprite.png) no-repeat 0 -30px;
}
`), p(["use something like..."]), code$002Dblock("css")(`a[href="/contact/"] {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALJJREFUeNrs1eEJgzAQBWATHKkjZAZHiCtkhKxgRnAGR+gMWSVypflRQfOeSgvlDgTxjvuSC0RTSul+EUZhhRX+bziNj0ur8tPT7OV6qEGMFJhCaNZYBA3DAKNSiyzUIs3iPEO41EgtEhbdSQtnUAo+wlmUhiWccx+4vMs3NnqmeEmpc96/norXndbc7fC28Xa0kmNwewbdPYY3fgvMjhDFm6POOUM3kf6dFFZY4a/FKsAADsZ+Lb8VFH4AAAAASUVORK5CYII=) no-repeat;
}
`), p(["I threw together a Python script which converts images to encoded\n    strings."]), code$002Dblock("python")(`#stringify.py
import base64
import sys

f = open(sys.argv[1], 'rb')
s = f.read()
f.close()

try:
    altchars = sys.argv[2]
except IndexError:
    altchars = None

print base64.b64encode(s, altchars)
`), h4(["Usage"]), code$002Dblock("console")(`$ python stringify.py /path/to/image.png
`)];
export default {
  id: 51,
  slug: "optimization-via-stringification",
  title: ["Optimization via stringification"],
  datetime: datetime("2010-06-03")("14:28:00")("Pacific/Auckland"),
  tags: ["css", "optimization", "python"],
  body
};
