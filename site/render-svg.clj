(let [e (require "./elements")
      o (require "./orthogonal")
      render-fragment (require "./render-fragment")
      s (require "./sanctuary")]

   (lambda [cont]
      (cont (lambda [fill path] (e/path {:fill-rule :evenodd :fill fill :d (o/render path)}))
            (lambda [attrs children]
               (let [svg (e/svg (apply Object.assign [{:xmlns "http://www.w3.org/2000/svg" :version "1.1"} attrs]) children)
                     xml "<?xml version=\"1.0\" standalone=\"no\"?>"
                     doctype "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">"]
                  (s/join-with "\n" [xml doctype (render-fragment "  " 0 false [svg])]))))))
