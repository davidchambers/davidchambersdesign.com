(import* ["../base.js" "../prelude.clj" "../elements.clj" "../sanctuary.clj"]

(let [exec-sync (curry-2 ("execSync" (import "child_process")))
      base (import "./base.clj")]

   (lambda [post]
      (base (:title post)
            [(article {}
                [(header {}
                    [(h1 {} [(text (:title post))])
                     (time {:datetime (invoke "toFormat" ["yyyy-MM-dd'T'HH:mm:ssZZ"] (:datetime post)) :pubdate "pubdate"}
                        [(text (invoke "toFormat" ["d MMMM yyyy"] (:datetime post)))])])
                 (html! (exec-sync "python -m markdown -x def_list"
                                   {"input" (:body post)
                                    "encoding" "utf8"}))
                 (text "\n")
                 (footer {:class "metadata"}
                    (join [[(ul {}
                               [(li {:class "shorturl"}
                                   [(a {:href "http://dċd.ws/14/"} [(text "Short URL")])])])]
                           (if (equals [] (:tags post))
                               []
                               [(h4 {} [(text "This post has the following tags:")])
                                (ol {}
                                   (map (lambda [tag] (li {} [(a {:href (join-with "" ["/tag/" tag "/"])} [(text tag)])]))
                                        (:tags post)))])]))
                 (h3 {:id "related"} [(text "Possibly related posts")])
                 (ul {}
                    [(li {} [(a {:href "http://davidchambersdesign.com/cricket-field-diagrams/"} [(text "Cricket field diagrams")])])
                     (li {} [(a {:href "http://davidchambersdesign.com/tiny-calendar-icons-sprite/"} [(text "Tiny calendar icons sprite")])])
                     (li {} [(a {:href "http://davidchambersdesign.com/bike-shelf/"} [(text "Bike shelf")])])
                     (li {} [(a {:href "http://davidchambersdesign.com/man-after-my-own-heart/"} [(text "Man after my own heart")])])
                     (li {} [(a {:href "http://davidchambersdesign.com/dieter-rams-video-interview/"} [(text "Dieter Rams video interview")])])])])]))))
