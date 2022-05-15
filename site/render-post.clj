(import ["./elements"]

(let [s (require "./sanctuary")
      tags (require "./tags")]

   (post related-posts ->
      [(article'
          (s/maybe {} (s/singleton :id) (s/value :article-id post))
          (s/join [[(header
                       [(h1 (:title post))
                        (time {:datetime (.toFormat "yyyy-MM-dd'T'HH:mm:ssZZ" (:datetime post)) :pubdate "pubdate"}
                           (.toFormat "d MMMM y" (:datetime post)))])]
                   (:body post)
                   [(footer' {:class "metadata"}
                       (s/join [[(ul (li' {:class "shorturl"} (a (.join "" ["http://dċd.ws/" (:id post) "/"]) "Short URL")))]
                                (s/array []
                                         (head tail ->
                                            [(h4 "This post has the following tags:")
                                             (ol (s/map (tag -> (li (a (.join "" ["/tag/" (Symbol.keyFor tag) "/"]) (s/prop tag tags))))
                                                        (s/prepend head tail)))])
                                         (:tags post))]))]
                   (s/array []
                            (_ _ ->
                               [(h3' {:id "related"} "Possibly related posts")
                                (ul (s/map (related-post ->
                                              (li (a (.join "" ["/" (:slug related-post) "/"]) (:title related-post))))
                                           related-posts))])
                            related-posts)]))])))