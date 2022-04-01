(import* ["./elements"]

(let [luxon (require "./luxon")
      s (require "./sanctuary")

      render-section
        (lambda [section]
           (li
              [(h2 (:heading section))
               (ol
                  (s.map (lambda [post]
                            (li
                               [(a' {:href (s.concat "/" (:slug post))} (:title post))
                                " "
                                (time {:datetime (luxon.to-iso (:datetime post))}
                                   (s.concat (luxon.to-format "d MMMM y | h:mm" (:datetime post))
                                             (s.to-lower (luxon.to-format "a" (:datetime post)))))]))
                         (:posts section)))]))]

   (s.pipe [(s.map (s.join s.Pair))
            (s.map (s.map-left (s.prop :datetime)))
            (s.sort-by (s.compose (s.compose s.negate Number) s.fst))
            (s.map (s.map-left (luxon.to-format "MMMM y")))
            (s.group-by (s.on s.equals s.fst))
            (s.chain (s.array [] (lambda [head tail] [{:heading (s.fst head) :posts (s.map s.snd (s.prepend head tail))}])))
            (s.map render-section)
            (ol' {:class "archives"})
            (s.concat [(h1 "Archives")])])))
