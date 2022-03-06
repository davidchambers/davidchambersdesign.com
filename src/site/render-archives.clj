(import* [:base :sanctuary :prelude "./elements"]

(pipe [(map (join Pair))
       (map (map-left (prop :datetime)))
       (sort-by (compose (compose negate Number) fst))
       (map (map-left (lambda [datetime] (.toFormat "MMMM y" datetime))))
       (group-by (on equals fst))
       (chain (array [] (lambda [head tail] [{:heading (fst head) :posts (map snd (prepend head tail))}])))
       (lambda [sections]
          [(h1 "Archives")
           (ol' {:class "archives"}
              (map (lambda [section]
                      (li
                         [(h2 (:heading section))
                          (ol
                             (map (lambda [post]
                                     (li
                                        [(a' {:href (concat "/" (:slug post))} (:title post))
                                         " "
                                         (let [datetime (:datetime post)]
                                            (time {:datetime (.toISO datetime)}
                                               (concat (.toFormat "d MMMM y | h:mm" datetime)
                                                       (to-lower (.toFormat "a" datetime)))))]))
                                  (:posts section)))]))
                   sections))])]))
