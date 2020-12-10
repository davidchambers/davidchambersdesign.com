(import* ["./base.js" "./node.js" "./sanctuary.clj" "./prelude.clj" "./elements.clj"]

(let [filename $2
      filenames (.slice 4 ("argv" process))

      path (import "path")
      base-env (import "./base.js")
      base-template (import "./base-template.clj")
      render-document (import "./render-document.clj")

      post (import base-env (.resolve filename path))
      tags (new Set [(:tags post)])

      related-posts
        (pipe [(reject (equals filename))
               (map (lambda [filename]
                       (insert :slug
                               (.replace (regex "" "^[^=]+=")
                                         ""
                                         (.basename filename ".clj" path))
                               (import base-env
                                       (.resolve filename path)))))
               sort
               (map (join Pair))
               (map (map-left (lambda [post']
                                 (let [sqrt (** (/ 2 1))
                                       intersection (filter (lambda [tag] (.has tag tags))
                                                            (:tags post'))]
                                    (/ (sqrt (- (size intersection)
                                                (+ (size (:tags post))
                                                   (size (:tags post')))))
                                       (size intersection))))))
               (filter (compose (>= 0.5) fst))
               sort
               reverse
               (map snd)]
              filenames)]

   (render-document
      "  "
      [(base-template
          (:title post)
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
                            related-posts)]))])])))
