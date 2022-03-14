(import* [:base "../elements" "../components"] {

  :id 86

  :title "End of string anchor in JavaScript regular expressions"

  :datetime (datetime "2011-05-22" "18:30:00" :America/Los_Angeles)

  :tags [:javascript :regex :regular-expressions]

  :body [

    (p
       ["JavaScript's regular expressions are less than awesome, sadly.
         One limitation is the lack of start of string and end of string
         anchors. In Perl, for example, " (code "\\A") " matches the start
         of a string, " (code "\\Z") " the end."])

    (p
       ["Most of the time it's possible to get by with " (code "^") " and "
        (code "$") " which act like " (code "\\A") " and " (code "\\Z") " "
        (strong "except in multiline mode") " where they match the start
         and end of any line."])

    (p
       ["It's possible, though, to have a lookahead act as an end of string
         anchor in multiline mode:"])

    (code-block :javascript

       """
       > /bar(?![\s\S])/m.test('foo\nbar')
       true
       > /bar(?![\s\S])/m.test('foo\nbar\n')
       false
       > /bar(?![\s\S])/m.test('foo\nbar\nbaz')
       false
       """)

    (p
       [(code "(?![\\s\\S])") " at the end of the pattern is equivalent to "
        (code "\\Z") "."])

    (h3 "Start of string anchor?")

    (p
       ["Unfortunately, since JavaScript offers lookahead but not lookbehind,
         this approach can't be used to simulate " (code "\\A") "."])

  ]

})
