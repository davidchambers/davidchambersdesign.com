(import* ["../../lang/modules/base" "../../lang/modules/prelude" "../../lang/modules/sanctuary" "../elements" "../components"] {

  :title "Prototype and script.aculo.us, combined and compressed"

  :datetime (datetime "2009-11-09" "23:14:00" :Pacific/Auckland)

  :tags [:javascript :optimization :prototype :script.aculo.us]

  :body [

    (p
       [(strong "Nothing new here.") " I've combined "
        (a "http://prototypejs.org/2009/9/1/prototype-1-6-1-released"
           "Prototype 1.6.1") " and the various files that make up "
        (a "http://script.aculo.us/downloads" "script.aculo.us 1.8.3") "
         (except unittest.js) into one file, which I've minified using the "
        (a "http://developer.yahoo.com/yui/compressor/" "YUI Compressor") ".
         Further compression has been achieved by gzipping the minified file.
         All three versions are available for download:"])

    (ul
       (map (lambda [ext]
               (let [filename (++ ["prototype+scriptaculous" ext])
                     href (++ ["http://static.davidchambersdesign.com/scripts/" filename "?p=1.6.1&s=1.8.3"])]
                  (li [(a href filename)])))
            [".js" ".min.js" ".min.js.gz"]))

    (p
       ["I suggest including the Prototype and script.aculo.us version
         numbers in the " (code "src") ":"])

    (code-block :html

       """
       <script src="/scripts/prototype+scriptaculous.min.js?p=1.6.1&amp;s=1.8.3"></script>
       """)

    (p
       ["This prevents caching issues that might otherwise arise
         upon updating to a newer version of prototype+scriptaculous
         (I'll update the three files -- and this post -- each time
         a new version of Prototype is released)."])

  ]

})
