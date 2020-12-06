(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "Beautiful painted alphabet"

  :datetime (datetime "2008-08-22" "01:56:00" :Pacific/Auckland)

  :tags ["design" "typography" "video"]

  :body [

    (p
       ["I came across this recently while browsing "
        (a "http://markboulton.co.uk/" "Mark Boulton's site") ". The style
         and control of Job's hand is played off against the exuberance of his
         son's approach. An upbeat soundtrack accompanies the performance."])

    (dl
       [(dt (a "http://www.youtube.com/watch?v=ajjg3faIQ5A"
               "abcdefghijklmnopqrstuvwxyz"))
        (dd "Video by Job & Roel Wouters")])

    (p
       ["From the director:"])

    (blockquote
       (p
          ["Job and Gradus are both ambitious concerning letters.
            Spontaneous jam sessions in our studio inspired us to
            make this film about the fun [of] drawing letters."]))

  ]

})
