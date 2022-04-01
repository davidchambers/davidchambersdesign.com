(let [sanctuary (require "sanctuary")

      map (invoke-1 "map")
      replace (invoke-2 "replace")
      to-lower (invoke-0 "toLowerCase")

      kebab-case (replace (new RegExp ["(?!\\b)[A-Z0-9]" "g"])
                          (lambda [c] (+ (to-lower c) "-")))

      prime (replace (new RegExp ["_" "g"]) "'")

      transform-entry
        (lambda [entry]
           [(Symbol.for (prime (kebab-case (0 entry)))) (1 entry)])]

   (Object.fromEntries (map transform-entry
                            (Object.entries sanctuary.unchecked))))
