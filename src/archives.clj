(import* ["./base.js" "./node.js" "./sanctuary.clj"]

(let [Future      (import "fluture")
      luxon       (import "luxon")

      parse-post  (import "./parse-post.clj")
      read-file   (import "./read-file.clj")
      render-document (import "./render-document.clj")
      archives    (import "./templates/archives.clj")

      fork        ("fork" Future)
      reject      ("reject" Future)
      resolve     ("resolve" Future)

      to-format (lambda [format datetime] (invoke "toFormat" [format] datetime))]

   (pipe [(drop-while (complement (equals "--")))
          (drop 1)
          (from-maybe [])
          (map (join Pair))
          (traverse Future (traverse Future read-file))
          (map (traverse Maybe (pair parse-post)))
          (chain (maybe (reject "Post parsing failed") resolve))
          (map (sort-by (lambda [post] (Number (:datetime post)))))
          (map (group-by (on equals (lambda [post] (to-format "y-MM" (:datetime post))))))
          (map (map (lambda [posts]
                       {:heading (to-format "MMMM y" (:datetime (0 posts)))
                        :posts posts})))
          (map (lambda [sections] (render-document "  " [(archives sections)])))
          (fork ("error" console)
                (lambda [html] (invoke "write" [html] ("stdout" process))))]
         ("argv" process))))
