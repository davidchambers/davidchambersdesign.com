(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "Captions over images"

  :datetime (datetime "2009-08-31" "03:36:00" :Pacific/Auckland)

  :tags [:best-practice :css :html :javascript :jquery :meaningful-markup]

  :body [

    (excerpt

       [(p
           ["This is my response to Chris Coyier's screencast titled "
            (a "http://css-tricks.com/video-screencasts/67-jquery-part-3-image-title-plugin/"
               "jQuery Part 3 – Image Title Plugin") " which I watched
             a couple of days ago. Something didn't sit right with me
             at the time, and I've now worked out what it was: "
            (strong "JavaScript is not required!")])

        (p
           ["I'll present a JavaScript-free approach for displaying captions
             over images that uses " (em "truly") " meaningful markup."])])

    (p
       ["So what " (em "is") " meaningful markup for images and image captions?
         This is a debated issue, but I believe the definition list to be the
         most appropriate element at our disposal. While an image is clearly
         not a \"term\", a caption does " (em "describe") " an image, just as
         a definition " (em "describes") " a term. Meaningful markup for an
         image and its caption should look something like the following:"])

    (code-block :html

       """
       <dl>
           <dt><img src="images/paris.jpg" alt="View from Notre Dame de Paris" /></dt>
           <dd>View from Notre Dame de Paris</dd>
       </dl>
       """)

    (p
       ["Ideally, images appearing one after the other should belong to the
         same definition list."])

    (p
       ["My aim was to achieve a result similar to Chris's "
        (a "http://css-tricks.com/examples/TypeOverImagePlugin/"
           "image title plugin demo") "
         simply by styling a definition list containing images and their
         captions. In the end, I was forced to abandon the ideal of using a
         single definition list for multiple images and captions: the nature
         of CSS positioning dictates that each image–caption pair reside in
         its own element. The final markup, however, is still quite clean:"])

    (code-block :html

       """
       <dl class="captioned-image">
           <dt><img src="images/paris.jpg" alt="View from Notre Dame de Paris" /></dt>
           <dd><span>View from Notre Dame de Paris</span></dd>
       </dl>
       """)

    (p
       ["Additional markup required:"])

    (ul
       [(li
           ["Each definition list must have a class name of "
            (strong "captioned-image") " applied"])
        (li
           ["Each caption must be wrapped in a span element (captions to
             appear on multiple lines require multiple span elements)"])])

    (p
       ["Check out the "
        (a "/examples/captions-over-images/" "captions over images demo") "
         to see the approach in action. The CSS responsible for the
         appearance of the captions is as follows:"])

    (code-block :css

       """
       dl.captioned-image         { position: relative; margin: 1em 0; }
       dl.captioned-image dt img  { display: block; }
       dl.captioned-image dd      { position: absolute; left: 0; bottom: 1.25em;
                                    font: bold 2em/1.25em Helvetica, sans-serif; }
       dl.captioned-image.top dd  { top: 1.25em; }
       dl.captioned-image dd span { display: block; float: left; clear: both;
                                    background: #000; background: rgba(0, 0, 0, 0.7);
                                    padding: 0.25em 0.5em; color: #fff; }
       """)

    (p
       ["I set out to display captions over images without the use
         of JavaScript while keeping meaningless markup to a minimum. "
        (strong "Have I succeeded, do you think?")])

  ]

})
