(import* ["./node.js" "./fs.clj" "./path.clj" "./sanctuary.clj" "./prelude.clj"]

(let [Future (import "fluture")
      fork ("fork" Future)
      base-env (import "./base.js")
      base-template (import "./base-template.clj")
      render-document (import "./render-document.clj")
      render-archives (import "./render-archives.clj")
      render-tags (import "./render-tags.clj")
      render-icon (import "./render-icon.clj")
      render-post (import "./render-post.clj")

      posts (map (map-maybe (lambda [filename]
                               (map (lambda [slug]
                                       (insert :slug
                                               (.replace (regex "" "^[^=]+=") "" slug)
                                               (import base-env (resolve ["posts" filename]))))
                                    (strip-suffix ".clj" (basename "" filename)))))
                 (read-dir (resolve [__dirname ".." "posts"])))

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
           (write-file (resolve [__dirname ".." "public" (concat slug ".html")])
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
                  (prepend (write-file (resolve [__dirname ".." "public" "icons" "nav" "twitter.svg"])
                                       (import "./icons/nav/twitter.clj"))
                           (map (lambda [slug]
                                   (write-file (resolve [__dirname ".." "public" "icons" "nav" (concat slug ".svg")])
                                               (render-icon (import (++ ["./icons/nav/" slug ".clj"])))))
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
