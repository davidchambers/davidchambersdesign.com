(let [sanctuary (require "sanctuary")

      kebab-case-keys (require "./kebab-case-keys")
      render-fragment (require "./render-fragment")

      s (kebab-case-keys sanctuary)]

   (lambda [indent nodes]
      (s/concat "<!DOCTYPE html>\n"
                (render-fragment indent 0 false nodes))))
