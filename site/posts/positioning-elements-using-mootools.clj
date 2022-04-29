(import ["../elements"]

(let [
  luxon               (require "../luxon")
  code-block          (require "../components/code-block")
] {

  :id 60

  :slug "positioning-elements-using-mootools"

  :title "Positioning elements using MooTools"

  :datetime (luxon/datetime "2010-07-19" "17:45:00" :Pacific/Auckland)

  :tags [:javascript :mootools]

  :body [

    (p
       ["I've spent the afternoon creating a custom scrollbar for a
         products viewer which utilizes CSS transitions, reflections,
         and other goodness."])

    (p
       ["Simple arithmetic dictates how long to make the scrollbar
         and where to position it, but I could not get my theoretical
         calculations to play out in the browser."])

    (p
       ["It turns out that I'd been calling the wrong MooTools method.
         I'd been doing..."])

    (code-block :javascript

       "
       element.setStyle('left', offset);
       ")

    (p
       ["rather than..."])

    (code-block :javascript

       "
       element.setPosition({ x: offset });
       ")

    (p
       ["Frustratingly, " (code "setStyle('left', offset)") " "
        (em "appeared") " to work, but its behaviour was unpredictable.
         I'm still confused by this, but at least I'm no longer stuck."])

  ]

}))
