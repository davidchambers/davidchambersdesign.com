(import* [:base :path :sanctuary :prelude]

(let [import-post (import "./import-post")

      similarity
        (lambda [set-1 set-2]
           (/ (Math/sqrt (#size (union set-1 set-2)))
              (#size (intersection set-1 set-2))))

      seconds-between
        (lambda [from to]
           (#seconds (.diff from "seconds" to)))

      with-scores
        (lambda [that this]
           (let [score (similarity (new Set [(:tags that)])
                                   (new Set [(:tags this)]))
                 primary (negate (score))
                 secondary (Math/abs (seconds-between (:datetime that)
                                                      (:datetime this)))]
              (if (>= 0.5 score)
                  (Just (Pair (Pair primary secondary) this))
                  Nothing)))]

   (lambda [filenames filename]
      (pipe [(reject (equals filename))
             (map import-post)
             (map-maybe (with-scores (import-post filename)))
             sort
             (map snd)
             (lambda [posts] (.slice 0 5 posts))
             (map (lambda [post] (:slug post)))
             (lambda [posts] (.stringify posts null 2 JSON))]
            filenames))))
