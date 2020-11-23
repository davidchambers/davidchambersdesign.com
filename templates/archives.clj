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
                   [(li {}
                       [(h2 {} ["August 2008"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/beautiful-painted-alphabet"} ["Beautiful painted alphabet"])
                                " "
                                (time {:datetime "2008-08-22T01:56:00.000+12:00"} ["22 August 2008 | 1:56am"])])])])
                    (li {}
                       [(h2 {} ["November 2008"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/show-full-directory-path-in-finder-window-title-bar"} ["Show full directory path in Finder window title bar"])
                                " "
                                (time {:datetime "2008-11-29T19:07:00.000+13:00"} ["29 November 2008 | 7:07pm"])])])])
                    (li {}
                       [(h2 {} ["December 2008"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/rounded-rectangles-in-adobe-illustrator-cs3"} ["Rounded rectangles in Adobe Illustrator CS3"])
                                " "
                                (time {:datetime "2008-12-03T12:49:00.000+13:00"} ["3 December 2008 | 12:49pm"])])
                            (li {}
                               [(a {:href "/TK/intelligent-css-caching"} ["Intelligent CSS caching"])
                                " "
                                (time {:datetime "2008-12-18T14:50:00.000+13:00"} ["18 December 2008 | 2:50pm"])])])])
                    (li {}
                       [(h2 {} ["January 2009"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/escape-special-characters-for-sql-regexp"} ["Escape special characters for SQL REGEXP"])
                                " "
                                (time {:datetime "2009-01-10T22:21:00.000+13:00"} ["10 January 2009 | 10:21pm"])])])])
                    (li {}
                       [(h2 {} ["February 2009"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/david-carsons-2003-ted-lecture"} ["David Carson's 2003 TED lecture"])
                                " "
                                (time {:datetime "2009-02-10T11:21:00.000+13:00"} ["10 February 2009 | 11:21am"])])])])
                    (li {}
                       [(h2 {} ["March 2009"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/wordpress-login-redirect"} ["WordPress login redirect"])
                                " "
                                (time {:datetime "2009-03-01T03:01:00.000+13:00"} ["1 March 2009 | 3:01am"])])
                            (li {}
                               [(a {:href "/TK/valid-xhtml-alternative-to-strike"} ["Valid XHTML alternative to `<strike>`"])
                                " "
                                (time {:datetime "2009-03-17T21:53:00.000+13:00"} ["17 March 2009 | 9:53pm"])])
                            (li {}
                               [(a {:href "/TK/changing-keyboard-shortcuts-in-mac-os-x"} ["Changing keyboard shortcuts in Mac OS X"])
                                " "
                                (time {:datetime "2009-03-25T16:36:00.000+13:00"} ["25 March 2009 | 4:36pm"])])])])
                    (li {}
                       [(h2 {} ["April 2009"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/inserting-images-in-gmail-messages"} ["Inserting images in Gmail messages"])
                                " "
                                (time {:datetime "2009-04-15T20:27:00.000+12:00"} ["15 April 2009 | 8:27pm"])])
                            (li {}
                               [(a {:href "/TK/django-syntax-highlighting-for-coda"} ["Django syntax highlighting for Coda"])
                                " "
                                (time {:datetime "2009-04-16T22:15:00.000+12:00"} ["16 April 2009 | 10:15pm"])])
                            (li {}
                               [(a {:href "/TK/looping-more-than-once-with-the-wordpress-loop"} ["Looping more than once with the WordPress loop"])
                                " "
                                (time {:datetime "2009-04-17T00:34:00.000+12:00"} ["17 April 2009 | 12:34am"])])
                            (li {}
                               [(a {:href "/TK/sms-event-reminders-from-google-calendar"} ["SMS event reminders from Google Calendar"])
                                " "
                                (time {:datetime "2009-04-18T21:44:00.000+12:00"} ["18 April 2009 | 9:44pm"])])
                            (li {}
                               [(a {:href "/TK/tiny-calendar-icon-set"} ["Tiny calendar icon set"])
                                " "
                                (time {:datetime "2009-04-24T21:24:00.000+12:00"} ["24 April 2009 | 9:24pm"])])])])
                    (li {}
                       [(h2 {} ["June 2009"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/applescript-syntax-highlighting"} ["AppleScript syntax highlighting"])
                                " "
                                (time {:datetime "2009-06-04T03:12:00.000+12:00"} ["4 June 2009 | 3:12am"])])
                            (li {}
                               [(a {:href "/TK/php-brush-for-syntaxhighlighter"} ["PHP brush for SyntaxHighlighter"])
                                " "
                                (time {:datetime "2009-06-08T17:00:00.000+12:00"} ["8 June 2009 | 5:00pm"])])
                            (li {}
                               [(a {:href "/TK/php-print_filesize-function"} ["PHP print_filesize function"])
                                " "
                                (time {:datetime "2009-06-10T21:17:00.000+12:00"} ["10 June 2009 | 9:17pm"])])
                            (li {}
                               [(a {:href "/TK/prototype-loader-for-syntaxhighlighter"} ["Prototype loader for SyntaxHighlighter"])
                                " "
                                (time {:datetime "2009-06-22T01:04:00.000+12:00"} ["22 June 2009 | 1:04am"])])
                            (li {}
                               [(a {:href "/TK/associative-arrays-in-javascript"} ["Associative arrays in JavaScript"])
                                " "
                                (time {:datetime "2009-06-29T19:14:00.000+12:00"} ["29 June 2009 | 7:14pm"])])])])
                    (li {}
                       [(h2 {} ["July 2009"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/photoshop-save-for-web-javascript"} ["Photoshop \"save for web\" JavaScript"])
                                " "
                                (time {:datetime "2009-07-28T03:27:00.000+12:00"} ["28 July 2009 | 3:27am"])])])])
                    (li {}
                       [(h2 {} ["August 2009"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/incredible-performance-by-kseniya-simonova"} ["Incredible performance by Kseniya Simonova"])
                                " "
                                (time {:datetime "2009-08-10T10:29:00.000+12:00"} ["10 August 2009 | 10:29am"])])
                            (li {}
                               [(a {:href "/TK/coda-theme-for-syntaxhighlighter"} ["Coda theme for SyntaxHighlighter"])
                                " "
                                (time {:datetime "2009-08-16T08:53:00.000+12:00"} ["16 August 2009 | 8:53am"])])
                            (li {}
                               [(a {:href "/TK/tiny-calendar-icons-sprite"} ["Tiny calendar icons sprite"])
                                " "
                                (time {:datetime "2009-08-28T18:04:00.000+12:00"} ["28 August 2009 | 6:04pm"])])
                            (li {}
                               [(a {:href "/TK/captions-over-images"} ["Captions over images"])
                                " "
                                (time {:datetime "2009-08-31T03:36:00.000+12:00"} ["31 August 2009 | 3:36am"])])])])
                    (li {}
                       [(h2 {} ["September 2009"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/embed-youtube-clips-using-valid-xhtml-markup"} ["Embed YouTube clips using valid XHTML markup"])
                                " "
                                (time {:datetime "2009-09-14T14:17:00.000+12:00"} ["14 September 2009 | 2:17pm"])])
                            (li {}
                               [(a {:href "/TK/prototype-image-slider"} ["Prototype image slider"])
                                " "
                                (time {:datetime "2009-09-16T23:43:00.000+12:00"} ["16 September 2009 | 11:43pm"])])
                            (li {}
                               [(a {:href "/TK/sticky-footers"} ["Sticky footers"])
                                " "
                                (time {:datetime "2009-09-20T01:08:00.000+12:00"} ["20 September 2009 | 1:08am"])])])])
                    (li {}
                       [(h2 {} ["October 2009"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/memorable-passwords-for-programmers"} ["Memorable passwords for programmers"])
                                " "
                                (time {:datetime "2009-10-21T00:42:00.000+13:00"} ["21 October 2009 | 12:42am"])])
                            (li {}
                               [(a {:href "/TK/multisession-cd-burning-in-snow-leopard"} ["Multisession CD burning in Snow Leopard"])
                                " "
                                (time {:datetime "2009-10-27T08:58:00.000+13:00"} ["27 October 2009 | 8:58am"])])
                            (li {}
                               [(a {:href "/TK/css-fixed-position-headers"} ["CSS fixed-position headers"])
                                " "
                                (time {:datetime "2009-10-30T18:25:00.000+13:00"} ["30 October 2009 | 6:25pm"])])])])
                    (li {}
                       [(h2 {} ["November 2009"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/using-html5-time-element-in-wordpress-themes"} ["Using HTML5 time element in WordPress themes"])
                                " "
                                (time {:datetime "2009-11-02T02:04:00.000+13:00"} ["2 November 2009 | 2:04am"])])
                            (li {}
                               [(a {:href "/TK/prototype-and-scriptaculous-combined-and-compressed"} ["Prototype and script.aculo.us, combined and compressed"])
                                " "
                                (time {:datetime "2009-11-09T23:14:00.000+13:00"} ["9 November 2009 | 11:14pm"])])])])
                    (li {}
                       [(h2 {} ["January 2010"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/autopopulating-input-fields-with-prototype"} ["Auto-populating input fields with Prototype"])
                                " "
                                (time {:datetime "2010-01-07T22:03:00.000+13:00"} ["7 January 2010 | 10:03pm"])])
                            (li {}
                               [(a {:href "/TK/accessing-mysql-shell-via-terminal"} ["Accessing MySQL shell via Terminal"])
                                " "
                                (time {:datetime "2010-01-08T13:49:00.000+13:00"} ["8 January 2010 | 1:49pm"])])
                            (li {}
                               [(a {:href "/TK/duplicating-arrays-in-javascript"} ["Duplicating arrays in JavaScript"])
                                " "
                                (time {:datetime "2010-01-09T19:26:00.000+13:00"} ["9 January 2010 | 7:26pm"])])
                            (li {}
                               [(a {:href "/TK/shockingly-simple-url-shortening"} ["Shockingly simple URL shortening"])
                                " "
                                (time {:datetime "2010-01-26T03:34:00.000+13:00"} ["26 January 2010 | 3:34am"])])])])
                    (li {}
                       [(h2 {} ["February 2010"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/resize-browser-window-to-match-iphone-viewport-dimensions"} ["Resize browser window to match iPhone viewport dimensions"])
                                " "
                                (time {:datetime "2010-02-16T03:20:00.000+13:00"} ["16 February 2010 | 3:20am"])])
                            (li {}
                               [(a {:href "/TK/get-attributes-of-django-model-or-instance"} ["Get attributes of Django model or instance"])
                                " "
                                (time {:datetime "2010-02-22T20:24:00.000+13:00"} ["22 February 2010 | 8:24pm"])])])])
                    (li {}
                       [(h2 {} ["March 2010"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/gorgeous-css3-buttons-inspired-by-aqua"} ["Gorgeous CSS3 buttons inspired by Aqua"])
                                " "
                                (time {:datetime "2010-03-08T12:39:00.000+13:00"} ["8 March 2010 | 12:39pm"])])
                            (li {}
                               [(a {:href "/TK/cricket-field-diagrams"} ["Cricket field diagrams"])
                                " "
                                (time {:datetime "2010-03-15T00:58:00.000+13:00"} ["15 March 2010 | 12:58am"])])
                            (li {}
                               [(a {:href "/TK/mootools-every-method"} ["MooTools every method"])
                                " "
                                (time {:datetime "2010-03-18T00:40:00.000+13:00"} ["18 March 2010 | 12:40am"])])
                            (li {}
                               [(a {:href "/TK/forcing-browsers-to-rerender-elements"} ["Forcing browsers to rerender elements"])
                                " "
                                (time {:datetime "2010-03-22T19:40:00.000+13:00"} ["22 March 2010 | 7:40pm"])])
                            (li {}
                               [(a {:href "/TK/css-image-switcher-done-the-right-way"} ["CSS image switcher (done the right way)"])
                                " "
                                (time {:datetime "2010-03-24T12:47:00.000+13:00"} ["24 March 2010 | 12:47pm"])])
                            (li {}
                               [(a {:href "/TK/fascinating-insight-into-the-mind-of-a-windows-user"} ["Fascinating insight into the mind of a Windows user"])
                                " "
                                (time {:datetime "2010-03-25T15:06:00.000+13:00"} ["25 March 2010 | 3:06pm"])])
                            (li {}
                               [(a {:href "/TK/using-google-for-site-search"} ["Using Google for site search"])
                                " "
                                (time {:datetime "2010-03-25T22:06:00.000+13:00"} ["25 March 2010 | 10:06pm"])])
                            (li {}
                               [(a {:href "/TK/extra-comma-considered-harmful"} ["Extra comma considered harmful"])
                                " "
                                (time {:datetime "2010-03-29T15:30:00.000+13:00"} ["29 March 2010 | 3:30pm"])])])])
                    (li {}
                       [(h2 {} ["April 2010"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/application-specific-volume-control-in-mac-os-x"} ["Application-specific volume control in Mac OS X?"])
                                " "
                                (time {:datetime "2010-04-07T02:04:00.000+12:00"} ["7 April 2010 | 2:04am"])])
                            (li {}
                               [(a {:href "/TK/linkify-tweets-with-regex"} ["Linkify tweets with regex"])
                                " "
                                (time {:datetime "2010-04-10T03:22:00.000+12:00"} ["10 April 2010 | 3:22am"])])
                            (li {}
                               [(a {:href "/TK/serializing-django-model-instances"} ["Serializing Django model instances"])
                                " "
                                (time {:datetime "2010-04-13T08:16:00.000+12:00"} ["13 April 2010 | 8:16am"])])])])
                    (li {}
                       [(h2 {} ["June 2010"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/freeing-myself-of-wordpress"} ["Freeing myself of WordPress"])
                                " "
                                (time {:datetime "2010-06-03T02:56:00.000+12:00"} ["3 June 2010 | 2:56am"])])
                            (li {}
                               [(a {:href "/TK/optimization-via-stringification"} ["Optimization via stringification"])
                                " "
                                (time {:datetime "2010-06-03T14:28:00.000+12:00"} ["3 June 2010 | 2:28pm"])])
                            (li {}
                               [(a {:href "/TK/autopopulating-input-fields-with-mootools"} ["Auto-populating input fields with MooTools"])
                                " "
                                (time {:datetime "2010-06-09T23:23:00.000+12:00"} ["9 June 2010 | 11:23pm"])])
                            (li {}
                               [(a {:href "/TK/wmd-ftw"} ["wmd ftw!"])
                                " "
                                (time {:datetime "2010-06-13T11:25:00.000+12:00"} ["13 June 2010 | 11:25am"])])
                            (li {}
                               [(a {:href "/TK/first-matching-item"} ["First matching item"])
                                " "
                                (time {:datetime "2010-06-17T23:17:00.000+12:00"} ["17 June 2010 | 11:17pm"])])
                            (li {}
                               [(a {:href "/TK/settimeout-fix-for-webkit-transition"} ["setTimeout fix for -webkit-transition"])
                                " "
                                (time {:datetime "2010-06-18T03:12:00.000+12:00"} ["18 June 2010 | 3:12am"])])])])
                    (li {}
                       [(h2 {} ["July 2010"])
                        (ol {}
                           (map (lambda [post]
                                   (li {}
                                      [(a {:href (concat "/TK/" (:slug post))} [(:title post)])
                                       " "
                                       (let [datetime (:datetime post)]
                                          (time {:datetime (iso datetime)}
                                             [(format-datetime "d MMMM y | h:mm" datetime)
                                              (to-lower (format-datetime "a" datetime))]))]))
                                [{:slug "testing-django-apps-using-localhost-subdomains"
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
                                  :datetime (datetime "Pacific/Auckland" "6:11pm" "25 July 2010")}]))])
                    (li {}
                       [(h2 {} ["August 2010"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/self-caching-functions-in-javascript-and-python"} ["Self-caching functions in JavaScript and Python"])
                                " "
                                (time {:datetime "2010-08-29T01:10:00.000+12:00"} ["29 August 2010 | 1:10am"])])
                            (li {}
                               [(a {:href "/TK/efficient-rounding-in-javascript"} ["Efficient rounding in JavaScript"])
                                " "
                                (time {:datetime "2010-08-31T22:20:00.000+12:00"} ["31 August 2010 | 10:20pm"])])])])
                    (li {}
                       [(h2 {} ["September 2010"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/filtering-lists-in-python-ruby-and-javascript"} ["Filtering lists in Python, Ruby, and JavaScript"])
                                " "
                                (time {:datetime "2010-09-09T04:21:00.000+12:00"} ["9 September 2010 | 4:21am"])])
                            (li {}
                               [(a {:href "/TK/converting-integers-to-ordinals"} ["Converting integers to ordinals"])
                                " "
                                (time {:datetime "2010-09-16T13:00:00.000+12:00"} ["16 September 2010 | 1:00pm"])])
                            (li {}
                               [(a {:href "/TK/bike-shelf"} ["Bike shelf"])
                                " "
                                (time {:datetime "2010-09-20T19:53:00.000+12:00"} ["20 September 2010 | 7:53pm"])])
                            (li {}
                               [(a {:href "/TK/customizing-file-and-folder-icons-in-mac-os-x"} ["Customizing file and folder icons in Mac OS X"])
                                " "
                                (time {:datetime "2010-09-29T00:00:00.000+13:00"} ["29 September 2010 | 12:00am"])])])])
                    (li {}
                       [(h2 {} ["November 2010"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/ridding-markup-of-textual-decoration"} ["Ridding markup of textual decoration"])
                                " "
                                (time {:datetime "2010-11-15T01:00:00.000+11:00"} ["15 November 2010 | 1:00am"])])
                            (li {}
                               [(a {:href "/TK/javascript-date-and-time-localization"} ["JavaScript date and time localization"])
                                " "
                                (time {:datetime "2010-11-28T01:45:00.000+11:00"} ["28 November 2010 | 1:45am"])])])])
                    (li {}
                       [(h2 {} ["December 2010"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/bitwise-not-operator-proves-useful-in-javascript"} ["Bitwise NOT operator proves useful in JavaScript"])
                                " "
                                (time {:datetime "2010-12-11T15:00:00.000+11:00"} ["11 December 2010 | 3:00pm"])])])])
                    (li {}
                       [(h2 {} ["January 2011"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/composing-mercurial-commit-messages-in-textmate"} ["Composing Mercurial commit messages in TextMate"])
                                " "
                                (time {:datetime "2011-01-10T01:25:00.000+11:00"} ["10 January 2011 | 1:25am"])])
                            (li {}
                               [(a {:href "/TK/safari-keyboard-shortcut-to-open-current-page-in-google-chrome"} ["Safari keyboard shortcut to open current page in Google Chrome"])
                                " "
                                (time {:datetime "2011-01-30T21:35:00.000-08:00"} ["30 January 2011 | 9:35pm"])])])])
                    (li {}
                       [(h2 {} ["February 2011"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/simulating-nonlocal-in-python-2.x"} ["Simulating `nonlocal` in Python 2.x"])
                                " "
                                (time {:datetime "2011-02-05T19:30:00.000-08:00"} ["5 February 2011 | 7:30pm"])])
                            (li {}
                               [(a {:href "/TK/faster-terminal-navigation-via-aliases"} ["Faster Terminal navigation via aliases"])
                                " "
                                (time {:datetime "2011-02-12T22:10:00.000-08:00"} ["12 February 2011 | 10:10pm"])])
                            (li {}
                               [(a {:href "/TK/customizing-your-bash-prompt-for-pleasure-and-profit"} ["Customizing your bash prompt for pleasure and profit"])
                                " "
                                (time {:datetime "2011-02-13T01:30:00.000-08:00"} ["13 February 2011 | 1:30am"])])
                            (li {}
                               [(a {:href "/TK/mapping-file-extensions-to-emacs-syntax-modes"} ["Mapping file extensions to Emacs syntax modes"])
                                " "
                                (time {:datetime "2011-02-18T23:15:00.000-08:00"} ["18 February 2011 | 11:15pm"])])])])
                    (li {}
                       [(h2 {} ["March 2011"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/repeating-strings-in-javascript"} ["Repeating strings in JavaScript"])
                                " "
                                (time {:datetime "2011-03-31T17:30:00.000-07:00"} ["31 March 2011 | 5:30pm"])])])])
                    (li {}
                       [(h2 {} ["April 2011"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/changing-the-colour-of-list-bullets-using-css"} ["Changing the colour of list bullets using CSS"])
                                " "
                                (time {:datetime "2011-04-13T17:30:00.000-07:00"} ["13 April 2011 | 5:30pm"])])
                            (li {}
                               [(a {:href "/TK/solarized"} ["Solarized"])
                                " "
                                (time {:datetime "2011-04-23T02:20:00.000-07:00"} ["23 April 2011 | 2:20am"])])
                            (li {}
                               [(a {:href "/TK/hashify-editor"} ["Hashify Editor"])
                                " "
                                (time {:datetime "2011-04-24T06:15:00.000-07:00"} ["24 April 2011 | 6:15am"])])])])
                    (li {}
                       [(h2 {} ["May 2011"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/end-of-string-anchor-in-javascript-regular-expressions"} ["End of string anchor in JavaScript regular expressions"])
                                " "
                                (time {:datetime "2011-05-22T18:30:00.000-07:00"} ["22 May 2011 | 6:30pm"])])
                            (li {}
                               [(a {:href "/TK/getting-truth-out-of-the-dom"} ["Getting truth out of the DOM – Yehuda Katz"])
                                " "
                                (time {:datetime "2011-05-24T22:15:00.000-07:00"} ["24 May 2011 | 10:15pm"])])
                            (li {}
                               [(a {:href "/TK/escaping-html-in-javascript"} ["Escaping HTML in JavaScript"])
                                " "
                                (time {:datetime "2011-05-30T15:00:00.000-07:00"} ["30 May 2011 | 3:00pm"])])])])
                    (li {}
                       [(h2 {} ["July 2011"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/decorators-in-javascript"} ["Decorators in JavaScript"])
                                " "
                                (time {:datetime "2011-07-26T22:00:00.000-07:00"} ["26 July 2011 | 10:00pm"])])])])
                    (li {}
                       [(h2 {} ["August 2011"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/getting-started-with-socket.io"} ["Getting started with Socket.IO"])
                                " "
                                (time {:datetime "2011-08-07T00:15:00.000-07:00"} ["7 August 2011 | 12:15am"])])])])
                    (li {}
                       [(h2 {} ["October 2011"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/higher-level-style-sheets"} ["Higher-level style sheets"])
                                " "
                                (time {:datetime "2011-10-02T23:00:00.000-07:00"} ["2 October 2011 | 11:00pm"])])])])
                    (li {}
                       [(h2 {} ["November 2011"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/helveticards"} ["Helveticards"])
                                " "
                                (time {:datetime "2011-11-20T22:00:00.000-08:00"} ["20 November 2011 | 10:00pm"])])])])
                    (li {}
                       [(h2 {} ["January 2012"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/itunes-is-surprisingly-useful-when-learning-a-foreign-language"} ["iTunes: Surprisingly useful when learning a foreign language"])
                                " "
                                (time {:datetime "2012-01-29T19:20:00.000-08:00"} ["29 January 2012 | 7:20pm"])])])])
                    (li {}
                       [(h2 {} ["September 2012"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/the-perils-of-using-javascript-objects-as-sets"} ["The perils of using JavaScript objects as sets"])
                                " "
                                (time {:datetime "2012-09-03T20:00:00.000-07:00"} ["3 September 2012 | 8:00pm"])])])])
                    (li {}
                       [(h2 {} ["December 2012"])
                        (ol {}
                           [(li {}
                               [(a {:href "/TK/xxx"} ["Title to come"])
                                " "
                                (time {:datetime "2012-12-31T22:00:00.000-08:00"} ["31 December 2012 | 10:00pm"])])])])])])])])])
