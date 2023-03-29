import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => Prelude["match'"](type)(_ => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude.filter(x => Prelude.not(predicate(x))),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {_apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
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
