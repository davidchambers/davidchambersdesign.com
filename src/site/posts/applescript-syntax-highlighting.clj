(import* [:base "../elements" "../components"] {

  :id 15

  :title "AppleScript syntax highlighting"

  :datetime (datetime "2009-06-04" "03:12:00" :Pacific/Auckland)

  :tags [:applescript :javascript :mac-os-x :syntaxhighlighter]

  :body [

    (p
       [(a "#setup" "Skip to setup instructions")])

    (excerpt

       [(p
           ["I've been using Alex Gorbatchev's "
            (a "http://alexgorbatchev.com/wiki/SyntaxHighlighter"
               "SyntaxHighlighter") "
             to syntactically display code of various languages for several
             months now. When I decided to post an AppleScript snippet, however,
             I realised that I was out of luck. SyntaxHighlighter does not
             include an AppleScript \"brush\", and a quick flick through the "
            (a "http://alexgorbatchev.com/forums/" "SyntaxHighlighter forums") "
             did not bring me any joy."])

        (p
           [(strong "How hard could it be to write a brush for AppleScript?") ",
             I wondered. The handy guide to "
            (a "http://alexgorbatchev.com/wiki/SyntaxHighlighter:Brushes:Custom"
               "developing a custom brush") " got me started, and I was soon
             busy trying to encapsulate AppleScript's syntax -- along with its
             keywords and countless words and phrases with special meanings --
             into a handful of regular expressions."])])

    (p
       ["Having created the brush (that's SyntaxHighlighter lingo for
         the JavaScript file containing the language-specific regular
         expressions), I proceeded to create a style sheet that would
         display AppleScript snippets on the Web as they appear on OS X.
         You can judge my success by comparing the three snippets below:
         the first is a screenshot of Script Editor's rendering; the
         second is a screenshot of the same snippet as it appears in my
         browser; and the final snippet is text rendered by " (em "your") "
         browser."])

    (captioned-images

       [(captioned-image
           "/images/posts/15/script-editor-syntax-highlighting.png"
           ""
           "Screenshot of Script Editor's rendering of an AppleScript
            snippet")

        (captioned-image
           "/images/posts/15/syntaxhighlighter-applescript-theme.png"
           ""
           "Screenshot of snippet styled by AppleScript theme for
            SyntaxHighlighter")])

    (code-block :applescript

       "
       #!/usr/bin/osascript

       (*
           This handler determines whether someone is happy.
           It's actually just a good way to showcase AppleScript syntax highlighting using Alex Gorbatchev's SyntaxHighlighter.
           (* Hey, nested comments. Woot! *)
       *)

       on user_is_happy()
           -- determine which application is currently frontmost
           tell application \"System Events\" to set app_list to the name of application processes whose frontmost is true
           set front_app to the first item of app_list
           tell application \"Finder\"
               activate
               display dialog ¬
                   \"Enter your name\" default answer \"\" buttons {\"Cancel\", \"OK\"} ¬
                   default button 2 with icon note
               set user_name to the text returned of the result
               (* The word \"return\" in the line below should not be in bold. The regex does its best to determine whether the word is being used in a return statement or as a line return. *)
               display dialog \"Hello, \" & user_name & \"!\" & return & return & ¬
                   \"Are you happy?\" buttons {\"Yes\", \"No\"} with icon note
               set is_happy to the button returned of the result
           end tell
           -- activate the application that was frontmost initially
           tell application front_app to activate
           return is_happy = \"Yes\" -- this time the word \"return\" should be in bold
       end user_is_happy

       if user_is_happy() then
           say \"Woohoo!\" using \"Alex\"
       else
           repeat 3 times
               beep
               delay 0.5
           end repeat
       end if
       ")

    (caption
       ["Live rendering of AppleScript snippet"])

    (h3' {:id "setup"} "Setup")

    (p
       ["To add AppleScript syntax highlighting to your own site or blog,
         do the following:"])

    (ol
       [(li
           [(p
               ["Download "
                (a "http://alexgorbatchev.com/wiki/SyntaxHighlighter"
                   "SyntaxHighlighter") ", and follow the setup instructions."])])
        (li
           [(p
               ["Download "
                (a "https://bitbucket.org/davidchambers/applescript-theme/raw/default/shBrushAppleScript.js"
                   "AppleScript brush") ",
                 and upload it to your SyntaxHighlighter " (strong "scripts") "
                 directory."])])
        (li
           [(p
               ["Download "
                (a "https://bitbucket.org/davidchambers/applescript-theme/raw/default/shThemeAppleScript.css"
                   "AppleScript theme") ",
                 and upload it to your SyntaxHighlighter " (strong "styles") "
                 directory."])])
        (li
           [(p
               ["Include the brush like so:"])
            (code-block :html
               "
               <script src=\"/path/to/scripts/shCore.js\"></script>
               <script src=\"/path/to/scripts/shBrushAppleScript.js\"></script>
               <script>SyntaxHighlighter.all()</script>
               ")])])

    (h3' {:id "usage"} "Usage")

    (p
       ["To have SyntaxHighlighter parse a block of AppleScript,
         wrap the code in " (code "pre") " tags like so:"])

    (code-block :html

       "
       <pre class=\"brush: applescript; class-name: applescript;\"></pre>
       ")

    (p
       [(code "brush: applescript;") " tells SyntaxHighlighter to
         use the AppleScript brush for the text within the pre tag. "
        (code "class-name: applescript;") " tells SyntaxHighlighter
         to add the class name \"applescript\" to the container div
         that is inserted into the page. (Hopefully I'm able to
         convince Alex that the brush name should be added as a
         class name automatically, which would remove the need to
         include " (code "class-name: applescript;") " each time.)"])

    (update (datetime "2012-02-22" "23:11:00" :America/Los_Angeles)

       [(p
           ["Providing a " (code "class-name") " in the, ahem, class name is
             no longer necessary (apparently I made a convincing argument).
             This is now sufficient:"])

        (code-block :html

           "
           <pre class=\"brush:applescript\"></pre>
           ")])

    (p
       ["Note that including " (code "ruler: true;") " will have no effect.
         Since AppleScript is displayed in a variable-width font, the ruler
         serves no purpose. The ruler is still inserted into the page
         (unless " (code "ruler: false;") " is included), but is hidden
         by the style sheet."])

  ]

})
