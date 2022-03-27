(import* ["../elements"]

(let [
  luxon               (require "../luxon")
  uncaptioned-image   (require "../components/uncaptioned-image")
] {

  :id 71

  :slug "bike-shelf"

  :title "Bike shelf"

  :datetime (luxon/datetime "2010-09-20" "19:53:00" :Pacific/Auckland)

  :tags [:design]

  :body [

    (p
       ["Simple design executed beatifully."])

    (uncaptioned-image
       "http://knifeandsaw.files.wordpress.com/2010/09/photo_bikerack_cu_bars.jpg"
       "Bike shelf")

    (p
       ["The article from which this photograph is lifted, entitled "
        (a "http://knifeandsaw.wordpress.com/furniture/bike-shelf/"
           "Bike Shelf") ", is over on "
        (a "http://knifeandsaw.wordpress.com/" "Knife & Saw") "."])

  ]

}))
