(import* ["../lang/modules/base" "../lang/modules/sanctuary" "../lang/modules/prelude" "./elements"]

(lambda [posts]
   (let [names (import "./tags")
         counts (reduce (lambda [counts post]
                           (reduce (lambda [counts tag]
                                      (insert tag (+ 1 (prop tag counts)) counts))
                                   counts
                                   (prop :tags post)))
                        (reduce-object (flip (K (flip insert 0))) {} names)
                        posts)]
      [(h1 "Tags")
       (ol' {:id "tags"}
          (map (lambda [tag]
                  (li' {:data-count (prop tag counts)}
                     (a (++ ["/tag/" (symbol->string tag) "/"]) (prop tag names))))
               (.getOwnPropertySymbols names Object)))
       (div {:class "clearfix"} [])])))
