(import ["../elements"]

(let [
  code-block          (require "../components/code-block")
  datetime            (require "../datetime")
] {

  :id 49

  :slug "serializing-django-model-instances"

  :title "Serializing Django model instances"

  :datetime (datetime "2010-04-13" "08:16:00" :Pacific/Auckland)

  :tags [:django :python]

  :body [

    (p
       ["One might expect the following code to serialize a Django model
         instance:"])

    (code-block :python

       "
       import simplejson
       simplejson.dumps(instance)
       ")

    (p
       ["Unforunately, this raises a TypeError, as the instance is not JSON
         serializable. I don't understand " (em "why") " model instances are
         not serializable, but I do have a solution: define a serialization
         method on the instance's model."])

    (code-block :python

       "
       def toJSON(self):
           import simplejson
           return simplejson.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))
       ")

    (p
       ["Here's the verbose equivalent for those averse to one-liners:"])

    (code-block :python

       "
       def toJSON(self):
           fields = []
           for field in self._meta.fields:
               fields.append(field.name)

           d = {}
           for attr in fields:
               d[attr] = getattr(self, attr)

           import simplejson
           return simplejson.dumps(d)
       ")

    (p
       [(code "_meta.fields") " is an ordered list of model fields
         which can be accessed from instances and from the model itself. "
        (a "http://www.djangofoo.com/tag/meta-fields" "_meta.fields") "
         is one of the few features not covered in Django's excellent
         documentation."])

  ]

}))