(import* ["../elements.clj"]
   (lambda [main]
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
                     [(a {:id "title" :href "/TK"} [(text "David Chambers Design")])
                      (hr {})
                      (p {} [(text "It's where I share interesting info with other web geeks")])
                      (nav {:id "nav"}
                         [(ul {}
                             (map (lambda [x]
                                     (li {}
                                        [(a {:href (reduce concat "" ["/TK/" (:slug x) "/"])}
                                            [(span {}
                                                [(strong {} [(text (concat (:label x) "."))])
                                                 (text (concat " " (:desc x)))])])]))
                                  [{:slug  "about"
                                    :label "About"
                                    :desc  "Who I am and what I do."}
                                   {:slug  "contact"
                                    :label "Contact"
                                    :desc  "Just in case you want to get in touch."}
                                   {:slug  "archives"
                                    :label "Archives"
                                    :desc  "Old posts, recent posts, they're all here."}
                                   {:slug  "tags"
                                    :label "Tags"
                                    :desc  "Helpful if you're after posts on a particular topic."}
                                   {:slug  "bitbucket"
                                    :label "Bitbucket"
                                    :desc  "Who I am and what I do."}]))])])
                  (div {:id "main"} main)])])])))
