(let [

fs              (require "node:fs")
path            (require "node:path")

_               (require "../require-extension.js")
base-template   (require "../base-template.clj")
generate-css    (require "../generate-css.clj")
masthead        (require "../masthead.clj")
related-posts   (require "../related-posts.clj")
render-archives (require "../render-archives.clj")
render-fragment (require "../render-fragment.clj")
render-page     (require "../render-page.clj")
render-post     (require "../render-post.clj")
render-svg      (require "../render-svg.clj")
render-tags     (require "../render-tags.clj")
s               (require "../sanctuary.clj")
icon:about      (require "../icons/nav/about.clj")
icon:archives   (require "../icons/nav/archives.clj")
icon:bitbucket  (require "../icons/nav/bitbucket.clj")
icon:contact    (require "../icons/nav/contact.clj")
icon:flushcache (require "../icons/nav/flushcache.clj")
icon:tags       (require "../icons/nav/tags.clj")
icon:twitter    (require "../icons/nav/twitter.clj")

pages (s/map (lambda [name] (require (s/join-with "/" [".." "pages" name])))
             (fs.readdirSync (apply path.join [__dirname ".." "pages"])))

posts (s/map (lambda [name] (require (s/join-with "/" [".." "posts" name])))
             (fs.readdirSync (apply path.join [__dirname ".." "posts"])))

public (s/compose (apply path.join)
                  (s/concat [__dirname ".." "public"]))

write-file (lambda [filename text] (apply fs.writeFileSync [filename text]))

_ (write-file (public ["css" "screen.css"])
              generate-css)

_ (write-file (public ["images" "masthead.svg"])
              (:fill masthead))

_ (write-file (public ["images" "masthead-mask.svg"])
              (:mask masthead))

_ (write-file (public ["images" "nav" "icon" "about.svg"])
              (render-svg icon:about))

_ (write-file (public ["images" "nav" "icon" "archives.svg"])
              (render-svg icon:archives))

_ (write-file (public ["images" "nav" "icon" "bitbucket.svg"])
              (render-svg icon:bitbucket))

_ (write-file (public ["images" "nav" "icon" "contact.svg"])
              (render-svg icon:contact))

_ (write-file (public ["images" "nav" "icon" "flushcache.svg"])
              (render-svg icon:flushcache))

_ (write-file (public ["images" "nav" "icon" "tags.svg"])
              (render-svg icon:tags))

_ (write-file (public ["images" "nav" "icon" "twitter.svg"])
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

_ (s/map (lambda [page]
            (write-file (public [(s/concat (:slug page) ".html")])
                        (render-document (base-template (:title page)
                                                        (render-page page)))))
         pages)

_ (s/map (lambda [post]
            (write-file (public [(s/concat (:slug post) ".html")])
                        (render-document (base-template (:title post)
                                                        (render-post post
                                                                     (related-posts posts post))))))
         posts)

] 0)
