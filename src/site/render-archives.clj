(import* ["./elements"]

(let [s (require "./sanctuary")]

   (s/pipe [(s/map (s/join s/Pair))
            (s/map (s/map-left (s/prop :datetime)))
            (s/sort-by (s/compose (s/compose s/negate Number) s/fst))
            (s/map (s/map-left (invoke-1 "toFormat" "MMMM y")))
            (s/group-by (s/on s/equals s/fst))
            (s/chain (s/array [] (lambda [head tail] [{:heading (s/fst head) :posts (s/map s/snd (s/prepend head tail))}])))
            (lambda [sections]
               [(h1 "Archives")
                (ol' {:class "archives"}
                   (s/map (lambda [section]
                             (li
                                [(h2 (:heading section))
                                 (ol
                                    (s/map (lambda [post]
                                              (li
                                                 [(a' {:href (s/concat "/" (:slug post))} (:title post))
                                                  " "
                                                  (let [datetime (:datetime post)]
                                                     (time {:datetime (invoke-0 "toISO" datetime)}
                                                        (s/concat (invoke-1 "toFormat" "d MMMM y | h:mm" datetime)
                                                                  (s/to-lower (invoke-1 "toFormat" "a" datetime)))))]))
                                           (:posts section)))]))
                          sections))])])))
