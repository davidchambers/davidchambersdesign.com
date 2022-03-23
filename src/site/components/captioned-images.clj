(import* ["../elements"]

(let [sanctuary (require "sanctuary")

      kebab-case-keys (require "../kebab-case-keys")

      captioned-image (require "./captioned-image")

      s (kebab-case-keys sanctuary)]

   (lambda [f]
      (dl (s/chain (s/prop :children) (f captioned-image))))))
