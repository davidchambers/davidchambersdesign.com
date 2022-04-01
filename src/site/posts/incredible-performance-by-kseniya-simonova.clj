(import* ["../elements"]

(let [
  luxon               (require "../luxon")
] {

  :id 21

  :slug "incredible-performance-by-kseniya-simonova"

  :title "Incredible performance by Kseniya Simonova"

  :datetime (luxon.datetime "2009-08-10" "10:29:00" :Pacific/Auckland)

  :tags [:art :performance :video]

  :body [

    (p
       ["In this performance from " (i "Ukraine's Got Talent") ",
         Kseniya Simonova uses the simplest of tools (a lightbox,
         sand, and her own body) to create a captivating animation.
         I really enjoyed the accompanying \"Nothing Else Matters\"
         instrumental, as well."])

    (p
       [(a "http://www.youtube.com/watch?v=518XP8prwZo"
           "Kseniya Simonova on Ukraine's Got Talent")])

  ]

}))
