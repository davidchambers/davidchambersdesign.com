(import* ["../elements"]

(let [
  code-block          (require "../components/code-block")
  datetime            (require "../datetime")
] {

  :id 27

  :title "Sticky footers"

  :datetime (datetime "2009-09-20" "01:08:00" :Pacific/Auckland)

  :tags [:css :html]

  :body [

    (excerpt

       [(p
           [(strong "Sticky footers should be ubiquitous. They are not.")])

        (p
           ["This leads me to believe that many developers are unaware
             of how to prevent footers from floating up on pages without
             much content."])])

    (p
       ["I'll explain how it's done. The markup must look something like
         the following:"])

    (code-block :html

       "
       <body>
           <div id=\"wrap\">
               <div id=\"main\">
               </div>
           </div>
           <div id=\"footer\">
           </div>
       </body>
       ")

    (p
       ["The required CSS is also straightforward. First, set the heights
         of the html and body elements to the height of the viewport:"])

    (code-block :css

       "
       html    { height: 100%; }
       body    { height: 100%; }
       ")

    (p
       ["This makes it possible to set the " (em "minimum") " height of
         the wrapper div to the height of the viewport:"])

    (code-block :css

       "
       #wrap   { min-height: 100%; }
       ")

    (p
       ["Next, pull up the footer so that it's visible without scrolling
         on pages without a lot of content:"])

    (code-block :css

       "
       #footer { margin-top: -5em; height: 5em; }
       ")

    (p
       ["Finally, apply bottom padding to the main content div to ensure
         that nothing is covered by the footer:"])

    (code-block :css

       "
       #main   { padding-bottom: 5em; }
       ")

    (p
       ["Putting it all together gives the following:"])

    (code-block :css

       "
       html    { height: 100%; }
       body    { height: 100%; }
       #wrap   { min-height: 100%; }
       #main   { padding-bottom: 5em; }
       #footer { margin-top: -5em; height: 5em; }
       ")

    (p
       ["This CSS works in all modern browsers. If you need to support
         antiquated browsers, you should have a look at the hacks suggested
         at " (a "http://www.cssstickyfooter.com/" "CSS Sticky Footer") "."])

    (p
       [(strong
           ["Check out the "
            (a "/examples/sticky-footers/" "sticky footer demo") "
             to see all this theory in action."])])

  ]

}))
