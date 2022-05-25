(import ["./elements"]

(let [s (require "./sanctuary")
      tags (require "./tags")]

   (posts ->
      (let [concat (obj-1 obj-2 -> (.apply null [{} obj-1 obj-2] Object.assign))
            counts (s/reduce (counts post ->
                                (s/reduce (counts tag ->
                                             (concat counts
                                                     (Object.fromEntries [[tag (+ 1 (s/prop tag counts))]])))
                                          counts
                                          (:tags post)))
                             (Object.fromEntries (s/map (name -> [name 0])
                                                        (Object.getOwnPropertySymbols tags)))
                             posts)]
         [(h1 "Tags")
          (ol' {:id "tags"}
             (s/map (tag ->
                       (li' {:data-count (s/prop tag counts)}
                          (a (.join "" ["/tag/" (Symbol.keyFor tag) "/"]) (s/prop tag tags))))
                    (Object.getOwnPropertySymbols tags)))
          (div {:class "clearfix"} [])]))))
