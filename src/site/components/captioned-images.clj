(import* ["../elements"]

(let [s (require "../sanctuary")

      captioned-image (require "./captioned-image")]

   (lambda [f]
      (dl (s/chain (s/prop :children) (f captioned-image))))))
