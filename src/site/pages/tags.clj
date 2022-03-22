(let [sanctuary (import "sanctuary")

      base-template (import "../base-template")
      import-post (import "../import-post")
      kebab-case-keys (import "../kebab-case-keys")
      render-document (import "../render-document")
      render-tags (import "../render-tags")

      s (kebab-case-keys sanctuary)]

   (lambda [filenames]
      (let [posts (s/map import-post filenames)
            tags (render-tags posts)
            main [(base-template "Tags" tags)]]
         (render-document "  " main))))
