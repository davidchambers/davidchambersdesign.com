(import* [:base]

(let [path (import "path")

      sanctuary (import "sanctuary")

      base-template (import "../base-template")
      kebab-case-keys (import "../kebab-case-keys")
      render-document (import "../render-document")
      render-icon (import "../render-icon")
      render-post (import "../render-post")

      s (kebab-case-keys sanctuary)

      make-post
        (lambda [filename]
           (apply Object/assign
                  [{}
                   (import filename)
                   (Object/fromEntries [[:slug (apply path/basename [filename ".js"])]])]))]

   (lambda [relative-filenames relative-filename]
      (let [relative->absolute (lambda [filename] (apply path/resolve [__dirname ".." ".." ".." filename]))
            absolute-filenames (s/map relative->absolute relative-filenames)
            absolute-filename (relative->absolute relative-filename)
            posts (s/map make-post absolute-filenames)
            json-filename (apply path/resolve
                                 [(path/dirname absolute-filename)
                                  "related"
                                  (s/concat (apply path/basename [absolute-filename ".js"]) ".json")])
            related-posts (import json-filename)
            this-post (make-post absolute-filename)
            main (render-post this-post related-posts)]
         (render-document "  " [(base-template (:title this-post) main)])))))
