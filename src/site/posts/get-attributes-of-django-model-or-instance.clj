(import* [:base "../elements" "../components"] {

  :id 38

  :title "Get attributes of Django model or instance"

  :datetime (datetime "2010-02-22" "20:24:00" :Pacific/Auckland)

  :tags [:django :python]

  :body [

    (p
       ["What is the best way to get the attributes of a Django model
         or instance?"])

    (code-block :python

       "
       from django.db import models

       class Musician(models.Model):
           first_name = models.CharField()
           last_name  = models.CharField()
           instrument = models.CharField()
       ")

    (p
       ["One option is to use " (code "__dict__.keys()") ":"])

    (code-block :python

       "
       >>> m = Musician(first_name='Norah', last_name='Jones', instrument='piano')
       >>> print m.__dict__.keys()
       ['last_name', 'instrument', 'first_name', 'id']
       ")

    (p
       ["Another options is to use " (code "_meta.fields") ":"])

    (code-block :python

       "
       >>> print [f.name for f in m._meta.fields]
       ['id', 'first_name', 'last_name', 'instrument']
       ")

    (p
       ["This approach also works on models directly:"])

    (code-block :python

       "
       >>> print [f.name for f in Musician._meta.fields]
       ['id', 'first_name', 'last_name', 'instrument']
       ")

    (h3 ["Advantages of using " (code "_meta.fields")])

    (ul
       [(li ["items in returned list are correctly ordered"])
        (li ["applicable to both models and instances"])
        (li ["only " (em "fields") " are returned"])])

    (p
       ["The fact that only fields are returned is extremely useful.
         Django appears to add its own attributes to instances in
         certain circumstances; using " (code "_meta.fields") "
         prevents these from interfering with one's own code."])

  ]

})
