(import* ["../elements" "../components"]

(let [datetime (require "../datetime")] {

  :id 44

  :title "Fascinating insight into the mind of a Windows user"

  :datetime (datetime "2010-03-25" "15:06:00" :Pacific/Auckland)

  :tags [:mac-os-x :windows]

  :body [

    (decorative-image "/images/posts/decorative/right/no-apple.png")

    (p
       ["The following conversation took place a couple of days ago in
         my apartment. Matt's my flatmate, Doug's one of Matt's friends.
         I was in the room at the time."])

    (interview-list "Matt" "Doug"

       ["So, Doug, do you think you could go the way of Mac?"

        "I already have, really, but I'd never buy one."

        "Why's that?"

        "Well -- no offense, David -- if I were to buy one I'd be getting
         something a retard could use, and I'm not a retard."])

    (p
       ["I found this exchange both entertaining and enlightening. Never had
         I considered the possibility that certain individuals use Windows "
        (em "because") " it's poorly designed and difficult to use!"])

    (p
       ["There's certainly some sound reasoning behind Doug's stance: Doug
         is proficient in Windows; gaining proficiency in Windows requires
         a certain level of intelligence; Doug's proficiency in Windows is
         therefore indicative of his intelligence."])

    (p
       ["Why, then, does Doug say that he's switched camps? He's using one
         of these at school:"])

    (captioned-image
       "/images/posts/44/27-inch-imac.jpg"
       "27-inch iMac"
       "27-inch iMac")

    (p
       ["Talk about having one's cake and eating it, too."])

  ]

}))
