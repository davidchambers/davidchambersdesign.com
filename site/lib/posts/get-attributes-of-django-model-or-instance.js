import {code, em, h3, li, p, ul} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
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
  datetime: datetime("2010-02-22 20:24:00 (Pacific/Auckland)"),
  tags: ["django", "python"],
  body
};
