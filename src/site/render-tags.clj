(import* ["./elements"]

(let [s (require "./sanctuary")
      tags (require "./tags")

      ++ (s/join-with "")]

   (lambda [posts]
      (let [counts (s/reduce (lambda [counts post]
                                (s/reduce (lambda [counts tag]
                                             (apply Object.assign
                                                    [{}
                                                     counts
                                                     (Object.fromEntries [[tag (+ 1 (s/prop tag counts))]])]))
                                          counts
                                          (:tags post)))
                             (Object.fromEntries (s/map (lambda [name] [name 0])
                                                        (Object.getOwnPropertySymbols tags)))
                             posts)]
         [(h1 "Tags")
          (ol' {:id "tags"}
             (s/map (lambda [tag]
                       (li' {:data-count (s/prop tag counts)}
                          (a (++ ["/tag/" (Symbol.keyFor tag) "/"]) (s/prop tag tags))))
                    (Object.getOwnPropertySymbols tags)))
          (div {:class "clearfix"} [])]))))
