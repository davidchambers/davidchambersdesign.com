(let [sanctuary (import "sanctuary")

      base-template (import "../base-template")
      import-post (import "../import-post")
      kebab-case-keys (import "../kebab-case-keys")
      render-document (import "../render-document")
      render-archives (import "../render-archives")

      s (kebab-case-keys sanctuary)]

   (lambda [filenames]
      (let [posts (s/map import-post filenames)
            archives (render-archives posts)
            main [(base-template "Archives" archives)]]
         (render-document "  " main))))
