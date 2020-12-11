(import* ["./base.js" "./sanctuary.clj" "./prelude.clj" "./elements.clj"]

(lambda [post related-posts]
   [(article'
       (maybe {} (singleton :id) (value :article-id post))
       (join [[(header
                  [(h1 (:title post))
                   (time {:datetime (.toFormat "yyyy-MM-dd'T'HH:mm:ssZZ" (:datetime post)) :pubdate "pubdate"}
                      (.toFormat "d MMMM y" (:datetime post)))])]
              (:body post)
              [(footer' {:class "metadata"}
                  (join [[(ul (li' {:class "shorturl"} (a "http://dċd.ws/14/" "Short URL")))]
                         (array []
                                (lambda [head tail]
                                   [(h4 "This post has the following tags:")
                                    (ol (map (lambda [tag] (li (a (++ ["/tag/" tag "/"]) tag)))
                                             (prepend head tail)))])
                                (:tags post))]))]
              (array []
                     (lambda [head tail]
                        [(h3' {:id "related"} "Possibly related posts")
                         (ul (map (lambda [post] (li (a (++ ["/" (:slug post) "/"]) (:title post))))
                                  (.slice 0 5 (prepend head tail))))])
                     related-posts)]))]))
