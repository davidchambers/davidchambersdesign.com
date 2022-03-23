(import* ["../elements"]

(let [sanctuary (require "sanctuary")

      kebab-case-keys (require "../kebab-case-keys")

      s (kebab-case-keys sanctuary)]

   (lambda [datetime body]
      (div {:class "update"}
         (s/prepend (h4 ["Update \u2014 "
                         (time {:datetime (invoke-0 "toISO" datetime)}
                            (invoke-1 "toFormat" "d MMMM y" datetime))])
                    (canonicalize-children body))))))
