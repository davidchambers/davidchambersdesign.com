(let [

fs              (require "node:fs")
path            (require "node:path")

base-template   (require "../base-template.clj")
e               (require "../elements.clj")
generate-css    (require "../generate-css.clj")
masthead        (require "../masthead.clj")
related-posts   (require "../related-posts.clj")
render-archives (require "../render-archives.clj")
render-fragment (require "../render-fragment.clj")
render-page     (require "../render-page.clj")
render-post     (require "../render-post.clj")
render-tags     (require "../render-tags.clj")
s               (require "../sanctuary.clj")
icon:about      (require "../icons/about.clj")
icon:archives   (require "../icons/archives.clj")
icon:bitbucket  (require "../icons/bitbucket.clj")
icon:contact    (require "../icons/contact.clj")
icon:flushcache (require "../icons/flushcache.clj")
icon:tags       (require "../icons/tags.clj")
icon:twitter    (require "../icons/twitter.clj")
dates           (require "../icons/dates.clj")

pages (s/map (lambda [name] (require (s/join-with "/" [".." "pages" name])))
             (fs.readdirSync (.apply null [__dirname ".." "pages"] path.join)))

posts (s/map (lambda [name] (require (s/join-with "/" [".." "posts" name])))
             (fs.readdirSync (.apply null [__dirname ".." "posts"] path.join)))

public (s/compose (.apply null _ path.join)
                  (s/concat [__dirname ".." "public"]))

write-file (lambda [filename text] (.apply null [filename text] fs.writeFileSync))

_ (write-file (public ["css" "screen.css"])
              generate-css)

render-svg
  (lambda [attrs]
     (s/pipe [(e/svg (.apply null [{:xmlns "http://www.w3.org/2000/svg" :version "1.1"} attrs] Object.assign))
              (s/of Array)
              (render-fragment "  " 0 false)
              (s/concat "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n")
              (s/concat "<?xml version=\"1.0\" standalone=\"no\"?>\n")]))

_ (write-file (public ["svg" "masthead.svg"])
              (render-svg {} (:fill masthead)))

_ (write-file (public ["svg" "masthead-mask.svg"])
              (render-svg {} (:mask masthead)))

_ (write-file (public ["svg" "about.svg"])
              (render-svg {:width 16 :height 16} icon:about))

_ (write-file (public ["svg" "archives.svg"])
              (render-svg {:width 16 :height 16} icon:archives))

_ (write-file (public ["svg" "bitbucket.svg"])
              (render-svg {:width 16 :height 16} icon:bitbucket))

_ (write-file (public ["svg" "dates-0.svg"])
              (render-svg {} (0 dates)))

_ (write-file (public ["svg" "dates-1.svg"])
              (render-svg {} (1 dates)))

_ (write-file (public ["svg" "dates-2.svg"])
              (render-svg {} (2 dates)))

_ (write-file (public ["svg" "dates-3.svg"])
              (render-svg {} (3 dates)))

_ (write-file (public ["svg" "dates-4.svg"])
              (render-svg {} (4 dates)))

_ (write-file (public ["svg" "dates-5.svg"])
              (render-svg {} (5 dates)))

_ (write-file (public ["svg" "dates-6.svg"])
              (render-svg {} (6 dates)))

_ (write-file (public ["svg" "dates-7.svg"])
              (render-svg {} (7 dates)))

_ (write-file (public ["svg" "dates-8.svg"])
              (render-svg {} (8 dates)))

_ (write-file (public ["svg" "dates-9.svg"])
              (render-svg {} (9 dates)))

_ (write-file (public ["svg" "contact.svg"])
              (render-svg {:width 16 :height 16} icon:contact))

_ (write-file (public ["svg" "flushcache.svg"])
              (render-svg {:width 16 :height 16} icon:flushcache))

_ (write-file (public ["svg" "tags.svg"])
              (render-svg {:width 16 :height 16} icon:tags))

_ (write-file (public ["svg" "twitter.svg"])
              (render-svg {:width 16 :height 16} icon:twitter))

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
