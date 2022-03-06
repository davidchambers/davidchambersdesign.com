(import* [:base "../elements" "../components"] {

  :title "wmd ftw!"

  :datetime (datetime "2010-06-13" "11:25:00" :Pacific/Auckland)

  :tags [:javascript :markdown :ux :wmd]

  :body [

    (p
       ["Comment forms that don't provide previews -- or at least an
         indication of how comments are processed -- really annoy me.
         If I decide to leave a comment I take care to avoid spelling
         mistakes and grammatical errors. It's quite upsetting, then,
         to see my code snippet completely mangled and my carefully
         typed links displayed in plain text (<a href=\"...)."])

    (p
       ["Despite my appreciation of the preview, not one of my sites
         provided this service until a few hours ago. Now that I've
         migrated from WordPress to " (a "http://mango.io/" "Mango") "
         I'm able to spend some time working on front-end code. My first
         two challenges were localizing dates and times, and integrating "
        (a "http://wmd-editor.com/" "wmd") "."])

    (p
       ["Getting wmd working turned out to be extremely easy, but I was
         not content with a live preview of the " (em "comment") " only.
         No, I wanted the preview to resemble as closely as possible
         the published result, which meant updating the preview area in
         response to changes to \"name\", \"e-mail\", and \"website\"
         as well as to changes to the comment itself."])

    (video {:src "/images/posts/53/wmd.mp4" :controls "controls"}

       [(p
           ["Get with the programme; this video's in an HTML5 "
            (code "video") " tag!"])

        (p
           ["It should be possible to access "
            (a "/images/posts/53/wmd.mp4" "wmd.mp4") " directly."])])

    (p
       ["This was a great deal of fun to implement!"])

  ]

})
