(import ["./elements"]

(let [s (require "./sanctuary")

      render-section
        (section ->
           (li
              [(h2 (:heading section))
               (ol
                  (s/map (post ->
                            (li
                               [(a' {:href (s/concat "/" (:slug post))} (:title post))
                                " "
                                (time {:datetime (.toISO (:datetime post))}
                                   (s/concat (.toFormat "d MMMM y | h:mm" (:datetime post))
                                             (s/to-lower (.toFormat "a" (:datetime post)))))]))
                         (:posts section)))]))]

   (s/pipe [(s/map (s/join s/Pair))
            (s/map (s/map-left (s/prop :datetime)))
            (s/sort-by (s/compose (s/compose s/negate Number) s/fst))
            (s/map (s/map-left (.toFormat "MMMM y" _)))
            (s/group-by (s/on s/equals s/fst))
            (s/chain (s/array [] (head tail -> [{:heading (s/fst head) :posts (s/map s/snd (s/prepend head tail))}])))
            (s/map render-section)
            (ol' {:class "archives"})
            (s/concat [(h1 "Archives")])])))