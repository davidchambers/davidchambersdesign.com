(let [path (require "node:path")

      s (require "./sanctuary")

      intersection
        (lambda [set-1 set-2]
           (new Set (.filter (.has _ set-1) (Array.from set-2))))

      union
        (lambda [set-1 set-2]
           (new Set (s/concat (Array.from set-1) (Array.from set-2))))

      similarity
        (lambda [set-1 set-2]
           (/ (Math.sqrt ("size" (union set-1 set-2)))
              ("size" (intersection set-1 set-2))))

      seconds-between
        (lambda [from to]
           ("seconds" (.diff from "seconds" to)))

      with-scores
        (lambda [that this]
           (let [score (similarity (new Set (:tags that))
                                   (new Set (:tags this)))
                 primary (s/negate score)
                 secondary (Math.abs (seconds-between (:datetime that)
                                                      (:datetime this)))]
              (if (>= 0.5 score)
                  (s/Just (s/Pair (s/Pair primary secondary) this))
                  s/Nothing)))]

   (lambda [posts post]
      (s/pipe [(s/reject (lambda [this] (=== (:slug post) (:slug this))))
               (s/map-maybe (with-scores post))
               s/sort
               (s/map s/snd)
               (.slice 0 5 _)]
              posts)))
