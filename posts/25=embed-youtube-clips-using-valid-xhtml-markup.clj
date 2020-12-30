(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "Embed YouTube clips using valid XHTML markup"

  :datetime (datetime "2009-09-14" "14:17:00" :Pacific/Auckland)

  :tags [:css :html :video]

  :body [

    (p
       ["There are blog posts all over the Web explaining how to
         write valid XHTML markup to embed YouTube videos. There
         are also a number of online converters that generate this
         markup automatically."])

    (p
       ["I've always found it easier to write the markup myself, as
         there's really nothing to it. Simply replace both instances
         of " (code "video_id") " in the following code with -- you
         guessed it -- the video's ID."])

    (code-block :html

       """
       <object class="youtube"
               type="application/x-shockwave-flash"
               data="http://www.youtube.com/v/video_id&hl=en&fs=1&rel=0">
           <param name="movie" value="http://www.youtube.com/v/video_id&hl=en&fs=1&rel=0" />
           <param name="allowFullScreen" value="true" />
       </object>
       """)

    (p
       [(code "rel=0") " is often useful to include (as I've done
         in the example above) as it prevents thumbnails for related
         videos from being displayed at the end of the clip."])

    (p
       ["One important point to remember when you're \"rolling your own\"
         markup is that the character entity " (code "&amp;") " must be
         used for all ampersands."])

    (p
       ["Finally, be aware of the fact that it's possible to change the size
         of the YouTube object using CSS. There's no need to include the "
        (code "width") " and " (code "height") " attributes in the markup."])

    (code-block :css

       """
       object.youtube
       {
           width: 100%;
           height: 385px;
       }
       """)

  ]

})
