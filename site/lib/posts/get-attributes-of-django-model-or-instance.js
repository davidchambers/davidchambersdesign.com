import {code, em, h3, li, p, ul} from "../elements.js";
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
const body = [p(["What is the best way to get the attributes of a Django model\n    or instance?"]), code$002Dblock("python")(`from django.db import models

class Musician(models.Model):
    first_name = models.CharField()
    last_name  = models.CharField()
    instrument = models.CharField()
`), p(["One option is to use ", code(["__dict__.keys()"]), ":"]), code$002Dblock("python")(`>>> m = Musician(first_name='Norah', last_name='Jones', instrument='piano')
>>> print m.__dict__.keys()
['last_name', 'instrument', 'first_name', 'id']
`), p(["Another options is to use ", code(["_meta.fields"]), ":"]), code$002Dblock("python")(`>>> print [f.name for f in m._meta.fields]
['id', 'first_name', 'last_name', 'instrument']
`), p(["This approach also works on models directly:"]), code$002Dblock("python")(`>>> print [f.name for f in Musician._meta.fields]
['id', 'first_name', 'last_name', 'instrument']
`), h3(["Advantages of using ", code(["_meta.fields"])]), ul([li(["items in returned list are correctly ordered"]), li(["applicable to both models and instances"]), li(["only ", em(["fields"]), " are returned"])]), p(["The fact that only fields are returned is extremely useful.\n    Django appears to add its own attributes to instances in\n    certain circumstances; using ", code(["_meta.fields"]), "\n    prevents these from interfering with one's own code."])];
export default {
  id: 38,
  slug: "get-attributes-of-django-model-or-instance",
  title: ["Get attributes of Django model or instance"],
  datetime: datetime("2010-02-22")("20:24:00")("Pacific/Auckland"),
  tags: ["django", "python"],
  body
};
