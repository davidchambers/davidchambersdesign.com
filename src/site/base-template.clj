; Import order matters due to conflicts: ‘sanctuary’ and ‘elements’
; both export ‘div’ and ‘head’.
(import* [:base "./elements"]

(let [s (import :sanctuary)]

   (lambda [document-title main]
      (html
         [(head
             [(meta {:charset "utf-8"})
              (title (s/chain (function plain-text [node]
                                 (if (=== :text (:type node))
                                     [(:value node)]
                                     (if (:self-closing node)
                                         []
                                         (s/chain plain-text (:children node)))))
                              (canonicalize-children document-title)))
              (link {:rel "alternate" :type "application/atom+xml" :href "/feed/"})
              (link {:rel "stylesheet" :href "/css/reset.css" :media "all"})
              (link {:rel "stylesheet" :href "/css/print.css" :media "print"})
              (link {:rel "stylesheet" :href "/css/screen.css" :media "screen"})
              (link {:rel "shortcut icon" :type "image/x-icon" :href "http://static.davidchambersdesign.com/favicon.ico"})
              (script {:src "http://use.typekit.com/jhk0ogh.js"} [])
              (script {} "try{Typekit.load();}catch(e){}")])
          (body
             [(div {:id "skip"}
                 (a' {:href "#main"} "Skip to main content"))
              (div {:id "wrap"}
                 [(div {:id "header"}
                     (header
                        [(a' {:id "title" :href "/"} "David Chambers Design")
                         hr
                         (p "It's where I share interesting info with other web geeks")
                         (nav' {:id "nav"}
                            (ul
                               [(li
                                   (a' {:href "/about/"}
                                      (span {} [(strong "About.") (text " Who I am and what I do.")])))
                                (li
                                   (a' {:href "/contact/"}
                                      (span {} [(strong "Contact.") (text " Just in case you want to get in touch.")])))
                                (li
                                   (a' {:href "/archives/"}
                                      (span {} [(strong "Archives.") (text " Old posts, recent posts, they're all here.")])))
                                (li
                                   (a' {:href "/tags/"}
                                      (span {} [(strong "Tags.") (text " Helpful if you're after posts on a particular topic.")])))
                                (li
                                   (a' {:href "https://bitbucket.org/davidchambers"}
                                      (span {} [(strong "Bitbucket.") (text " Home to most of my open-source projects.")])))
                                (li
                                   (a' {:href "/twitter/"}
                                      (span {} [(strong "Twitter.") (text " It's where I chirrup… or chirp… or something.")])))]))]))
                  (div {:id "main"} main)])
              (footer
                 [(p
                     [(text "Powered by ")
                      (a' {:href "http://mango.io/wtf?" :data-version "0.9dev"} "Mango")
                      (text ". Hosted on ")
                      (a' {:href "http://www.linode.com/?r=ce523c9eeda64e4bceaf7011dc9e8558b909711d"} "Linode")
                      (text ". Original content ")
                      (a' {:href "/copying/"} "WTFPL-licensed")
                      (text ".")])])])]))))