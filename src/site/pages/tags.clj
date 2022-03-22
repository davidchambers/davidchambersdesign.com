(let [sanctuary (require "sanctuary")

      base-template (require "../base-template")
      import-post (require "../import-post")
      kebab-case-keys (require "../kebab-case-keys")
      render-document (require "../render-document")
      render-tags (require "../render-tags")

      s (kebab-case-keys sanctuary)]

   (lambda [filenames]
      (let [posts (s/map import-post filenames)
            tags (render-tags posts)
            main [(base-template "Tags" tags)]]
         (render-document "  " main))))
