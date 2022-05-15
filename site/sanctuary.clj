(let [sanctuary (require "sanctuary")

      kebab-case (.replace (new RegExp "(?!\\b)[A-Z0-9]" "g")
                           (c -> (+ (.toLowerCase c) "-"))
                           _)

      prime (.replace "_" "'" _)]

   (Object.fromEntries (.map (entry -> [(Symbol.for (prime (kebab-case (0 entry)))) (1 entry)])
                             (Object.entries sanctuary.unchecked))))
