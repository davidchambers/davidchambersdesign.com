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
icon:about      (require "../icons/nav/about.clj")
icon:archives   (require "../icons/nav/archives.clj")
icon:bitbucket  (require "../icons/nav/bitbucket.clj")
icon:contact    (require "../icons/nav/contact.clj")
icon:flushcache (require "../icons/nav/flushcache.clj")
icon:tags       (require "../icons/nav/tags.clj")
icon:twitter    (require "../icons/nav/twitter.clj")
dates           (require "../icons/nav/dates.clj")

pages (s/map (lambda [name] (require (s/join-with "/" [".." "pages" name])))
             (fs.readdirSync (apply path.join [__dirname ".." "pages"])))

posts (s/map (lambda [name] (require (s/join-with "/" [".." "posts" name])))
             (fs.readdirSync (apply path.join [__dirname ".." "posts"])))

public (s/compose (apply path.join)
                  (s/concat [__dirname ".." "public"]))

write-file (lambda [filename text] (apply fs.writeFileSync [filename text]))

_ (write-file (public ["css" "screen.css"])
              generate-css)

render-svg
  (lambda [attrs]
     (s/pipe [(e/svg (apply Object.assign [{:xmlns "http://www.w3.org/2000/svg" :version "1.1"} attrs]))
              (s/of Array)
              (render-fragment "  " 0 false)
              (s/concat "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n")
              (s/concat "<?xml version=\"1.0\" standalone=\"no\"?>\n")]))

_ (write-file (public ["images" "masthead.svg"])
              (render-svg {} (:fill masthead)))

_ (write-file (public ["images" "masthead-mask.svg"])
              (render-svg {} (:mask masthead)))

_ (write-file (public ["images" "nav" "icon" "about.svg"])
              (render-svg {:width 16 :height 16} icon:about))

_ (write-file (public ["images" "nav" "icon" "archives.svg"])
              (render-svg {:width 16 :height 16} icon:archives))

_ (write-file (public ["images" "nav" "icon" "bitbucket.svg"])
              (render-svg {:width 16 :height 16} icon:bitbucket))

_ (write-file (public ["images" "nav" "icon" "dates-1.svg"])
              (render-svg {:width 16 :height 16} (1 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-2.svg"])
              (render-svg {:width 16 :height 16} (2 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-3.svg"])
              (render-svg {:width 16 :height 16} (3 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-4.svg"])
              (render-svg {:width 16 :height 16} (4 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-5.svg"])
              (render-svg {:width 16 :height 16} (5 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-6.svg"])
              (render-svg {:width 16 :height 16} (6 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-7.svg"])
              (render-svg {:width 16 :height 16} (7 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-8.svg"])
              (render-svg {:width 16 :height 16} (8 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-9.svg"])
              (render-svg {:width 16 :height 16} (9 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-10.svg"])
              (render-svg {:width 16 :height 16} (10 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-11.svg"])
              (render-svg {:width 16 :height 16} (11 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-12.svg"])
              (render-svg {:width 16 :height 16} (12 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-13.svg"])
              (render-svg {:width 16 :height 16} (13 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-14.svg"])
              (render-svg {:width 16 :height 16} (14 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-15.svg"])
              (render-svg {:width 16 :height 16} (15 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-16.svg"])
              (render-svg {:width 16 :height 16} (16 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-17.svg"])
              (render-svg {:width 16 :height 16} (17 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-18.svg"])
              (render-svg {:width 16 :height 16} (18 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-19.svg"])
              (render-svg {:width 16 :height 16} (19 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-20.svg"])
              (render-svg {:width 16 :height 16} (20 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-21.svg"])
              (render-svg {:width 16 :height 16} (21 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-22.svg"])
              (render-svg {:width 16 :height 16} (22 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-23.svg"])
              (render-svg {:width 16 :height 16} (23 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-24.svg"])
              (render-svg {:width 16 :height 16} (24 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-25.svg"])
              (render-svg {:width 16 :height 16} (25 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-26.svg"])
              (render-svg {:width 16 :height 16} (26 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-27.svg"])
              (render-svg {:width 16 :height 16} (27 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-28.svg"])
              (render-svg {:width 16 :height 16} (28 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-29.svg"])
              (render-svg {:width 16 :height 16} (29 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-30.svg"])
              (render-svg {:width 16 :height 16} (30 dates)))

_ (write-file (public ["images" "nav" "icon" "dates-31.svg"])
              (render-svg {:width 16 :height 16} (31 dates)))

_ (write-file (public ["images" "nav" "icon" "contact.svg"])
              (render-svg {:width 16 :height 16} icon:contact))

_ (write-file (public ["images" "nav" "icon" "flushcache.svg"])
              (render-svg {:width 16 :height 16} icon:flushcache))

_ (write-file (public ["images" "nav" "icon" "tags.svg"])
              (render-svg {:width 16 :height 16} icon:tags))

_ (write-file (public ["images" "nav" "icon" "twitter.svg"])
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
