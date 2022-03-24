(import* ["../elements"]

(let [
  code-block          (require "../components/code-block")
  datetime            (require "../datetime")
] {

  :id 78

  :slug "simulating-nonlocal-in-python-2.x"

  :title ["Simulating " (code "nonlocal") " in Python 2.x"]

  :datetime (datetime "2011-02-05" "19:30:00" :America/Los_Angeles)

  :tags [:hacks :programming :python]

  :body [

    (excerpt

       [(p
           [(a "http://en.wikipedia.org/wiki/Closure_(computer_science)"
               "Closure") " is truly wonderful. JavaScript -- despite its
             plethora of quirks -- is now widely appreciated, thanks in large
             part to its lexical scoping. Python 3 is lexically-scoped, too,
             as the following code demonstrates."])

        (code-block :python

           "
           def cache(saved=None):
               def _(thing=None):
                   nonlocal saved
                   if thing is not None:
                       saved = thing
                   return saved
               return _
           cache = cache()
           ")

        (p
           ["If (the rebound) " (code "cache") " is passed no arguments
             (or " (code "None") "), " (code "saved") " is returned.
             Otherwise, " (code "thing") " is assigned to " (code "saved") "
             and returned."])

        (code-block :TK

           "
           >>> cache(2**3)
           8
           >>> cache()
           8
           ")

        (p
           ["This works thanks to the " (code "nonlocal") " keyword
             introduced in Python 3, which enables variables in outer
             scopes to be rebound. So how would one achieve the same
             result in earlier versions of Python?"])])

    (h3 "Bringing lexical scoping to Python 2.x")

    (code-block :python

       "
       def cache(saved=None):
           def _(thing=None):
               # nonlocal saved
               if thing is not None:
                   saved = thing
               return saved
           return _
       cache = cache()
       ")

    (p
       ["The " (code "nonlocal") " line is commented out as it's a syntax
         error in Python 2.x."])

    (code-block :TK

       "
       >>> cache(2**3)
       8
       >>> cache()
       ...
       UnboundLocalError: local variable 'saved' referenced before assignment
       ")

    (p
       ["When " (code "cache") " is passed a (non-" (code "None") ") "
        (code "thing") ", a " (em "new") " " (code "saved") " is
         created within the local scope. When " (code "cache") " is
         passed no arguments (or " (code "None") "), execution skips
         to " (code "return saved") ". At this point, " (code "saved") "
         is expected to exist within the local scope – it does not,
         which explains the " (code "UnboundLocalError") "."])

    (p
       ["It is possible to simulate lexical scoping in Python 2.x.
         The approaches I find most palatable utilize a dictionary
         or a function object as a namespace accessible to both the
         inner and outer functions."])

    (h4 "Dictionary")

    (code-block :python

       "
       def cache():
           ns = {'saved': None}
           def _(thing=None):
               if thing is not None:
                   ns['saved'] = thing
               return ns['saved']
           return _
       cache = cache()
       ")

    (h4 "Function object")

    (code-block :python

       "
       def cache():
           def ns(): pass
           ns.saved = None
           def _(thing=None):
               if thing is not None:
                   ns.saved = thing
               return ns.saved
           return _
       cache = cache()
       ")

    (p
       ["The dictionary approach is arguably more correct, but subscript
         notation hurts my eyes so I prefer to stick things on a function
         object. It's useful that " (code "def ns(): pass") " looks odd, as
         it alerts the reader to the fact that something " (em "is") " odd."])

  ]

}))
