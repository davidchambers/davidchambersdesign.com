(import ["../elements"]

(let [
  captioned-image     (require "../components/captioned-image")
  datetime            (require "../datetime")
] {

  :id 58

  :slug "-webkit-box-sizing"

  :title "-webkit-box-sizing"

  :datetime (datetime "2010-07-18" "21:30:00" :Pacific/Auckland)

  :tags [:css :webkit]

  :body [

    (p
       ["This site's search field has been virtually unusable in Chrome
         and Safari on Windows for several months. Fixing it was not high
         on my priority list, but I finally got to it this evening."])

    (captioned-image
       "/images/posts/58/-webkit-box-sizing=border-box.png"
       "-webkit-box-sizing: border-box"
       "Before")

    (p
       ["I did my best to get these browsers to respect the padding values
         that I'd assigned in my style sheet, getting aggressive in the Web
         Inspector. No joy."])

    (p
       ["I then noticed a curious property, " (code "-webkit-box-sizing") ".
         Sure enough, this was the culprit. Safari and Chrome both use "
        (code "border-box") " as the default value, which means that padding
         does not add to an element's dimensions the way it does in the
         standard box model."])

    (p
       ["Specifying " (code "content-box") " fixed the problem."])

    (captioned-image
       "/images/posts/58/-webkit-box-sizing=content-box.png"
       "-webkit-box-sizing: content-box"
       "After")

    (p
       ["This is an extremely satisfying solution as it neatly targets
         the source of the problem."])

    (p
       ["The question remains as to why these browsers default to "
        (code "border-box") " as the " (code "box-sizing") " for "
        (code "input") " elements with " (code "type=\"search\"") ".
         I don't know whether default styles are specified at the
         rendering engine level or at the browser level, but either
         way I would say that it's the result of Apple fiddling with
         the controls to make search inputs look sexy on Mac OS X
         (where they're rendered very differently)."])

  ]

}))