import {h3, p, ul, li, code, em} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["What is the best way to get the attributes of a Django model ", "or instance?"]), code$002Dblock("python")("from django.db import models\n\nclass Musician(models.Model):\n    first_name = models.CharField()\n    last_name  = models.CharField()\n    instrument = models.CharField()\n  "), p(["One option is to use ", code(["__dict__.keys()"]), ":"]), code$002Dblock("python")(">>> m = Musician(first_name='Norah', last_name='Jones', instrument='piano')\n>>> print m.__dict__.keys()\n['last_name', 'instrument', 'first_name', 'id']\n  "), p(["Another options is to use ", code(["_meta.fields"]), ":"]), code$002Dblock("python")(">>> print [f.name for f in m._meta.fields]\n['id', 'first_name', 'last_name', 'instrument']\n  "), p(["This approach also works on models directly:"]), code$002Dblock("python")(">>> print [f.name for f in Musician._meta.fields]\n['id', 'first_name', 'last_name', 'instrument']\n  "), h3(["Advantages of using ", code(["_meta.fields"])]), ul([li(["items in returned list are correctly ordered"]), li(["applicable to both models and instances"]), li(["only ", em(["fields"]), " are returned"])]), p(["The fact that only fields are returned is extremely useful. ", "Django appears to add its own attributes to instances in ", "certain circumstances; using ", code(["_meta.fields"]), " ", "prevents these from interfering with one's own code."])];
export default {
  id: 38,
  slug: "get-attributes-of-django-model-or-instance",
  title: ["Get attributes of Django model or instance"],
  datetime: datetime("2010-02-22 20:24:00 (Pacific/Auckland)"),
  tags: ["django", "python"],
  body
};
