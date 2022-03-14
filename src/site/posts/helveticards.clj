(import* [:base "../elements" "../components"] {

  :id 92

  :title "Helveticards"

  :datetime (datetime "2011-11-20" "22:00:00" :America/Los_Angeles)

  :tags [:design :typography]

  :body [

    (uncaptioned-image "/images/posts/92/helveticards.jpg" "Helveticards")

    (blockquote

       [(p
           [(a "http://helveticards.uberdm.com/" "Helveticards") " are a
             set of über minimalist typographic playing cards by designer "
            (a "https://twitter.com/uberryan" "Ryan Myers") "."])])

    (p
       ["I love these! I designed a set of playing cards several years
         ago while at university, but I certainly didn't think of doing "
        (em "this") "."])

    (p
       ["Via "
        (a "http://laughingsquid.com/helveticards-minimalist-typographic-playing-cards/"
           "Laughing Squid") "."])

  ]

})
