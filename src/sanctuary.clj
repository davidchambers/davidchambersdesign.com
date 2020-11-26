(import* ["./base.js"]

(invoke "fromEntries"
        [(invoke "map"
                 [(lambda [kv]
                     [(invoke "for"
                              [(invoke "replace"
                                       [(new RegExp ["_" "g"])
                                        ""]
                                       (invoke "replace"
                                               [(new RegExp ["(?!\\b)[A-Z]" "g"])
                                                (lambda [c] (invoke "concat" [(invoke "toLowerCase" [] c)] "-"))]
                                               (0 kv)))]
                              Symbol)
                      (1 kv)])]
                 (invoke "entries" [(import "sanctuary")] Object))]
        Object))
