(import ["../elements"]

(let [
  captioned-image     (require "../components/captioned-image")
  datetime            (require "../datetime")
] {

  :id 63

  :slug "gmail-favicon-confusion"

  :title "Gmail's favicon confusion"

  :datetime (datetime "2010-07-21" "10:56:00" :Pacific/Auckland)

  :tags [:design :gmail]

  :body [

    (p
       ["Gmail currently serves up two possible favicons, a 16x16 "
        (code "shortcut icon") " and a 32x32 " (code "icon") ".
         I've no idea why the latter is included, but my browser
         is happy to accept either version, which can lead to a
         rather amusing situation."])

    (captioned-image
       "/images/posts/63/gmail-icons.png"
       "Browser tabs featuring different Gmail icons"
       "Scaled down 32x32 icon (left) and regular favicon")

    (p
       ["Most days when Gmail loads I get the favicon, but I've had a couple
         of extended periods of seeing the other version instead. I'd even
         wondered whether Google was undertaking some A/B testing, although
         this seemed rather far-fetched. I now believe that there's a race
         condition, and that the smaller image usually wins this race."])

    (p
       ["I far prefer the 32x32 version (it makes the favicon look anaemic),
         but when I had a close look at it I was upset by its sloppiness."])

    (captioned-image
       "/images/posts/63/gmail-icon-32*10.png"
       "32x32 Gmail icon at 1000%"
       "32x32 Gmail icon at 1000%")

    (p
       [(a "http://blog.cocoia.com/" "Sebastiaan de With") "
         would not stand for this!"])

  ]

}))
