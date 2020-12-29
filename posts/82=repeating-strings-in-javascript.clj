(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "Repeating strings in JavaScript"

  :datetime (datetime "2011-03-31" "17:30:00" :America/Los_Angeles)

  :tags [:javascript :programming]

  :body [

    (p
       ["Python and Ruby share beautiful syntax for repeating strings;
         PHP's syntax is characteristically ugly."])

    (h3' {:id "python"} "Python")

    (code-block :python

       "'=' * 5")

    (h3' {:id "ruby"} "Ruby")

    (code-block :ruby

       "'=' * 5")

    (h3' {:id "php"} "PHP")

    (code-block :php

       "str_repeat('=', 5)")

    (h3' {:id "javascript"} "JavaScript?")

    (p
       ["True to form, repeating strings in JavaScript is ugly and
         counterintuitive, but kinda cool."])

    (code-block :javascript

       "new Array(5 + 1).join('=')")

  ]

})
