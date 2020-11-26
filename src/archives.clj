(import* ["./base.js" "./node.js" "./sanctuary.clj"]

(let [fs          (import "fs")
      path        (import "path")

      Future      (import "fluture")

      metadata    (import "./metadata.clj")
      render      (import "./render.clj")
      archives    (import "./templates/archives.clj")

      fork        ("fork" Future)
      node        ("node" Future)
      reject      ("reject" Future)
      resolve     ("resolve" Future)

      read-file (lambda [filename]
                   (node (lambda [done]
                            (invoke "readFile"
                                    [filename {"encoding" "utf8"} done]
                                    fs))))

      to-format (lambda [format datetime] (invoke "toFormat" [format] datetime))

      title (pipe [lines (map (strip-prefix "# ")) justs head])

      parse-post (lambda [filename text]
                    (map (insert "slug"
                                 (invoke "replace"
                                         [(regex "" "^[^=]+=") ""]
                                         (invoke "basename" [filename ".text"] path)))
                         (lift2 (insert "title")
                                (title text)
                                (metadata text))))]

   (pipe [(drop-while (complement (equals "--")))
          (drop 1)
          (from-maybe [])
          (map (join Pair))
          (traverse Future (traverse Future read-file))
          (map (traverse Maybe (pair parse-post)))
          (chain (maybe (reject "Post parsing failed") resolve))
          (map (sort-by (compose Number (prop "datetime"))))
          (map (group-by (on equals (compose (to-format "y-MM") (prop "datetime")))))
          (map (map (lambda [posts]
                       {:heading (to-format "MMMM y" ("datetime" (0 posts)))
                        :posts (map (lambda [post]
                                       {:slug ("slug" post)
                                        :title ("title" post)
                                        :datetime ("datetime" post)})
                                    posts)})))
          (map (lambda [sections] (render "    " 0 false [(archives sections)])))
          (fork ("error" console)
                (lambda [html] (invoke "write" [html] ("stdout" process))))]
         ("argv" process))))
