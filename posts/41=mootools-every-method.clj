(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "MooTools every method"

  :datetime (datetime "2010-03-18" "00:40:00" :Pacific/Auckland)

  :tags ["JavaScript" "MooTools"]

  :body [

    (p
       ["A reasonably common task is to determine whether a particular
         statement evaluates as true for every item in a collection.
         Take " (var "list") ", for example, an Array containing
         several numbers:"])

    (code-block
       "var list = [4, -1, 3, 2, 5];")

    (p
       ["One might wish to determine whether all the numbers in "
        (var "list") " are positive. The required logic is as follows:"])

    (ol
       [(li
           ["assume that all the numbers in " (var "list") " are positive,
             then..."])
        (li
           ["loop through " (var "list") " until the assumption is proven
             to be false, or until all items in " (var "list") " have been
             tested"])])

    (p
       ["In plain JavaScript, this can be achieved using a " (code "for") "
         loop..."])

    (code-block
       "var allPositive = true;
        for (var i = 0; i < list.length; i++) {
            if (list[i] <= 0) {
                allPositive = false;
                break;
            }
        }")

    (p
       ["... or a " (code "while") " loop (which is slightly more efficient)."])

    (code-block
       "var allPositive = true, i = list.length;
        while (i--) {
            if (list[i] <= 0) {
                allPositive = false;
                break;
            }
        }")

    (p
       [(strong ["Seriously, though, who is writing " (em "vanilla") "
         JavaScript in 2010?"]) " Everyone and their grandmothers are
         using JavaScript frameworks these days, and there are plenty
         of good ones out there. I recently made the switch to "
        (a "http://mootools.net/" "MooTools") " from "
        (a "http://prototypejs.org/" "Prototype") ", after deciding that
         while " (a "http://jquery.com/" "jQuery") " is fantastic, the "
        (a "http://jqueryvsmootools.com/#jsfun" "MooTools philosophy") "
         is more to my liking."])

    (p
       ["With MooTools, one might consider using the "
        (a "http://mootools.net/docs/core/Native/Array#Array:each"
           "Array object's each method") "
         instead of a " (code "for") " or " (code "while") " loop."])

    (code-block
       "var allPositive = true;
        list.each(function (item) {
            if (item <= 0) {
                allPositive = false;
            }
        });")

    (p
       ["While this gets the job done, it's suboptimal for two reasons: the
         positiveness of " (em "every") " item is evaluated, which will often
         not be necessary; and, well, " (strong "it ain't pretty") ". ;)"])

    (h3 ["Enter " (code "every")])

    (p
       ["As is so often the case in programming, if something seems fiddly and
         difficult there's probably a better tool for the job. In this case the "
        (a "http://mootools.net/docs/core/Native/Array#Array:every"
           "Array object's every method") " is the perfect tool for the job."])

    (code-block
       "var allPositive = list.every(function (item) {
            return item > 0;
        });")

    (p
       ["This is terser than is possible with vanilla JavaScript.
         It reads better too, in my opinion!"])

  ]

})
