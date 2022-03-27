(let [path (require "node:path")

      sanctuary (require "sanctuary")

      kebab-case-keys (require "./kebab-case-keys")

      s (kebab-case-keys sanctuary)

      intersection
        (lambda [set-1 set-2]
           (new Set [(invoke-1 "filter"
                               (lambda [x] (invoke-1 "has" x set-1))
                               (Array/from set-2))]))

      union
        (lambda [set-1 set-2]
           (new Set [(s/concat (Array/from set-1) (Array/from set-2))]))

      similarity
        (lambda [set-1 set-2]
           (/ (Math/sqrt ("size" (union set-1 set-2)))
              ("size" (intersection set-1 set-2))))

      seconds-between
        (lambda [from to]
           ("seconds" (invoke-2 "diff" from "seconds" to)))

      with-scores
        (lambda [that this]
           (let [score (similarity (new Set [(:tags that)])
                                   (new Set [(:tags this)]))
                 primary (s/negate score)
                 secondary (Math/abs (seconds-between (:datetime that)
                                                      (:datetime this)))]
              (if (>= 0.5 score)
                  (s/Just (s/Pair (s/Pair primary secondary) this))
                  s/Nothing)))]

   (lambda [posts post]
      (s/pipe [(s/reject (lambda [this] (=== (:slug post) (:slug this))))
               (s/map-maybe (with-scores post))
               s/sort
               (s/map s/snd)
               (invoke-2 "slice" 0 5)]
              posts)))
