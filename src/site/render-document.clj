(import* [:base]

(let [sanctuary (import "sanctuary")

      kebab-case-keys (import "./kebab-case-keys")
      render-fragment (import "./render-fragment")

      s (kebab-case-keys sanctuary)]

   (lambda [indent nodes]
      (s/concat "<!DOCTYPE html>\n"
                (render-fragment indent 0 false nodes)))))
