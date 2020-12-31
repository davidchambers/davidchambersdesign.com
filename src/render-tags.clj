(import* ["./base.js" "./sanctuary.clj" "./prelude.clj" "./elements.clj"]

(lambda [posts]
   (let [names (import "./tags.clj")
         counts (reduce (lambda [counts post]
                           (reduce (lambda [counts tag]
                                      (insert tag (+ 1 (tag counts)) counts))
                                   counts
                                   (:tags post)))
                        (reduce-object (flip (K (flip insert 0))) {} names)
                        posts)]
      [(h1 "Tags")
       (ol' {:id "tags"}
          (map (lambda [tag]
                  (li' {:data-count (tag counts)}
                     (a (++ ["/tag/" (symbol->string tag) "/"]) (tag names))))
               (.getOwnPropertySymbols names Object)))
       (div {:class "clearfix"} [])])))
