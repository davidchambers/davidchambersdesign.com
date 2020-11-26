(import* ["./base.js" "./node.js" "./sanctuary.clj"]

(let [fs          (import "fs")
      path        (import "path")

      Future      (import "fluture")
      luxon       (import "luxon")

      render      (import "./render.clj")
      archives    (import "./templates/archives.clj")

      fork        ("fork" Future)
      node        ("node" Future)
      reject      ("reject" Future)
      resolve     ("resolve" Future)

      DateTime    ("DateTime" luxon)

      read-file (lambda [filename]
                   (node (lambda [done]
                            (invoke "readFile"
                                    [filename {"encoding" "utf8"} done]
                                    fs))))

      to-format (lambda [format datetime] (invoke "toFormat" [format] datetime))

      title (pipe [lines (map (strip-prefix "# ")) justs head])

      metadata (pipe [lines
                      (reduce (lambda [pairs line]
                                 (chain (maybe Left
                                               (lambda [m pairs]
                                                  (Right (append (Pair ("value" (0 ("groups" m)))
                                                                       ("value" (1 ("groups" m))))
                                                                 pairs)))
                                               (match (regex "" "^([^:]*): (.*)$") line))
                                        pairs))
                              (Right []))
                      (either Just (K Nothing))
                      (map from-pairs)
                      (map (lambda [metadata]
                              (maybe metadata
                                     (lambda [tags] (insert "tags" (split-on ", " tags) metadata))
                                     (value "tags" metadata))))
                      (map (lambda [metadata]
                              (from-maybe metadata
                                          (lift3 (lambda [date time zone]
                                                    (insert "datetime"
                                                            (invoke "fromFormat"
                                                                    [(join-with "" [date ", " (join-with " " (split-on-regex (regex "g" "(?=[ap]m)") time)) " (" zone ")"])
                                                                     "d MMMM y, t (z)"
                                                                     {"setZone" true}]
                                                                    DateTime)
                                                            metadata))
                                                 (value "date" metadata)
                                                 (value "time" metadata)
                                                 (value "zone" metadata)))))])

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
