import {p, a, code, em} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
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
  datetime: datetime("2010-04-13 08:16:00 (Pacific/Auckland)"),
  tags: ["django", "python"],
  body
};
