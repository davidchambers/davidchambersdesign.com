(let [orthogonal (require "orthogonal")

      elements (require "./elements")
      render-fragment (require "./render-fragment")
      s (require "./sanctuary")]

   (s/pipe [(s/map (lambda [p] ((:path elements) (apply Object/assign [{} p {:d (apply orthogonal/formatters/svg [(:d p) 1])}]))))
            ((:svg elements) {:xmlns "http://www.w3.org/2000/svg" :version "1.1" :width 16 :height 16})
            (s/of Array)
            (render-fragment "  " 0 false)
            (s/concat "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n")
            (s/concat "<?xml version=\"1.0\" standalone=\"no\"?>\n")]))
