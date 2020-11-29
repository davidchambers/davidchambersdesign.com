; This module exposes the full Sanctuary API.
;
; Type checking is disabled, primarily to permit the use of symbols as keys.
;
; The names of the exported values differ from their Sanctuary counterparts
; in the following ways:
;
;   - they use kebab case rather than camel case (e.g. `from-maybe`); and
;   - they use ' as the suffix for variants rather than _ (e.g. `maybe'`).

(import* ["./base.js"]

(invoke "fromEntries"
        [(invoke "map"
                 [(lambda [entry]
                     [(invoke "for"
                              [(invoke "replace"
                                       [(new RegExp ["_" "g"])
                                        "'"]
                                       (invoke "replace"
                                               [(new RegExp ["(?!\\b)[A-Z0-9]" "g"])
                                                (lambda [c] (invoke "concat" [(invoke "toLowerCase" [] c)] "-"))]
                                               (0 entry)))]
                              Symbol)
                      (1 entry)])]
                 (invoke "filter"
                         [(lambda [entry] (!== "unchecked" (0 entry)))]
                         (invoke "entries" [("unchecked" (import "sanctuary"))] Object)))]
        Object))
