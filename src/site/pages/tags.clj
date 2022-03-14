(import* [:sanctuary]

(let [import-post (import "../import-post")
      base-template (import "../base-template")
      render-document (import "../render-document")
      render-tags (import "../render-tags")]

   (lambda [filenames]
      (let [posts (map import-post filenames)
            tags (render-tags posts)
            main [(base-template "Tags" tags)]]
         (render-document "  " main)))))
