(import* ["./base.js"]

(let [S (import "sanctuary")
      rename (lambda [name]
                (invoke "replace"
                        [(new RegExp ["_" "g"])
                         ""]
                        (invoke "replace"
                                [(new RegExp ["(?!\\b)[A-Z]" "g"])
                                 (lambda [c] (invoke "concat" [(invoke "toLowerCase" [] c)] "-"))]
                                name)))]
   (invoke "fromEntries"
           [(invoke "map"
                    [(lambda [kv] [(invoke "for" [(rename (0 kv))] Symbol) (1 kv)])]
                    (invoke "entries" [S] Object))]
           Object)))
