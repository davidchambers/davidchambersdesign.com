(import ["../elements"]

(let [s (require "../sanctuary")

      captioned-image (require "./captioned-image")]

   (f -> (dl (s/chain (:children _) (f captioned-image))))))
