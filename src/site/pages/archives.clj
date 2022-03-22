(let [sanctuary (require "sanctuary")

      base-template (require "../base-template")
      import-post (require "../import-post")
      kebab-case-keys (require "../kebab-case-keys")
      render-document (require "../render-document")
      render-archives (require "../render-archives")

      s (kebab-case-keys sanctuary)]

   (lambda [filenames]
      (let [posts (s/map import-post filenames)
            archives (render-archives posts)
            main [(base-template "Archives" archives)]]
         (render-document "  " main))))
