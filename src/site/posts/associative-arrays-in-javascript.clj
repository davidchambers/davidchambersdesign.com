(import* ["../elements"]

(let [
  luxon               (require "../luxon")
] {

  :id 19

  :slug "associative-arrays-in-javascript"

  :title "Associative arrays in JavaScript"

  :datetime (luxon.datetime "2009-06-29" "19:14:00" :Pacific/Auckland)

  :tags [:best-practice :javascript]

  :body [

    (p
       [(strong "JavaScript does not have associative arrays.") "
         (This will be old news to many.)"])

    (p
       ["Confusion arises from the fact that array syntax in JavaScript is
         very similar to array syntax in PHP, a language that " (em "does") "
         have associative arrays. Additionally, " (strong "any object in
         JavaScript can be treated as an associative array") ". This means
         that if one creates a JavaScript " (code "Array") " object and
         proceeds to use PHP's associative array syntax in an attempt to
         add items to it, one " (em "will") " succeed in assigning it
         attribute–value pairs. The object in question need not be an "
        (code "Array") " for this to work, though, so for the sake of
         clarity using a vanilla " (code "Object") " is advisable."])

    (p
       ["To gain a more detailed understanding of why JavaScript "
        (em "appears") " to have associative arrays, read "
        (a "http://andrewdupont.net/2006/05/18/javascript-associative-arrays-considered-harmful/"
           "JavaScript \"Associative Arrays\" Considered Harmful") "."])

  ]

}))
