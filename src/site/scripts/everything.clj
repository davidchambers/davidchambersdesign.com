(let [

fs              (require "node:fs")
path            (require "node:path")

_               (require "../require-extension.js")
base-template   (require "../base-template.clj")
generate-css    (require "../generate-css.clj")
related-posts   (require "../related-posts.clj")
render-archives (require "../render-archives.clj")
render-fragment (require "../render-fragment.clj")
render-icon     (require "../render-icon.clj")
render-post     (require "../render-post.clj")
render-tags     (require "../render-tags.clj")
s               (require "../sanctuary.clj")
icon:about      (require "../icons/nav/about.clj")
icon:archives   (require "../icons/nav/archives.clj")
icon:bitbucket  (require "../icons/nav/bitbucket.clj")
icon:contact    (require "../icons/nav/contact.clj")
icon:flushcache (require "../icons/nav/flushcache.clj")
icon:tags       (require "../icons/nav/tags.clj")
icon:twitter    (require "../icons/nav/twitter.clj")

posts (s/map (lambda [name] (require (s/join-with "/" [".." "posts" name])))
             (s/filter (invoke-1 "endsWith" ".clj")
                       (fs/readdirSync (apply path/join [__dirname ".." "posts"]))))

public (s/compose (apply path/join)
                  (s/concat [__dirname ".." "public"]))

write-file (lambda [filename text] (apply fs/writeFileSync [filename text]))

_ (write-file (public ["css" "screen.css"])
              generate-css)

_ (write-file (public ["icons" "nav" "about.svg"])
              (render-icon icon:about))

_ (write-file (public ["icons" "nav" "archives.svg"])
              (render-icon icon:archives))

_ (write-file (public ["icons" "nav" "bitbucket.svg"])
              (render-icon icon:bitbucket))

_ (write-file (public ["icons" "nav" "contact.svg"])
              (render-icon icon:contact))

_ (write-file (public ["icons" "nav" "flushcache.svg"])
              (render-icon icon:flushcache))

_ (write-file (public ["icons" "nav" "tags.svg"])
              (render-icon icon:tags))

_ (write-file (public ["icons" "nav" "twitter.svg"])
              icon:twitter)

render-document (s/pipe [(s/of Array)
                         (render-fragment "  " 0 false)
                         (s/concat "<!DOCTYPE html>\n")])

_ (write-file (public ["archives.html"])
              (render-document (base-template "Archives"
                                              (render-archives posts))))

_ (write-file (public ["tags.html"])
              (render-document (base-template "Tags"
                                              (render-tags posts))))

_ (s/map (lambda [post]
            (write-file (public [(s/concat (:slug post) ".html")])
                        (render-document (base-template (:title post)
                                                        (render-post post
                                                                     (related-posts posts post))))))
         posts)

] 0)
