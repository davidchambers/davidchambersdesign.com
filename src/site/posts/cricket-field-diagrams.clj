(import* ["../elements"]

(let [
  captioned-images    (require "../components/captioned-images")
  datetime            (require "../datetime")
] {

  :id 40

  :slug "cricket-field-diagrams"

  :title "Cricket field diagrams"

  :datetime (datetime "2010-03-15" "00:58:00" :Pacific/Auckland)

  :tags [:design :icons]

  :article-id "cricket-field-diagrams"

  :body [

    (p
       ["While creating documentation for " (i "Dice Cricket") ",
         a game a friend and I designed many years ago, I produced
         a set of diagrams which represent the segments of a cricket
         field. The isolated nature of this small design challenge
         provided a refreshing break from the various and interrelated
         considerations involved in designing for the Web."])

    (captioned-images
       (lambda [captioned-image]

          [(captioned-image
              "/images/posts/40/mid-wicket.png"
              "Cricket field with mid-wicket area highlighted"
              "Mid-wicket")

           (captioned-image
              "/images/posts/40/down-the-ground.png"
              "Cricket field with covers highlighted"
              "Down the ground")

           (captioned-image
              "/images/posts/40/covers.png"
              "Cricket field with covers highlighted"
              "Covers")

           (captioned-image
              "/images/posts/40/behind-point.png"
              "Cricket field with area behind point highlighted"
              "Behind point")

           (captioned-image
              "/images/posts/40/behind-the-wicket.png"
              "Cricket field with area behind the wicket highlighted"
              "Behind the wicket")

            (captioned-image
               "/images/posts/40/behind-square.png"
               "Cricket field with area backward of square highlighted"
               "Behind square")]))

    (p
       ["You're free to make use of these images (they're transparent PNGs).
         Attribution is appreciated but not required. :)"])

  ]

}))
