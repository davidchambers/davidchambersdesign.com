(import ["../elements"]

(let [
  code-block          (require "../components/code-block")
  datetime            (require "../datetime")
] {

  :id 70

  :slug "converting-integers-to-ordinals"

  :title "Converting integers to ordinals"

  :datetime (datetime "2010-09-16" "13:00:00" :Pacific/Auckland)

  :tags [:javascript :programming :python]

  :body [

    (p
       ["When dealing with dates, it's not uncommon to need to convert an
         integer into an ordinal number (1st, 2nd, 3rd, etc.). While making
         improvements to " (a "http://mango.io/wtf?" "Mango") " recently I
         wrote a function to do this, first in Python, later in JavaScript."])

    (h3 "Python")

    (code-block :python

       "
       def ordinal(n):
           if 10 < n < 14: return u'%sth' % n
           if n % 10 == 1: return u'%sst' % n
           if n % 10 == 2: return u'%snd' % n
           if n % 10 == 3: return u'%srd' % n
           return u'%sth' % n
       ")

    (h3 "JavaScript")

    (code-block :javascript

       "
       function ordinal(n) {
           if (10 < n && n < 14) return n + 'th';
           switch (n % 10) {
               case 1: return n + 'st';
               case 2: return n + 'nd';
               case 3: return n + 'rd';
               default: return n + 'th';
           }
       }
       ")

    (p
       ["By special-casing 11, 12, and 13, the function becomes incredibly
         simple."])

    (p
       ["I'm pleased to have found a context in which JavaScript's "
        (code "switch") " statement is almost " (em "elegant") ".
         The problem, usually, is the need to " (code "break") "
         to prevent fall-through. When used within a function,
         though, the " (code "return") " statement is able to
         perform this role, making the JavaScript code almost
         as readable as the Python equivalent."])

  ]

}))