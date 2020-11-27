(import* ["./base.js" "./node.js" "./sanctuary.clj" "./prelude.clj"]

(let [basename (curry-2 ("basename" (import "path")))
      DateTime ("DateTime" (import "luxon"))

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
                      (map (map (map-left string->symbol)))
                      (map from-pairs)
                      (map (lambda [metadata]
                              (maybe metadata
                                     (lambda [tags] (insert :tags (split-on ", " tags) metadata))
                                     (value :tags metadata))))
                      (map (lambda [metadata]
                              (from-maybe metadata
                                          (lift3 (lambda [date time zone]
                                                    (insert :datetime
                                                            (invoke "fromFormat"
                                                                    [(join-with "" [date ", " (join-with " " (split-on-regex (regex "g" "(?=[ap]m)") time)) " (" zone ")"])
                                                                     "d MMMM y, t (z)"
                                                                     {"setZone" true}]
                                                                    DateTime)
                                                            metadata))
                                                 (value :date metadata)
                                                 (value :time metadata)
                                                 (value :zone metadata)))))])]

   (lambda [filename text]
      (map (lambda [groups]
              (maybe I
                     concat
                     (metadata (0 groups))
                     {:title   (1 groups)
                      :body    (2 groups)
                      :slug    (invoke "replace"
                                       [(regex "" "^[^=]+=") ""]
                                       (basename filename ".text"))}))
           (chain (sequence Maybe)
                  (map (prop "groups")
                       (match (regex "" "([^]*)\\n# (.*)\\n\\n([^]*)") text)))))))
