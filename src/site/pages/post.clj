(import* [:base :node :path :sanctuary :prelude]

(let [base-template (import "../base-template")
      render-document (import "../render-document")
      render-icon (import "../render-icon")
      render-post (import "../render-post")

      make-post
        (lambda [filename]
           (insert :slug
                   (basename ".js" filename)
                   (import filename)))]

   (lambda [relative-filenames relative-filename]
      (let [relative->absolute (lambda [filename] (resolve [__dirname ".." ".." ".." filename]))
            absolute-filenames (map relative->absolute relative-filenames)
            absolute-filename (relative->absolute relative-filename)
            posts (map make-post absolute-filenames)
            json-filename (resolve [(dirname absolute-filename)
                                    "related"
                                    (concat (basename ".js" absolute-filename) ".json")])
            related-posts (import json-filename)
            this-post (make-post absolute-filename)
            main (render-post this-post related-posts)]
         (render-document "  " [(base-template (:title this-post) main)])))))
