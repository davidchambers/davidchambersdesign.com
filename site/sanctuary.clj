(let [sanctuary (require "sanctuary")

      kebab-case (.replace (new RegExp "(?!\\b)[A-Z0-9]" "g")
                           (lambda [c] (+ (.toLowerCase c) "-"))
                           _)

      prime (.replace (new RegExp "_" "g") "'" _)

      transform-entry
        (lambda [entry]
           [(Symbol.for (prime (kebab-case (0 entry)))) (1 entry)])]

   (Object.fromEntries (.map transform-entry
                             (Object.entries sanctuary.unchecked))))
