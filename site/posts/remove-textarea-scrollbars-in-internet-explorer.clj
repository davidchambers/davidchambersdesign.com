(import ["../elements"]

(let [
  luxon               (require "../luxon")
  code-block          (require "../components/code-block")
] {

  :id 59

  :slug "remove-textarea-scrollbars-in-internet-explorer"

  :title "Remove textarea scrollbars in Internet Explorer"

  :datetime (luxon/datetime "2010-07-18" "22:00:00" :Pacific/Auckland)

  :tags [:css]

  :body [

    (p
       ["I was delighted to discover this \"trick\" over on CSS-Tricks
         in a post titled " (a "http://css-tricks.com/textarea-tricks/"
        "Textarea Tricks") ". (See, Chris, I " (em "do") " like you!)"])

    (p
       ["Internet Explorer displays a (completely pointless) inactive
         scrollbar in empty " (code "textarea") " elements, unlike other
         browsers which wait until a scrollbar is actually " (em "required") "
         before displaying it."])

    (p
       ["As it turns out, there's a dead simple way to prevent this,
         and once again its everybody's friend " (code "overflow") "
         to the rescue."])

    (code-block :css

       "
       textarea { overflow: auto; }
       ")

    (p
       ["The " (code "overflow") " property seems to be a magical remedy
         for a variety of different ailments, most significant of which
         is the collapsing of an element whose children are all floated.
         Applying " (code "overflow: auto") " makes the element wrap its
         children rather than letting them \"hang\"."])

    (p
       ["One thing that I sometimes ponder, though, is why "
        (code "visible") " was selected as the default " (code "overflow") "
         value – it seems inferior to " (code "auto") " in most use cases."])

  ]

}))
