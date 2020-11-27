; Import order matters due to conflicts: ‘sanctuary’ and ‘elements’
; both export ‘div’ and ‘head’.
(import* ["../sanctuary.clj" "../elements.clj"]

(lambda [document-title main]
   (html {}
      [(head {}
          [(meta {:charset "utf-8"})
           (title {} [(text document-title)])
           (link {:rel "alternate" :type "application/atom+xml" :href "/feed/"})
           (link {:rel "stylesheet" :href "https://cdn.jsdelivr.net/gh/davidchambers/davidchambersdesign.com@e76370b258761898ea0b63d1e14aa4caa4e7c359/src/css/reset.css" :media "all"})
           (link {:rel "stylesheet" :href "https://cdn.jsdelivr.net/gh/davidchambers/davidchambersdesign.com@e76370b258761898ea0b63d1e14aa4caa4e7c359/src/css/print.css" :media "print"})
           (link {:rel "stylesheet" :href "https://cdn.jsdelivr.net/gh/davidchambers/davidchambersdesign.com@e76370b258761898ea0b63d1e14aa4caa4e7c359/src/css/screen.css" :media "screen"})
           (link {:rel "shortcut icon" :type "image/x-icon" :href "http://static.davidchambersdesign.com/favicon.ico"})
           (script {:src "http://use.typekit.com/jhk0ogh.js"} [])
           (script {} [(text "try{Typekit.load();}catch(e){}")])])
       (body {}
          [(div {:id "skip"}
              [(a {:href "#main"} [(text "Skip to main content")])])
           (div {:id "wrap"}
              [(div {:id "header"}
                  [(header {}
                      [(a {:id "title" :href "/"} [(text "David Chambers Design")])
                       (hr {})
                       (p {} [(text "It's where I share interesting info with other web geeks")])
                       (nav {:id "nav"}
                          [(ul {}
                              [(li {}
                                  [(a {:href "/about/"}
                                      [(span {}
                                          [(strong {} [(text "About.")])
                                           (text " Who I am and what I do.")])])])
                               (li {}
                                  [(a {:href "/contact/"}
                                      [(span {}
                                          [(strong {} [(text "Contact.")])
                                           (text " Just in case you want to get in touch.")])])])
                               (li {}
                                  [(a {:href "/archives/"}
                                      [(span {}
                                          [(strong {} [(text "Archives.")])
                                           (text " Old posts, recent posts, they're all here.")])])])
                               (li {}
                                  [(a {:href "/tags/"}
                                      [(span {}
                                          [(strong {} [(text "Tags.")])
                                           (text " Helpful if you're after posts on a particular topic.")])])])
                               (li {}
                                  [(a {:href "https://bitbucket.org/davidchambers"}
                                      [(span {}
                                          [(strong {} [(text "Bitbucket.")])
                                           (text " Home to most of my open-source projects.")])])])
                               (li {}
                                  [(a {:href "/twitter/"}
                                      [(span {}
                                          [(strong {} [(text "Twitter.")])
                                           (text " It's where I chirrup… or chirp… or something.")])])])])])])])
               (div {:id "main"} main)])
           (footer {}
              [(p {}
                  [(text "Powered by ")
                   (a {:href "http://mango.io/wtf?" :data-version "0.9dev"} [(text "Mango")])
                   (text ". Hosted on ")
                   (a {:href "http://www.linode.com/?r=ce523c9eeda64e4bceaf7011dc9e8558b909711d"} [(text "Linode")])
                   (text ". Original content ")
                   (a {:href "/copying/"} [(text "WTFPL-licensed")])
                   (text ".")])])])])))
