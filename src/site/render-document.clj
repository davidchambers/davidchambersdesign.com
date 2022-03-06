(import* [:base :sanctuary]

(let [render-fragment (import "./render-fragment")]
   (lambda [indent nodes]
      (concat "<!DOCTYPE html>\n"
              (render-fragment indent 0 false nodes)))))
