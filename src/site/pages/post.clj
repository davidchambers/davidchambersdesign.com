(let [path (require "node:path")

      sanctuary (require "sanctuary")

      base-template (require "../base-template")
      kebab-case-keys (require "../kebab-case-keys")
      render-document (require "../render-document")
      render-icon (require "../render-icon")
      render-post (require "../render-post")

      s (kebab-case-keys sanctuary)

      make-post
        (lambda [filename]
           (apply Object/assign
                  [{}
                   (require filename)
                   (Object/fromEntries [[:slug (apply path/basename [filename ".js"])]])]))]

   (lambda [relative-filenames relative-filename]
      (let [relative->absolute (lambda [filename] (apply path/join [__dirname ".." ".." ".." filename]))
            absolute-filenames (s/map relative->absolute relative-filenames)
            absolute-filename (relative->absolute relative-filename)
            posts (s/map make-post absolute-filenames)
            json-filename (apply path/join
                                 [(path/dirname absolute-filename)
                                  "related"
                                  (s/concat (apply path/basename [absolute-filename ".js"]) ".json")])
            related-posts (require json-filename)
            this-post (make-post absolute-filename)
            main (render-post this-post related-posts)]
         (render-document "  " [(base-template (:title this-post) main)]))))
