(import* ["./base.js" "./sanctuary.clj"]

(let [render-fragment (import "./render-fragment.clj")]
   (lambda [indent nodes]
      (concat "<!DOCTYPE html>\n"
              (render-fragment indent 0 false nodes)))))
