(let [map (invoke-1 "map")
      replace (invoke-2 "replace")
      to-lower (invoke-0 "toLowerCase")
      kebab-case (replace (new RegExp ["(?!\\b)[A-Z0-9]" "g"])
                          (lambda [c] (+ (to-lower c) "-")))
      prime (replace (new RegExp ["_" "g"]) "'")]

   (lambda [object]
      (Object.fromEntries (map (lambda [entry] [(prime (kebab-case (0 entry))) (1 entry)])
                               (Object.entries object)))))
