(import ["../elements"]

(let [
  luxon               (require "../luxon")
  code-block          (require "../components/code-block")
] {

  :id 68

  :slug "efficient-rounding-in-javascript"

  :title "Efficient rounding in JavaScript"

  :datetime (luxon/datetime "2010-08-31" "22:20:00" :Pacific/Auckland)

  :tags [:javascript :optimization :performance]

  :body [

    (p
       ["So you have some number, " (code "x") ", which you want to round
         to the nearest integer. Easy, right?"])

    (code-block :javascript

       "
       x = Math.round(x);
       ")

    (p
       ["Sure, but is this the fastest option? I think not."])

    (code-block :javascript

       "
       x = x < 0 ? x - 0.5 >> 0 : x + 0.5 >> 0;
       ")

    (p
       ["What the heck's going on here? " (code ">>") " is JavaScript's
         right shift operator. It shifts a number's binary representation "
        (code "n") " bits to the right, where " (code "n") " is the
         value to the right of the operator. Since " (code "n") " is "
        (code "0") " in this case, no shifting will occur, although "
        (strong "the resulting value will be an integer") "."])

    (p
       ["Note that this approach results in " (code "-82.5") " being
         rounded to " (code "-83") "."])

    (p
       ["If, for some reason, your code calls " (code "Math.round()") "
         millions of times, it may be worth investigating the bitwise
         approach to avoid the overhead of all those function calls."])

    (p
       ["Stick to " (code "Math.round()") " the rest of the
         time, though, as it makes for much clearer code. "
        (strong "Never optimize prematurely.")])

  ]

}))
