(import* [:base "../elements" "../components"] {

  :id 18

  :title "Prototype loader for SyntaxHighlighter"

  :datetime (datetime "2009-06-22" "01:04:00" :Pacific/Auckland)

  :tags [:javascript :optimization :prototype :syntaxhighlighter]

  :body [

    (p
       ["Skip to " (a "#setup" "setup") " or " (a "#usage" "usage")])

    (excerpt

       [(p
           [(a "http://alexgorbatchev.com/wiki/SyntaxHighlighter"
               "SyntaxHighlighter") " is a fully functional self-contained
             code syntax highlighter developed in JavaScript (as stated on
             its wiki). One of its deficiencies is that it retrieves all
             its brushes each time a page is loaded, despite the fact that
             in many cases only one or two (or none) are required."])

        (p
           ["Currently, " (a "http://prototypejs.org/" "Prototype") " is
             my JavaScript framework of choice (although I'm really looking
             forward to trying " (a "http://jquery.com/" "jQuery") ").
             I have used Prototype to create a " (strong "brush loader for
             SyntaxHighlighter") ", which retrieves brushes on demand to
             reduce page loading times (in certain circumstances)."])])

    (update (datetime "2009-06-27" "06:21:00" :Pacific/Auckland)

       [(p
           ["I have completely rewritten the code so that it no longer
             requires empty functions inside the brush files to act as
             indicators of readiness. Instead, the required brushes are
             retrieved in a daisy chain. This is both more elegant and
             more reliable. Additionally, style sheets are now also
             retrieved on demand."])])

    (h3' {:id "setup"} "Setup")

    (p
       [(strong "Requires Prototype!")])

    (p
       ["If you are not already using Prototype on your site,
         I recommend using SyntaxHighlighter in the conventional
         manner, since there is significant overhead associated
         with loading " (code "prototype.js") "."])

    (p
       ["If you " (em "are") " using Prototype, follow these steps
         to have brushes retrieved dynamically:"])

    (ol
       [(li
           [(p
               ["Download " (a "/downloads/loader.js" "loader.js") " or the "
                (a "/downloads/loader.min.js.gz" "minified and gzipped version") "
                 and upload it to your SyntaxHighlighter " (strong "scripts") "
                 directory."])])
        (li
           [(p
               ["Replace:"])
            (code-block :html
               "
               <script src=\"/path/to/scripts/shCore.js\"></script>
               <script src=\"/path/to/scripts/shBrushAS3.js\"></script>
               <script src=\"/path/to/scripts/shBrushBash.js\"></script>
               .
               .
               .
               <script src=\"/path/to/scripts/shBrushVb.js\"></script>
               <script src=\"/path/to/scripts/shBrushXml.js\"></script>

               <script>SyntaxHighlighter.all()</script>
               ")
            (p
               ["with:"])
            (code-block :html
               "
               <script>
                   function Brush(name, filename, aliases)
                   {
                       this.name = name;
                       this.filename = filename;
                       this.aliases = aliases;
                   }
                   var settings = {
                       selector: 'head',
                       path: 'http://example.com/sh/',
                       stylesheets: ['shThemeDefault'],
                       brushes: [],
                       extensions: { stylesheet: 'css', brush: 'js' },
                       defaults: {}
                   };
               </script>
               <script src=\"/path/to/scripts/loader.js\"></script>
               ")])
        (li
           [(p
               ["Replace both instances of " (code "http://example.com/sh/") "
                 in the above snippet with the path to your "
                (strong "SyntaxHighlighter") " directory."])])])

    (h3' {:id "usage"} "Usage")

    (p
       ["The " (code "settings") " object provides flexibility by allowing
         various things to be modified or included."])

    (p
       [(strong "Selector.") " By default, " (code "settings.selector") "
         is set to 'head', which means that script elements will be inserted
         into the head element. This can be replaced with any CSS selector to
         have script elements inserted into a different element."])

    (p
       [(strong "Style sheets.") " By default, " (code "settings.stylesheets") "
         is an array containing just the default style sheet. This can easily be
         modified:"])

    (code-block :javascript

       "
       stylesheets: ['shThemeCoda', 'shThemeAppleScript'],
       ")

    (p
       [(strong "Brushes.") " By default, " (code "settings.brushes") "
         is an empty array. All the bundled brushes are handled automatically,
         but additional brushes can be included by adding them to this array:"])

    (code-block :javascript

       "
       brushes: [
           new Brush('AppleScript', 'shBrushAppleScript', ['applescript'])
       ],
       ")

    (p
       ["When creating a " (code "Brush") " object, provide the constructor
         with the brush's name, its file name (sans extension), and an array
         of aliases."])

    (p
       [(strong "Extensions.") " By default, " (code "settings.extensions") "
         has 'css' set against " (code "stylesheet") " and 'js' set against "
        (code "brush") ". It is useful to be able to change these values if,
         for example, gzipped versions of the brushes are to be used."])

    (p
       [(strong "Defaults.") " SyntaxHighlighter defaults can be set by
         modifying " (code "settings.defaults") ":"])

    (code-block :javascript

       "
       defaults: {
           'auto-links': false,
           'html-script': true
       }
       ")

    (p
       ["Many thanks to Dan Breslau for letting me know about "
        (code "SyntaxHighlighter.highlight()") " and for his thorough
         testing of each of the early iterations of this code. Dan's "
        (a "http://www.outofwhatbox.com/blog/2009/06/syntaxhighlighter-revised-again-works-on-its-own-once-again/"
           "SyntaxHighlighter improvements") " are well worth a look!"])

    (update (datetime "2009-06-27" "06:21:00" :Pacific/Auckland)

       [(p
           ["Thanks also to Bob Matsuoka for sharing his "
            (a "http://ajaxian.com/archives/a-technique-for-lazy-script-loading"
               "technique for lazy script loading") " which provides
             workarounds for browsers that do not support the onload
             event when applied to script elements."])])

    (update (datetime "2009-08-16" "01:24:00" :Pacific/Auckland)

       [(p
           ["I've updated the script to ensure that the XML brush is always
             loaded when at least one of the following conditions is true:"])

        (ol
           [(li
               [(code "settings.defaults['html-script']") " is set to "
                (code "true")])
            (li
               ["a pre element to be highlighted has "
                (code "html-script: true") " in its class name"])])])

  ]

})
