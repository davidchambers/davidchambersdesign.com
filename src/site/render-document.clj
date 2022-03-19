(import* [:base]

(let [s (import :sanctuary)

      render-fragment (import "./render-fragment")]

   (lambda [indent nodes]
      (s/concat "<!DOCTYPE html>\n"
                (render-fragment indent 0 false nodes)))))
