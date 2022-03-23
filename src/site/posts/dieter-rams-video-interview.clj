(import* ["../elements"]

(let [
  datetime            (require "../datetime")
] {

  :id 62

  :title "Dieter Rams video interview"

  :datetime (datetime "2010-07-20" "19:30:00" :Pacific/Auckland)

  :tags [:design :video]

  :body [

    (p
       [(a "http://www.youtube.com/watch?v=A6-wA-7QIeE"
           "Dieter Rams – Gestalten")])

    (blockquote
       [(p
           ["The media have to learn [...] that the spectacular things are not
             the important things – the unspectacular things are the important
             things, especially in the future."])])

    (p
       ["via " (a "http://kottke.org/" "kottke")])

  ]

}))
