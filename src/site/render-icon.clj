(import* ["./elements"]

(let [orthogonal (require "orthogonal")
      sanctuary (require "sanctuary")

      kebab-case-keys (require "./kebab-case-keys")
      render-fragment (require "./render-fragment")

      s (kebab-case-keys sanctuary)

      ++ (s/join-with "")]

   (lambda [icon]
      (++ ["<?xml version=\"1.0\" standalone=\"no\"?>\n"
           "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n"
           [(render-fragment
               "  "
               0
               false
               [(svg {:xmlns "http://www.w3.org/2000/svg" :version "1.1"}
                   (s/map (lambda [p]
                             (path (Object/fromEntries (s/append [:d (apply orthogonal/formatters/svg [(:d p) 1])]
                                                                 (s/map (lambda [symbol] [symbol (s/prop symbol p)])
                                                                        (Object/getOwnPropertySymbols p))))))
                          icon))])]]))))
