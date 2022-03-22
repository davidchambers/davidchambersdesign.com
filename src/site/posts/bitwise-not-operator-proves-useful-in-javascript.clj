(import* [:base "../elements" "../components"] {

  :id 75

  :title "Bitwise NOT operator proves useful in JavaScript"

  :datetime (datetime "2010-12-11" "15:00:00" :Australia/Sydney)

  :tags [:javascript :programming]

  :body [

    (p
       ["JavaScript is a wonderful language. Its syntax, though, leaves a
         lot to be desired at times. String pattern matching, for example,
         is rather ugly."])

    (code-block :javascript

       "
       // ugly option 1
       if (text.indexOf('✈') != -1)

       // ugly option 2
       if (text.indexOf('✈') >= 0)

       // ugly option 3
       if (text.indexOf('✈') > -1)
       ")

    (p
       ["It'd be nice to be able to write " (code "text.contains('✈')") ",
         which is both intuitive and self-documenting. The language does
         provide a way to make such expressions terser, but it's far from
         obvious."])

    (code-block :javascript

       "
       // bitwise NOT
       if (~text.indexOf('✈'))
       ")

    (p
       [(a "https://developer.mozilla.org/en/JavaScript/Reference/Operators/Bitwise_Operators"
           "Bitwise operators") " make my head spin, but the Perl
         programmer in me thinks they're awesome. I don't profess to
         understand " (em "why") " exactly the bitwise NOT operator
         does what it does, but I've played with it enough to know
         how it behaves. It's equivalent to the following function,
         at least for the values that can be returned by "
        (a "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/indexOf"
           (code "indexOf")) "."])

    (code-block :javascript

       "
       function bitwiseNot(n) {
           return -n - 1;
       }
       ")

    (p
       [(code "indexOf") " returns -1, 0, 1, 2, 3, or some other positive
         integer. When these values are used as operands for the bitwise
         NOT operator, the results are 0, -1, -2, -3, -4, and so on.
         Therefore, " (code "~text.indexOf('✈')") " is equivalent to "
        (code "text.contains('✈')") " in Boolean contexts."])

  ]

})