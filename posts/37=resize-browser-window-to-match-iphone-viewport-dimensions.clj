(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "Resize browser window to match iPhone viewport dimensions"

  :datetime (datetime "2010-02-16" "03:20:00" :Pacific/Auckland)

  :tags [:bookmarklets :iphone :javascript]

  :body [

    (excerpt

       [(p
           ["I've recently become interested in optimizing sites for
             the iPhone and iPod touch. While nothing beats testing on
             the device itself, I often find it quicker to test changes
             on my Mac. Changing the user agent string is a piece of cake
             in Safari (Develop > User Agent > Mobile Safari) but what
             about adjusting the browser window's dimensions to match
             those of the iPhone?"])

        (p
           ["I've created two bookmarklets to allow the current page to
             be loaded in an iPhone-sized window with a single click:"])

        (ul
           [(li
               [(p
                   [(strong "Portrait") " (labelled \"⁑\")"])
                (code-block :plain-text
                   "javascript:open(location,'iPhone:portrait','innerWidth='+(320+15)+',innerHeight='+(480+15)+',scrollbars=yes');")])
            (li
               [(p
                   [(strong "Landscape") " (labelled \"**\")"])
                (code-block :plain-text
                   "javascript:open(location,'iPhone:landscape','innerWidth='+(480+15)+',innerHeight='+(320+15)+',scrollbars=yes');")])])

        (captioned-image
           "/images/posts/37/iphone-testing-bookmarklets.png"
           "iPhone testing bookmarklets"
           "iPhone testing bookmarklets: portrait and landscape")])

    (captioned-images

       [(captioned-image
           "/images/posts/windows/safari-window-iphone-dimensions-portrait.png"
           "Safari window resized to iPhone portrait dimensions"
           "320x480: iPhone portrait dimensions")

        (captioned-image
           "/images/posts/windows/safari-window-iphone-dimensions-landscape.png"
           "Safari window resized to iPhone landscape dimensions"
           "480x320: iPhone landscape dimensions")])

    (p
       ["It appears that I need to rework this site's style sheet
         to better present content in these smaller viewports!"])

  ]

})
