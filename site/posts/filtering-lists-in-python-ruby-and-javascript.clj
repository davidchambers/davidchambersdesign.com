(import ["../elements"]

(let [
  code-block          (require "../components/code-block")
  datetime            (require "../datetime")
] {

  :id 69

  :slug "filtering-lists-in-python-ruby-and-javascript"

  :title "Filtering lists in Python, Ruby, and JavaScript"

  :datetime (datetime "2010-09-09" "04:21:00" :Pacific/Auckland)

  :tags [:javascript :programming :python :ruby]

  :body [

    (p
       ["Recently I listened to "
        (a "http://blog.extracheese.org/2010/02/python-vs-ruby-a-battle-to-the-death.html"
           "Gary Bernhardt comparing Python and Ruby") ". In the talk Gary
         states that he finds Ruby code ugly and Python code beautiful.
         He then goes on to say that the things which reduce Ruby's
         aesthetic appeal are the very things which allow Ruby to do
         beautiful things impossible in Python."])

    (p
       ["Gary provides several examples of equivalent code in Python and
         Ruby to highlight situations in which one language reads better
         than the other, such as the following."])

    (p
       ["Python:"])

    (code-block :python

       "
       '\\n'.join(obj.name
           for obj in (
               repository.retrieve(id)
               for id in ids)
           if obj)
       ")

    (p
       ["Ruby:"])

    (code-block :ruby

       "
       ids.map do |id|
         repository.retrieve(id)
       end.compact.map do |obj|
         obj.name
       end.join('\\n')
       ")

    (p
       ["The Ruby code (the one beginning with " (code "ids.map") ") reads top
         to bottom and is easy to follow. The Python code is equally succinct
         but takes a bit of effort to decipher."])

    (p
       ["I've been greatly enjoying the act of writing JavaScript lately,
         so simply for pleasure I worked out the JavaScript equivalent."])

    (p
       ["My first attempt used the " (code "filter") " array method."])

    (code-block :javascript

       "
       ids.filter(function (id) {
           var obj = repository.retrieve(id);
           return obj && obj.name;
       }).join('\\n');
       ")

    (p
       [(a "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Filter"
           (code "filter")) ", though, just removes from an array the
         items which fail the provided \"test\". So the code above is
         on the right track, but fails to produce a list of names."])

    (p
       [(a "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Reduce"
           (code "reduce")) " is the correct method for the job. "
        (code "reduce") " \"reduces\" an array to a single value, which
         could be a string, an object, another array -- whatever!"])

    (p
       ["Note the empty array (" (code "[]") ") on line 5 – that's our
         \"accumulator\"."])

    (code-block :javascript

       "
       ids.reduce(function (ids, id) {
           var obj = repository.retrieve(id);
           if (obj && obj.name) ids.push(obj.name);
           return ids;
       }, []).join('\\n');
       ")

    (p
       ["Not bad. It's not as elegant as the Ruby code, but it's not
         \"inside out\" the way the Python code is."])

  ]

}))