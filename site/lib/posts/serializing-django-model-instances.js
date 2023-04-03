import {a, code, em, p} from "../elements.js";
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
const body = [p(["One might expect the following code to serialize a Django model instance:"]), code$002Dblock("python")(`import simplejson
simplejson.dumps(instance)
`), p(["Unforunately, this raises a TypeError, as the instance is not JSON\n    serializable. I don't understand ", em(["why"]), " model instances are\n    not serializable, but I do have a solution: define a serialization\n    method on the instance's model."]), code$002Dblock("python")(`def toJSON(self):
    import simplejson
    return simplejson.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))
`), p(["Here's the verbose equivalent for those averse to one-liners:"]), code$002Dblock("python")(`def toJSON(self):
    fields = []
    for field in self._meta.fields:
        fields.append(field.name)

    d = {}
    for attr in fields:
        d[attr] = getattr(self, attr)

    import simplejson
    return simplejson.dumps(d)
`), p([code(["_meta.fields"]), " is an ordered list of model fields\n    which can be accessed from instances and from the model itself. ", a({
  href: "http://www.djangofoo.com/tag/meta-fields"
})(["_meta.fields"]), "\n    is one of the few features not covered in Django's excellent\n    documentation."])];
export default {
  id: 49,
  slug: "serializing-django-model-instances",
  title: ["Serializing Django model instances"],
  datetime: datetime("2010-04-13")("08:16:00")("Pacific/Auckland"),
  tags: ["django", "python"],
  body
};
