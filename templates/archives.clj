(html {}
   [(head {}
       (map (lambda [x]
               (link {:rel "stylesheet"
                      :href (concat "https://cdn.jsdelivr.net/gh/davidchambers/davidchambersdesign.com@e76370b258761898ea0b63d1e14aa4caa4e7c359/src/css/"
                                    (:name x))
                      :media (:media x)}))
            [{:name "reset.css"  :media "all"}
             {:name "print.css"  :media "print"}
             {:name "screen.css" :media "screen"}]))
    (body {}
       [(div {:id "wrap"}
           [(div {:id "header"}
               [(a {:id "title" :href "/TK"} ["David Chambers Design"])
                (hr {})
                (p {} ["It's where I share interesting info with other web geeks"])
                (nav {:id "nav"}
                   [(ul {}
                       (map (lambda [x]
                               (li {}
                                  [(a {:href (reduce concat "" ["/TK/" (:slug x) "/"])}
                                      [(span {}
                                          [(strong {} [(concat (:label x) ".")])
                                           (concat " " (:desc x))])])]))
                            [{:slug  "about"
                              :label "About"
                              :desc  "Who I am and what I do."},
                             {:slug  "contact"
                              :label "Contact"
                              :desc  "Just in case you want to get in touch."},
                             {:slug  "archives"
                              :label "Archives"
                              :desc  "Old posts, recent posts, they're all here."},
                             {:slug  "tags"
                              :label "Tags"
                              :desc  "Helpful if you're after posts on a particular topic."},
                             {:slug  "bitbucket"
                              :label "Bitbucket"
                              :desc  "Who I am and what I do."}]))])])
            (div {:id "main"}
               [(h1 {} ["Archives"])
                (ol {:class "archives"}
                   (map (lambda [section]
                           (li {}
                              [(h2 {} [(:heading section)])
                               (ol {}
                                  (map (lambda [post]
                                          (li {}
                                             [(a {:href (concat "/TK/" (:slug post))} [(:title post)])
                                              " "
                                              (let [datetime (:datetime post)]
                                                 (time {:datetime (iso datetime)}
                                                    [(format-datetime "d MMMM y | h:mm" datetime)
                                                     (to-lower (format-datetime "a" datetime))]))]))
                                       (:posts section)))]))
                        [{:heading "August 2008"
                          :posts [{:slug "beautiful-painted-alphabet"
                                   :title "Beautiful painted alphabet"
                                   :datetime (datetime "Pacific/Auckland" "1:56am" "22 August 2008")}]}
                         {:heading "November 2008"
                          :posts [{:slug "show-full-directory-path-in-finder-window-title-bar"
                                   :title "Show full directory path in Finder window title bar"
                                   :datetime (datetime "Pacific/Auckland" "7:07pm" "29 November 2008")}]}
                         {:heading "December 2008"
                          :posts [{:slug "rounded-rectangles-in-adobe-illustrator-cs3"
                                   :title "Rounded rectangles in Adobe Illustrator CS3"
                                   :datetime (datetime "Pacific/Auckland" "12:49pm" "3 December 2008")},
                                  {:slug "intelligent-css-caching"
                                   :title "Intelligent CSS caching"
                                   :datetime (datetime "Pacific/Auckland" "2:50pm" "18 December 2008")}]}
                         {:heading "January 2009"
                          :posts [{:slug "escape-special-characters-for-sql-regexp"
                                   :title "Escape special characters for SQL REGEXP"
                                   :datetime (datetime "Pacific/Auckland" "10:21pm" "10 January 2009")}]}
                         {:heading "February 2009"
                          :posts [{:slug "david-carsons-2003-ted-lecture"
                                   :title "David Carson's 2003 TED lecture"
                                   :datetime (datetime "Pacific/Auckland" "11:21am" "10 February 2009")}]}
                         {:heading "March 2009"
                          :posts [{:slug "wordpress-login-redirect"
                                   :title "WordPress login redirect"
                                   :datetime (datetime "Pacific/Auckland" "3:01am" "1 March 2009")}
                                  {:slug "valid-xhtml-alternative-to-strike"
                                   :title "Valid XHTML alternative to `<strike>`"
                                   :datetime (datetime "Pacific/Auckland" "9:53pm" "17 March 2009")}
                                  {:slug "changing-keyboard-shortcuts-in-mac-os-x"
                                   :title "Changing keyboard shortcuts in Mac OS X"
                                   :datetime (datetime "Pacific/Auckland" "4:36pm" "25 March 2009")}]}
                         {:heading "April 2009"
                          :posts [{:slug "inserting-images-in-gmail-messages"
                                   :title "Inserting images in Gmail messages"
                                   :datetime (datetime "Pacific/Auckland" "8:27pm" "15 April 2009")}
                                  {:slug "django-syntax-highlighting-for-coda"
                                   :title "Django syntax highlighting for Coda"
                                   :datetime (datetime "Pacific/Auckland" "10:15pm" "16 April 2009")}
                                  {:slug "looping-more-than-once-with-the-wordpress-loop"
                                   :title "Looping more than once with the WordPress loop"
                                   :datetime (datetime "Pacific/Auckland" "12:34am" "17 April 2009")}
                                  {:slug "sms-event-reminders-from-google-calendar"
                                   :title "SMS event reminders from Google Calendar"
                                   :datetime (datetime "Pacific/Auckland" "9:44pm" "18 April 2009")}
                                  {:slug "tiny-calendar-icon-set"
                                   :title "Tiny calendar icon set"
                                   :datetime (datetime "Pacific/Auckland" "9:24pm" "24 April 2009")}]}
                         {:heading "June 2009"
                          :posts [{:slug "applescript-syntax-highlighting"
                                   :title "AppleScript syntax highlighting"
                                   :datetime (datetime "Pacific/Auckland" "3:12am" "4 June 2009")}
                                  {:slug "php-brush-for-syntaxhighlighter"
                                   :title "PHP brush for SyntaxHighlighter"
                                   :datetime (datetime "Pacific/Auckland" "5:00pm" "8 June 2009")}
                                  {:slug "php-print_filesize-function"
                                   :title "PHP print_filesize function"
                                   :datetime (datetime "Pacific/Auckland" "9:17pm" "10 June 2009")}
                                  {:slug "prototype-loader-for-syntaxhighlighter"
                                   :title "Prototype loader for SyntaxHighlighter"
                                   :datetime (datetime "Pacific/Auckland" "1:04am" "22 June 2009")}
                                  {:slug "associative-arrays-in-javascript"
                                   :title "Associative arrays in JavaScript"
                                   :datetime (datetime "Pacific/Auckland" "7:14pm" "29 June 2009")}]}
                         {:heading "July 2009"
                          :posts [{:slug "photoshop-save-for-web-javascript"
                                   :title "Photoshop \"save for web\" JavaScript"
                                   :datetime (datetime "Pacific/Auckland" "3:27am" "28 July 2009")}]}
                         {:heading "August 2009"
                          :posts [{:slug "incredible-performance-by-kseniya-simonova"
                                   :title "Incredible performance by Kseniya Simonova"
                                   :datetime (datetime "Pacific/Auckland" "10:29am" "10 August 2009")}
                                  {:slug "coda-theme-for-syntaxhighlighter"
                                   :title "Coda theme for SyntaxHighlighter"
                                   :datetime (datetime "Pacific/Auckland" "8:53am" "16 August 2009")}
                                  {:slug "tiny-calendar-icons-sprite"
                                   :title "Tiny calendar icons sprite"
                                   :datetime (datetime "Pacific/Auckland" "6:04pm" "28 August 2009")}
                                  {:slug "captions-over-images"
                                   :title "Captions over images"
                                   :datetime (datetime "Pacific/Auckland" "3:36am" "31 August 2009")}]}
                         {:heading "September 2009"
                          :posts [{:slug "embed-youtube-clips-using-valid-xhtml-markup"
                                   :title "Embed YouTube clips using valid XHTML markup"
                                   :datetime (datetime "Pacific/Auckland" "2:17pm" "14 September 2009")}
                                  {:slug "prototype-image-slider"
                                   :title "Prototype image slider"
                                   :datetime (datetime "Pacific/Auckland" "11:43pm" "16 September 2009")}
                                  {:slug "sticky-footers"
                                   :title "Sticky footers"
                                   :datetime (datetime "Pacific/Auckland" "1:08am" "20 September 2009")}]}
                         {:heading "October 2009"
                          :posts [{:slug "memorable-passwords-for-programmers"
                                   :title "Memorable passwords for programmers"
                                   :datetime (datetime "Pacific/Auckland" "12:42am" "21 October 2009")}
                                  {:slug "multisession-cd-burning-in-snow-leopard"
                                   :title "Multisession CD burning in Snow Leopard"
                                   :datetime (datetime "Pacific/Auckland" "8:58am" "27 October 2009")}
                                  {:slug "css-fixed-position-headers"
                                   :title "CSS fixed-position headers"
                                   :datetime (datetime "Pacific/Auckland" "6:25pm" "30 October 2009")}]}
                         {:heading "November 2009"
                          :posts [{:slug "using-html5-time-element-in-wordpress-themes"
                                   :title "Using HTML5 time element in WordPress themes"
                                   :datetime (datetime "Pacific/Auckland" "2:04am" "2 November 2009")}
                                  {:slug "prototype-and-scriptaculous-combined-and-compressed"
                                   :title "Prototype and script.aculo.us, combined and compressed"
                                   :datetime (datetime "Pacific/Auckland" "11:14pm" "9 November 2009")}]}
                         {:heading "January 2010"
                          :posts [{:slug "autopopulating-input-fields-with-prototype"
                                   :title "Auto-populating input fields with Prototype"
                                   :datetime (datetime "Pacific/Auckland" "10:03pm" "7 January 2010")}
                                  {:slug "accessing-mysql-shell-via-terminal"
                                   :title "Accessing MySQL shell via Terminal"
                                   :datetime (datetime "Pacific/Auckland" "1:49pm" "8 January 2010")}
                                  {:slug "duplicating-arrays-in-javascript"
                                   :title "Duplicating arrays in JavaScript"
                                   :datetime (datetime "Pacific/Auckland" "7:26pm" "9 January 2010")}
                                  {:slug "shockingly-simple-url-shortening"
                                   :title "Shockingly simple URL shortening"
                                   :datetime (datetime "Pacific/Auckland" "3:34am" "26 January 2010")}]}
                         {:heading "February 2010"
                          :posts [{:slug "resize-browser-window-to-match-iphone-viewport-dimensions"
                                   :title "Resize browser window to match iPhone viewport dimensions"
                                   :datetime (datetime "Pacific/Auckland" "3:20am" "16 February 2010")}
                                  {:slug "get-attributes-of-django-model-or-instance"
                                   :title "Get attributes of Django model or instance"
                                   :datetime (datetime "Pacific/Auckland" "8:24pm" "22 February 2010")}]}
                         {:heading "March 2010"
                          :posts [{:slug "gorgeous-css3-buttons-inspired-by-aqua"
                                   :title "Gorgeous CSS3 buttons inspired by Aqua"
                                   :datetime (datetime "Pacific/Auckland" "12:39pm" "8 March 2010")}
                                  {:slug "cricket-field-diagrams"
                                   :title "Cricket field diagrams"
                                   :datetime (datetime "Pacific/Auckland" "12:58am" "15 March 2010")}
                                  {:slug "mootools-every-method"
                                   :title "MooTools every method"
                                   :datetime (datetime "Pacific/Auckland" "12:40am" "18 March 2010")}
                                  {:slug "forcing-browsers-to-rerender-elements"
                                   :title "Forcing browsers to rerender elements"
                                   :datetime (datetime "Pacific/Auckland" "7:40pm" "22 March 2010")}
                                  {:slug "css-image-switcher-done-the-right-way"
                                   :title "CSS image switcher (done the right way)"
                                   :datetime (datetime "Pacific/Auckland" "12:47pm" "24 March 2010")}
                                  {:slug "fascinating-insight-into-the-mind-of-a-windows-user"
                                   :title "Fascinating insight into the mind of a Windows user"
                                   :datetime (datetime "Pacific/Auckland" "3:06pm" "25 March 2010")}
                                  {:slug "using-google-for-site-search"
                                   :title "Using Google for site search"
                                   :datetime (datetime "Pacific/Auckland" "10:06pm" "25 March 2010")}
                                  {:slug "extra-comma-considered-harmful"
                                   :title "Extra comma considered harmful"
                                   :datetime (datetime "Pacific/Auckland" "3:30pm" "29 March 2010")}]}
                         {:heading "April 2010"
                          :posts [{:slug "application-specific-volume-control-in-mac-os-x"
                                   :title "Application-specific volume control in Mac OS X?"
                                   :datetime (datetime "Pacific/Auckland" "2:04am" "7 April 2010")}
                                  {:slug "linkify-tweets-with-regex"
                                   :title "Linkify tweets with regex"
                                   :datetime (datetime "Pacific/Auckland" "3:22am" "10 April 2010")}
                                  {:slug "serializing-django-model-instances"
                                   :title "Serializing Django model instances"
                                   :datetime (datetime "Pacific/Auckland" "8:16am" "13 April 2010")}]}
                         {:heading "June 2010"
                          :posts [{:slug "freeing-myself-of-wordpress"
                                   :title "Freeing myself of WordPress"
                                   :datetime (datetime "Pacific/Auckland" "2:56am" "3 June 2010")}
                                  {:slug "optimization-via-stringification"
                                   :title "Optimization via stringification"
                                   :datetime (datetime "Pacific/Auckland" "2:28pm" "3 June 2010")}
                                  {:slug "autopopulating-input-fields-with-mootools"
                                   :title "Auto-populating input fields with MooTools"
                                   :datetime (datetime "Pacific/Auckland" "11:23pm" "9 June 2010")}
                                  {:slug "wmd-ftw"
                                   :title "wmd ftw!"
                                   :datetime (datetime "Pacific/Auckland" "11:25am" "13 June 2010")}
                                  {:slug "first-matching-item"
                                   :title "First matching item"
                                   :datetime (datetime "Pacific/Auckland" "11:17pm" "17 June 2010")}
                                  {:slug "settimeout-fix-for-webkit-transition"
                                   :title "setTimeout fix for -webkit-transition"
                                   :datetime (datetime "Pacific/Auckland" "3:12am" "18 June 2010")}]}
                         {:heading "July 2010"
                          :posts [{:slug "testing-django-apps-using-localhost-subdomains"
                                   :title "Testing Django apps using localhost subdomains"
                                   :datetime (datetime "Pacific/Auckland" "8:23am" "4 July 2010")}
                                  {:slug "empty-collections-are-valid-cache-data"
                                   :title "Empty collections are valid cache data"
                                   :datetime (datetime "Pacific/Auckland" "9:34am" "6 July 2010")}
                                  {:slug "-webkit-box-sizing"
                                   :title "-webkit-box-sizing"
                                   :datetime (datetime "Pacific/Auckland" "9:30pm" "18 July 2010")}
                                  {:slug "remove-textarea-scrollbars-in-internet-explorer"
                                   :title "Remove textarea scrollbars in Internet Explorer"
                                   :datetime (datetime "Pacific/Auckland" "10:00pm" "18 July 2010")}
                                  {:slug "positioning-elements-using-mootools"
                                   :title "Positioning elements using MooTools"
                                   :datetime (datetime "Pacific/Auckland" "5:45pm" "19 July 2010")}
                                  {:slug "javascript-everywhere"
                                   :title "JavaScript, JavaScript, everywhere"
                                   :datetime (datetime "Pacific/Auckland" "7:05pm" "20 July 2010")}
                                  {:slug "dieter-rams-video-interview"
                                   :title "Dieter Rams video interview"
                                   :datetime (datetime "Pacific/Auckland" "7:30pm" "20 July 2010")}
                                  {:slug "gmail-favicon-confusion"
                                   :title "Gmail's favicon confusion"
                                   :datetime (datetime "Pacific/Auckland" "10:56am" "21 July 2010")}
                                  {:slug "man-after-my-own-heart"
                                   :title "Man after my own heart"
                                   :datetime (datetime "Pacific/Auckland" "12:07am" "23 July 2010")}
                                  {:slug "digitalcolor-meter"
                                   :title "DigitalColor Meter"
                                   :datetime (datetime "Pacific/Auckland" "1:45am" "23 July 2010")}
                                  {:slug "python-loops-can-have-else-clause"
                                   :title "Python loops can have else clause?!"
                                   :datetime (datetime "Pacific/Auckland" "6:11pm" "25 July 2010")}]}
                         {:heading "August 2010"
                          :posts [{:slug "self-caching-functions-in-javascript-and-python"
                                   :title "Self-caching functions in JavaScript and Python"
                                   :datetime (datetime "Pacific/Auckland" "1:10am" "29 August 2010")}
                                  {:slug "efficient-rounding-in-javascript"
                                   :title "Efficient rounding in JavaScript"
                                   :datetime (datetime "Pacific/Auckland" "10:20pm" "31 August 2010")}]}
                         {:heading "September 2010"
                          :posts [{:slug "filtering-lists-in-python-ruby-and-javascript"
                                   :title "Filtering lists in Python, Ruby, and JavaScript"
                                   :datetime (datetime "Pacific/Auckland" "4:21am" "9 September 2010")}
                                  {:slug "converting-integers-to-ordinals"
                                   :title "Converting integers to ordinals"
                                   :datetime (datetime "Pacific/Auckland" "1:00pm" "16 September 2010")}
                                  {:slug "bike-shelf"
                                   :title "Bike shelf"
                                   :datetime (datetime "Pacific/Auckland" "7:53pm" "20 September 2010")}
                                  {:slug "customizing-file-and-folder-icons-in-mac-os-x"
                                   :title "Customizing file and folder icons in Mac OS X"
                                   :datetime (datetime "Pacific/Auckland" "12:00am" "29 September 2010")}]}
                         {:heading "November 2010"
                          :posts [{:slug "ridding-markup-of-textual-decoration"
                                   :title "Ridding markup of textual decoration"
                                   :datetime (datetime "Australia/Sydney" "1:00am" "15 November 2010")}
                                  {:slug "javascript-date-and-time-localization"
                                   :title "JavaScript date and time localization"
                                   :datetime (datetime "Australia/Sydney" "1:45am" "28 November 2010")}]}
                         {:heading "December 2010"
                          :posts [{:slug "bitwise-not-operator-proves-useful-in-javascript"
                                   :title "Bitwise NOT operator proves useful in JavaScript"
                                   :datetime (datetime "Australia/Sydney" "3:00pm" "11 December 2010")}]}
                         {:heading "January 2011"
                          :posts [{:slug "composing-mercurial-commit-messages-in-textmate"
                                   :title "Composing Mercurial commit messages in TextMate"
                                   :datetime (datetime "Australia/Sydney" "1:25am" "10 January 2011")}
                                  {:slug "safari-keyboard-shortcut-to-open-current-page-in-google-chrome"
                                   :title "Safari keyboard shortcut to open current page in Google Chrome"
                                   :datetime (datetime "America/Los_Angeles" "9:35pm" "30 January 2011")}]}
                         {:heading "February 2011"
                          :posts [{:slug "simulating-nonlocal-in-python-2.x"
                                   :title "Simulating `nonlocal` in Python 2.x"
                                   :datetime (datetime "America/Los_Angeles" "7:30pm" "5 February 2011")}
                                  {:slug "faster-terminal-navigation-via-aliases"
                                   :title "Faster Terminal navigation via aliases"
                                   :datetime (datetime "America/Los_Angeles" "10:10pm" "12 February 2011")}
                                  {:slug "customizing-your-bash-prompt-for-pleasure-and-profit"
                                   :title "Customizing your bash prompt for pleasure and profit"
                                   :datetime (datetime "America/Los_Angeles" "1:30am" "13 February 2011")}
                                  {:slug "mapping-file-extensions-to-emacs-syntax-modes"
                                   :title "Mapping file extensions to Emacs syntax modes"
                                   :datetime (datetime "America/Los_Angeles" "11:15pm" "18 February 2011")}]}
                         {:heading "March 2011"
                          :posts [{:slug "repeating-strings-in-javascript"
                                   :title "Repeating strings in JavaScript"
                                   :datetime (datetime "America/Los_Angeles" "5:30pm" "31 March 2011")}]}
                         {:heading "April 2011"
                          :posts [{:slug "changing-the-colour-of-list-bullets-using-css"
                                   :title "Changing the colour of list bullets using CSS"
                                   :datetime (datetime "America/Los_Angeles" "5:30pm" "13 April 2011")}
                                  {:slug "solarized"
                                   :title "Solarized"
                                   :datetime (datetime "America/Los_Angeles" "2:20am" "23 April 2011")}
                                  {:slug "hashify-editor"
                                   :title "Hashify Editor"
                                   :datetime (datetime "America/Los_Angeles" "6:15am" "24 April 2011")}]}
                         {:heading "May 2011"
                          :posts [{:slug "end-of-string-anchor-in-javascript-regular-expressions"
                                   :title "End of string anchor in JavaScript regular expressions"
                                   :datetime (datetime "America/Los_Angeles" "6:30pm" "22 May 2011")}
                                  {:slug "getting-truth-out-of-the-dom"
                                   :title "Getting truth out of the DOM – Yehuda Katz"
                                   :datetime (datetime "America/Los_Angeles" "10:15pm" "24 May 2011")}
                                  {:slug "escaping-html-in-javascript"
                                   :title "Escaping HTML in JavaScript"
                                   :datetime (datetime "America/Los_Angeles" "3:00pm" "30 May 2011")}]}
                         {:heading "July 2011"
                          :posts [{:slug "decorators-in-javascript"
                                   :title "Decorators in JavaScript"
                                   :datetime (datetime "America/Los_Angeles" "10:00pm" "26 July 2011")}]}
                         {:heading "August 2011"
                          :posts [{:slug "getting-started-with-socket.io"
                                   :title "Getting started with Socket.IO"
                                   :datetime (datetime "America/Los_Angeles" "12:15am" "7 August 2011")}]}
                         {:heading "October 2011"
                          :posts [{:slug "higher-level-style-sheets"
                                   :title "Higher-level style sheets"
                                   :datetime (datetime "America/Los_Angeles" "11:00pm" "2 October 2011")}]}
                         {:heading "November 2011"
                          :posts [{:slug "helveticards"
                                   :title "Helveticards"
                                   :datetime (datetime "America/Los_Angeles" "10:00pm" "20 November 2011")}]}
                         {:heading "January 2012"
                          :posts [{:slug "itunes-is-surprisingly-useful-when-learning-a-foreign-language"
                                   :title "iTunes: Surprisingly useful when learning a foreign language"
                                   :datetime (datetime "America/Los_Angeles" "7:20pm" "29 January 2012")}]}
                         {:heading "September 2012"
                          :posts [{:slug "the-perils-of-using-javascript-objects-as-sets"
                                   :title "The perils of using JavaScript objects as sets"
                                   :datetime (datetime "America/Los_Angeles" "8:00pm" "3 September 2012")}]}
                         {:heading "December 2012"
                          :posts [{:slug "xxx"
                                   :title "Title to come"
                                   :datetime (datetime "America/Los_Angeles" "10:00pm" "31 December 2012")}]}]))])])])])
