(import ["../elements"]

(let [
  luxon               (require "../luxon")
  code-block          (require "../components/code-block")
] {

  :id 35

  :slug "duplicating-arrays-in-javascript"

  :title "Duplicating arrays in JavaScript"

  :datetime (luxon/datetime "2010-01-09" "19:26:00" :Pacific/Auckland)

  :tags [:javascript]

  :body [

    (p
       ["Many of those who write JavaScript do not come from programming
         backgrounds (while I've written plenty of PHP, Python, and
         JavaScript, I don't have much experience with \"real\" programming
         languages" (a "#footnote" "*") "). As a result, a significant
         portion of JavaScript coders do not think of variables as pointers
         to memory addresses. This leads to confusion in cases such as this:"])

    (code-block :javascript

       "
       var fruits = ['orange', 'lime'];
       var colours = fruits; // naïve attempt to duplicate array
       colours.push('yellow');
       ")

    (p
       ["One might be surprised to learn that " (code "fruits") " now contains
         not just \"orange\" and \"lime\" but also \"yellow\". Oops! Here's how
         it went wrong:"])

    (code-block :javascript

       "
       var fruits = ['orange', 'lime'];
       // fruits points to array containing \"orange\" and \"lime\"

       var colours = fruits;
       // colours now points to that same array!
       ")

    (p
       ["How, then, does one create a copy of the original array? "
        (em "Slice!")])

    (code-block :javascript

       "
       var colours = fruits.slice();
       ")

    (aside' {:id "footnote"}
       ["* Languages such as C.
         Like " (a "http://www.quirksmode.org/about/" "ppk") ",
         I take care to include quotation marks. ;)"])

  ]

}))
