(html {}
  [(head {}
     (map (lambda [x]
            (link {:rel "stylesheet"
                   :href (str "https://cdn.jsdelivr.net/gh/davidchambers/davidchambersdesign.com@e76370b258761898ea0b63d1e14aa4caa4e7c359/src/css/"
                              (get :name x))
                   :media (get :media x)}))
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
                 [(li {} [(a {:href "/TK/about/"}     [(span {} [(strong {} ["About."])     " Who I am and what I do."])])])
                  (li {} [(a {:href "/TK/contact/"}   [(span {} [(strong {} ["Contact."])   " Just in case you want to get in touch."])])])
                  (li {} [(a {:href "/TK/archives/"}  [(span {} [(strong {} ["Archives."])  " Old posts, recent posts, they're all here."])])])
                  (li {} [(a {:href "/TK/tags/"}      [(span {} [(strong {} ["Tags."])      " Helpful if you're after posts on a particular topic."])])])
                  (li {} [(a {:href "/TK/bitbucket/"} [(span {} [(strong {} ["Bitbucket."]) " Who I am and what I do."])])])])])])])])])
