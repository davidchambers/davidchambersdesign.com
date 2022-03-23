(import* ["./elements"]

(let [sanctuary (require "sanctuary")

      kebab-case-keys (require "./kebab-case-keys")
      tags (require "./tags")

      s (kebab-case-keys sanctuary)

      ++ (s/join-with "")]

   (lambda [post related-posts]
      [(article'
          (s/maybe {} (s/singleton :id) (s/value :article-id post))
          (s/join [[(header
                       [(h1 (:title post))
                        (time {:datetime (invoke-1 "toFormat" "yyyy-MM-dd'T'HH:mm:ssZZ" (:datetime post)) :pubdate "pubdate"}
                           (invoke-1 "toFormat" "d MMMM y" (:datetime post)))])]
                   (:body post)
                   [(footer' {:class "metadata"}
                       (s/join [[(ul (li' {:class "shorturl"} (a "http://dċd.ws/14/" "Short URL")))]
                                (s/array []
                                         (lambda [head tail]
                                            [(h4 "This post has the following tags:")
                                             (ol (s/map (lambda [tag] (li (a (++ ["/tag/" (Symbol/keyFor tag) "/"]) (s/prop tag tags))))
                                                        (s/prepend head tail)))])
                                         (:tags post))]))]
                   (s/array []
                            (lambda [_ _]
                               [(h3' {:id "related"} "Possibly related posts")
                                (ul (s/map (lambda [slug]
                                              (let [related-post (require (++ ["./posts/" slug]))]
                                                 (li (a (++ ["/" slug "/"]) (:title related-post)))))
                                           related-posts))])
                            related-posts)]))])))
