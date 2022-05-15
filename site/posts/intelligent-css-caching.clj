(import ["../elements"]

(let [
  code-block          (require "../components/code-block")
  datetime            (require "../datetime")
] {

  :id 4

  :slug "intelligent-css-caching"

  :title "Intelligent CSS caching"

  :datetime (datetime "2008-12-18" "14:50:00" :Pacific/Auckland)

  :tags [:css :php]

  :body [

    (p
       ["If you've ever worked with CSS, you'll understand how frustrating
         it is to edit a style sheet and be unable to view the change because
         a cached version of the file is being used. One line of PHP will fix
         this problem, and will also ensure that visitors never view your site
         through the lens of an outdated style sheet."])

    (p
       ["If you've ever worked with CSS, you'll understand how frustrating
         it is to edit a style sheet and be unable to view the change because
         a cached version of the file is being used."])

    (p
       ["In the past, I've adopted an unscientific approach to working
         around this problem: I've done forced refreshes, relaunched browsers,
         emptied caches, and even disabled caching entirely using Firefox's
         Web Developer extension."])

    (p
       ["Each of these workarounds is problematic in some way: browsers do
         not agree on exactly what a page refresh should do; quitting and
         relaunching a browser is time-consuming (particularly with Firefox
         on OS X); emptying the cache gobbles up bandwidth; and disabling
         caching slows down the testing process by forcing a bunch of static
         files to be retrieved from the server every time the page is loaded."])

    (p
       ["While the problem of cached style sheets is largely an annoyance
         confined to the development environment, it occasionally causes
         problems at other times. For example, let's say that you've made
         a minor change to a site's source code – you've changed "
        (code "<div id=\"wrapper\">") " to " (code "<div id=\"wrap\">")
        ". You've also done a find and replace on the style sheet, and
         rolled both changes live. A new visitor to the site will have
         no problems, but a returning visitor may see the site through
         the lens of an out-of-date style sheet. Yikes!"])

    (p
       ["I decided that it was time to find a reliable solution
         to the above problems. I came across an article on "
        (a "http://css-tricks.com/can-we-prevent-css-caching/"
           "timestamping CSS") "
         which suggests appending a unique string to a style sheet's
         href when linking to it in a page's " (code "<head>") "."])

    (p
       ["After reading the replies to the above post, and taking on board
         several good suggestions, here is the PHP code I have decided upon:"])

    (code-block :php

       "
       href=\"path/to/style.css?<?php echo date('Y-m-d-H-i-s', filectime('path/to/style.css')); ?>\"
       ")

    (p
       ["The above generates something like this:"])

    (code-block :html

       "
       href=\"path/to/style.css?2008-12-16-20-02-53\"
       ")

    (p
       ["The nice thing about using "
        (a "http://php.net/manual/en/function.filectime.php"
           "PHP's filectime function") "
         is that the timestamp is dependent on the time at which the CSS file
         was last modified. This means that the cached style sheet is used when
         it is " (strong "up to date") ", but the file is retrieved from the
         server when it has been " (strong "changed in any way") "."])

  ]

}))