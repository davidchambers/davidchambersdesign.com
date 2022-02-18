(import* ["./base.js" "./sanctuary.js"]

(let [render-fragment (import "./render-fragment.js")]
   (lambda [indent nodes]
      (concat "<!DOCTYPE html>\n"
              (render-fragment indent 0 false nodes)))))
