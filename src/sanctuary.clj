(import* ["./base.js"]

(invoke "fromEntries"
        [(invoke "map"
                 [(lambda [entry]
                     [(invoke "for"
                              [(invoke "replace"
                                       [(new RegExp ["_" "g"])
                                        "'"]
                                       (invoke "replace"
                                               [(new RegExp ["(?!\\b)[A-Z]" "g"])
                                                (lambda [c] (invoke "concat" [(invoke "toLowerCase" [] c)] "-"))]
                                               (0 entry)))]
                              Symbol)
                      (1 entry)])]
                 (invoke "filter"
                         [(lambda [entry] (!== "unchecked" (0 entry)))]
                         (invoke "entries" [(import "sanctuary")] Object)))]
        Object))
