(import* [:sanctuary]

(let [import-post (import "../import-post")
      base-template (import "../base-template")
      render-document (import "../render-document")
      render-archives (import "../render-archives")]

   (lambda [filenames]
      (let [posts (map import-post filenames)
            archives (render-archives posts)
            main [(base-template "Archives" archives)]]
         (render-document "  " main)))))
