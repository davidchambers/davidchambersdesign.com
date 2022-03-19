(import* [:base "../elements" "../components"] {

  :id 22

  :title "Coda theme for SyntaxHighlighter"

  :datetime (datetime "2009-08-16" "08:53:00" :Pacific/Auckland)

  :tags [:coda :css :javascript :prototype :syntaxhighlighter]

  :body [

    (p
       [(a "#setup" "Skip to setup instructions")])

    (excerpt

       [(p
           ["It's no secret – I love " (a "http://www.panic.com/coda/" "Coda") "!
             It's a pleasure to use. " (strong "It looks so damn good.") " When I
             started using " (a "http://alexgorbatchev.com/wiki/SyntaxHighlighter"
             "SyntaxHighlighter") " I set out to create a Coda theme. Thankfully,
             the good folks at Panic had done the ground work for me. All I had
             to do was create a style sheet that would make my code snippets look
             as sexy online as they do in my text editor."])

        (p
           ["Or so I thought."])])

    (p
       ["As I delved deeper, it became apparent that realising my goal would
         require plenty of effort. In order for SyntaxHighlighter to work its
         magic it requires at least one brush and at least one theme. A brush
         is a JavaScript file that contains regular expressions to match the
         syntactical features of a particular language. A theme, as you might
         expect, is a CSS file which controls the way SyntaxHighlighter's
         output is displayed. At first glance, brushes and themes appear to
         be loosely coupled, allowing programmers to create language-specific
         brushes, and designers to create themes that can work with any number
         of brushes."])

    (p
       ["It soon became apparent that brushes and themes are not so loosely
         coupled after all. For example, the bundled HTML brush does not
         include the angled brackets when highlighting a tag. Coda does. "
        (strong "So, the theme itself is accompanied by a number of customized
         brushes.")])

    (h3 "Supported languages")

    (p
       ["The theme currently supports a handful of languages: CSS, HTML/XML,
         JavaScript, PHP, and Python. These are the languages with which I'm
         familiar. " (strong "If you'd like to see another language supported,
         please let me know.")])

    (h4 "CSS")

    (code-block :css

       "
       p.error.message   { border: 1px solid #c00; background-color: #fcc; }
       p.info.message    { border: 1px solid #fc3; background-color: #ffc; }
       p.success.message { border: 1px solid #0b0; background-color: #cfc; }
       ")

    (h4 "HTML")

    (code-block :html

       "
       <form id=\"searchform\" action=\"http://davidchambersdesign.com/\" method=\"get\">
           <div>
               <label for=\"s\" class=\"structural\">search davidchambersdesign.com</label>
               <input type=\"text\" id=\"s\" name=\"s\" value=\"\" class=\"text\" />
               <input type=\"submit\" id=\"searchsubmit\" value=\"Search\" />
           </div>
       </form><!--/searchform-->
       ")

    (h4 "JavaScript")

    (code-block :javascript

       "
       // simulate textarea:focus
       document.observe('dom:loaded', function () {
           $$('textarea').each(function (e) {
               Event.observe(e, 'focus', function (event) {
                   $(e.parentNode).addClassName('focus')
               });
               Event.observe(e, 'blur', function (event) {
                   $(e.parentNode).removeClassName('focus')
               });
           });
       });
       ")

    (h4 "PHP")

    (code-block :php

       "
       /**
        * echoes nicely formatted filesize
        * @param string $filename
        * @param string $before
        * @param string $after
        */
       function print_filesize($filename, $before = ' <span class=\"filesize\">(', $after = ')</span>')
       {
           if (file_exists($filename))
           {
               $size = filesize($filename);
               $unit = 'B';

               if (intval($size/(1024*1024*1024)))
               {
                   $size = number_format(($size/(1024*1024*1024)), 1);
                   $unit = 'GB';
               }
               elseif (intval($size/(1024*1024)))
               {
                   $size = number_format(($size/(1024*1024)), 1);
                   $unit = 'MB';
               }
               elseif (intval($size/1024))
               {
                   $size = number_format(($size/1024), 1);
                   $unit = 'KB';
               }

               $approx = $unit == 'B' ? '' : '≈' ;

               echo \"{$before}{$approx}{$size} {$unit}{$after}\";
           }
       }
       ")

    (p
       ["Note that the variable names in the double-quoted string above are
         a different colour from the rest of the string. Nice!"])

    (h4 "Python")

    (code-block :python

       "
       # function accepts any number of arguments since *all_sales is a tuple
       def daily_sales_total(*all_sales):
           total = 0.0
           for each_sale in all_sales:
               total += float(each_sale)
           return total
       ")

    (h3 "Including non-HTML code in HTML snippets")

    (p
       ["The Coda theme, like Coda itself, can handle non-HTML code inside
         HTML snippets."])

    (h4' {:id "css-inside-html"} "CSS inside HTML")

    (p
       ["For HTML snippets that contain some CSS, use "
        (code "<pre class=\"brush: css; html-script: true;\"></pre>") "."])

    (code-block :html

       "
       <head>
           <title>Coda theme for SyntaxHighlighter</title>
           <style type=\"text/css\">
               p {
                   margin: 0.75em 0;
                   font: 1.0em/1.5em \"Lucida Grande\", Helvetica, Arial, sans-serif;
                   padding: 0.75em;
               }
               p.js-off {
                   border: 1px solid #c00; /* red */
                   background-color: #fcc;
               }
               p.js-on {
                   border: 1px solid #0b0; /* green */
                   background-color: #cfc;
               }
           </style>
       </head>
       ")

    (h4' {:id "javascript-inside-html"} "JavaScript inside HTML")

    (p
       ["For HTML snippets that contain some JavaScript, use "
        (code "<pre class=\"brush: javascript; html-script: true;\"></pre>") "."])

    (code-block :html

       "
       <body>
           <p class=\"js-off\">
               JavaScript is currently <strong>disabled</strong>.
           </p>
           <p class=\"js-on\" style=\"display:none\">
               JavaScript is currently <strong>enabled</strong>.
           </p>
           <script type=\"text/javascript\">
               google.load('prototype', '1.6');
           </script>
           <script type=\"text/javascript\">
               document.observe('dom:loaded', function () {
                   $$('.js-off').invoke('hide');
                   $$('.js-on').invoke('show');
               });
           </script>
       </body>
       ")

    (h4' {:id "php-inside-html"} "PHP inside HTML")

    (p
       ["For HTML snippets that contain some PHP, use "
        (code "<pre class=\"brush: php; html-script: true;\"></pre>") "."])

    (code-block :php

       "
       <ul>
       <?php foreach ($names as $name): ?>
           <li><?php echo $name; ?></li>
       <?php endforeach; ?>
       </ul>
       ")

    (h3 "Limitations and known issues")

    (p
       ["Unfortunately, the Coda brush does not perform quite as well as the
         text editor from which it gets its name. The failings are as follows:"])

    (ul
       [(li
           [(p
               ["It is not possible to mix more than one additional language
                 with HTML. While it " (em "is") " possible to mix CSS with
                 HTML, or JavaScript with HTML, it is not possible to mix
                 both CSS " (em "and") " JavaScript with HTML. This is a
                 limitation of SyntaxHighlighter itself."])])
        (li
           [(p
               ["When mixing CSS or JavaScript with HTML, the style/script
                 opening tags are given the class 'script' rather than being
                 processed in the same manner as the rest of the HTML code.
                 As a result these tags appear in red, the colour used for
                 PHP tags. (If no workaround exists I'm going to suggest that
                 Alex make the necessary changes to ensure that style/script
                 opening tags are treated normally.)"])])
        (li
           [(p
               ["In order to correctly colour all HTML tags, each " (code "<") "
                 that is not part of a string is considered to be part of a tag.
                 This causes incorrect highlighting, as can be seen in this
                 example:"])
            (code-block :html
               "
               <script type=\"text/javascript\">
                   function isLarger(x, y) {
                       return (x > y);
                   }
               </script>
               ")])])

    (h3' {:id "setup"} "Setup")

    (ol
       [(li
           ["Download and unzip "
            (a "/downloads/coda-theme-for-syntaxhighlighter.zip"
               "coda-theme-for-syntaxhighlighter.zip") "."])
        (li
           ["Open " (strong "example.html") " to confirm that everything
             is working correctly."])
        (li
           ["Upload " (strong "styles/shThemeCoda.css") " to your
             SyntaxHighlighter " (strong "styles") " directory."])
        (li
           ["Upload " (strong "styles/bg.png") " to your SyntaxHighlighter "
            (strong "styles") " directory."])
        (li
           ["Upload the brushes in " (strong "scripts/") " to your
             SyntaxHighlighter " (strong "scripts") " directory, replacing
             the existing CSS, JavaScript, PHP, Python, and XML brushes.
             Three versions of each brush are included: " (strong ".js") ", "
            (strong ".min.js") " (minified), and " (strong ".min.js.gz") "
             (minified and gzipped). Use whichever version suits you best."])
        (li
           ["Add a link to the Coda theme wherever you link to shCore.css.
             If you're using the standard setup, this will be in the head
             section of the document."])])

    (update (datetime "2009-08-24" "22:51:00" :Pacific/Auckland)

       [(p
           ["Coda theme has been updated so that comments are now italicized
             (as they are in Coda). XML brush for Coda theme now applies the
             correct class name (\"xml-comment\") to HTML comments."])])

  ]

})
