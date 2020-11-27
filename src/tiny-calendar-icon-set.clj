(import* ["./base.js" "./node.js" "./sanctuary.clj"]

(let [Future (import "fluture")

      parse-post (import "./parse-post.clj")
      read-file (import "./read-file.clj")
      render-document (import "./render-document.clj")
      tiny-calendar-icon-set (import "./templates/tiny-calendar-icon-set.clj")

      fork ("fork" Future)
      reject ("reject" Future)
      resolve ("resolve" Future)]

   (pipe [(drop-while (complement (equals "--")))
          (drop 1)
          (chain head)
          (maybe (reject "File missing") resolve)
          (chain (lambda [filename]
                    (chain (lambda [text]
                              (maybe (reject "Failed to parse post")
                                     resolve
                                     (parse-post filename text)))
                           (read-file filename))))
          (map (lambda [post]
                  (render-document "  " [(tiny-calendar-icon-set post)])))
          (fork ("error" console)
                (lambda [html] (invoke "write" [html] ("stdout" process))))]
         ("argv" process))))
