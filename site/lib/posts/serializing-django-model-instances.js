import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
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
