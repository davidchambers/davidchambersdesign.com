(import* ["../base.js" "../prelude.clj" "../elements.clj" "../sanctuary.clj"]

(let [base (import "./base.clj")]

   (lambda [post]
      (base (:title post)
            [(article
                (join [[(header
                           [(h1 (:title post))
                            (time {:datetime (.toFormat "yyyy-MM-dd'T'HH:mm:ssZZ" (:datetime post)) :pubdate "pubdate"}
                               (.toFormat "d MMMM y" (:datetime post)))])]
                       (:body post)
                       [(footer' {:class "metadata"}
                           (join [[(ul
                                      (li' {:class "shorturl"}
                                         (a' {:href "http://dċd.ws/14/"} "Short URL")))]
                                  (if (equals [] (:tags post))
                                      []
                                      [(h4 "This post has the following tags:")
                                       (ol
                                          (map (lambda [tag] (li (a' {:href (++ ["/tag/" tag "/"])} tag)))
                                               (:tags post)))])]))
                        (h3' {:id "related"} "Possibly related posts")
                        (ul
                           [(li (a' {:href "http://davidchambersdesign.com/cricket-field-diagrams/"} "Cricket field diagrams"))
                            (li (a' {:href "http://davidchambersdesign.com/tiny-calendar-icons-sprite/"} "Tiny calendar icons sprite"))
                            (li (a' {:href "http://davidchambersdesign.com/bike-shelf/"} "Bike shelf"))
                            (li (a' {:href "http://davidchambersdesign.com/man-after-my-own-heart/"} "Man after my own heart"))
                            (li (a' {:href "http://davidchambersdesign.com/dieter-rams-video-interview/"} "Dieter Rams video interview"))])]]))]))))
