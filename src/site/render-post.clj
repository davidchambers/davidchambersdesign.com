(import* [:base :path :sanctuary :prelude "./elements"]

(let [tags (import "./tags")]

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
                                       (ol (map (lambda [tag] (li (a (++ ["/tag/" (symbol->string tag) "/"]) (prop tag tags))))
                                                (prepend head tail)))])
                                   (:tags post))]))]
                 (array []
                        (lambda [_ _]
                           [(h3' {:id "related"} "Possibly related posts")
                            (ul (map (lambda [slug]
                                        (let [related-post (import (resolve [__dirname "posts" slug]))]
                                           (li (a (++ ["/" slug "/"]) (:title related-post)))))
                                     related-posts))])
                        related-posts)]))])))
