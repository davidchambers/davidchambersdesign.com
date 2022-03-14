(import* [:base "../elements" "../components"] {

  :id 10

  :title "Inserting images in Gmail messages"

  :datetime (datetime "2009-04-15" "20:27:00" :Pacific/Auckland)

  :tags [:gmail :html]

  :body [

    (p
       ["Hooray! It's now possible to "
        (a "http://gmailblog.blogspot.com/2009/04/new-in-labs-inserting-images.html"
           "insert images into Gmail messages") ". About time, I say."])

    (captioned-image
       "/images/posts/10/gmail-insert-image-icon.png"
       "Gmail insert image icon"
       "Gmail's insert image icon, visible in rich formatting mode")

  ]

})
