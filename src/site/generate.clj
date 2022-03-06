(import* [:base :node :fs :path :sanctuary :prelude]

(let [Future (import "fluture")
      fork (#fork Future)
      base-env (import :base)
      base-template (import "./base-template")
      render-document (import "./render-document")
      render-archives (import "./render-archives")
      render-tags (import "./render-tags")
      render-icon (import "./render-icon")
      render-post (import "./render-post")

      posts (map (map-maybe (lambda [filename]
                               (map (lambda [slug]
                                       (insert :slug
                                               (.replace (regex "" "^[^=]+=") "" slug)
                                               (import (resolve [__dirname "posts" filename]))))
                                    (strip-suffix ".js" (basename "" filename)))))
                 (read-dir (resolve [__dirname "posts"])))

      related-posts
        (lambda [post]
           (pipe [(reject (lambda [post'] (equals (:slug post) (:slug post'))))
                  (map (join Pair))
                  (map (map-left (lambda [post']
                                    (let [sqrt (** (/ 2 1))
                                          intersection (filter (lambda [tag] (.includes tag (:tags post)))
                                                               (:tags post'))]
                                       (/ (sqrt (- (size intersection)
                                                   (+ (size (:tags post))
                                                      (size (:tags post')))))
                                          (size intersection))))))
                  (filter (compose (>= 0.5) fst))
                  sort
                  reverse
                  (map snd)]))

      save-file
        (lambda [slug title main]
           (write-file (resolve [__dirname ".." ".." "public" (concat slug ".html")])
                       (render-document "  " [(base-template title main)])))

      save-archives
        (chain (save-file "archives" "Archives")
               (map render-archives posts))

      save-tags
        (chain (save-file "tags" "Tags")
               (map render-tags posts))

      save-posts
        (chain (lambda [posts]
                  (traverse Future
                            (lambda [post]
                               (save-file (:slug post)
                                          (:title post)
                                          (render-post post (related-posts post posts))))
                            posts))
               posts)

      save-icons
        (sequence Future
                  (prepend (write-file (resolve [__dirname ".." ".." "public" "icons" "nav" "twitter.svg"])
                                       (import "./icons/nav/twitter"))
                           (map (lambda [slug]
                                   (write-file (resolve [__dirname ".." ".." "public" "icons" "nav" (concat slug ".svg")])
                                               (render-icon (import (concat "./icons/nav/" slug)))))
                                ["about" "archives" "bitbucket" "contact" "flushcache" "tags"])))

      save-all (lift-2 prepend
                       save-archives
                       (lift-2 prepend
                               save-tags
                               (lift-2 concat
                                       save-posts
                                       save-icons)))]

   (fork (lambda [error] (.error error console))
         (lambda [array] (.log "Saved" (size array) "files" console))
         save-all)))
