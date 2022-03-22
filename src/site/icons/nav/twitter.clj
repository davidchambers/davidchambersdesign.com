(import* [:base "../../elements"]

(let [s (import :sanctuary)

      render-fragment (import "../../render-fragment")

      ++ (s/join-with "")]

   (++ ["<?xml version=\"1.0\" standalone=\"no\"?>\n"
        "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n"
        [(render-fragment
            "  "
            0
            false
            [(svg {:xmlns "http://www.w3.org/2000/svg" :version "1.1"}
                [(linearGradient {:id "gradient" :x1 "50%" :y1 "0%" :x2 "50%" :y2 "100%"}
                    [(stop {:stop-color "#96ecfd" :offset "0%"})
                     (stop {:stop-color "#14dff0" :offset "100%"})])
                 (path {:stroke "#fff"
                        :stroke-width "1"
                        :fill "url(#gradient)"
                        :d (s/unwords ["M 3,3"
                                       "a 2,2 0 0 1 4,0"
                                       "l 0,1"
                                       "l 4,0"
                                       "a 2,2 0 0 1 0,4"
                                       "l -4,0"
                                       "l 0,2"
                                       "a 1,1 0 0 0 1,1"
                                       "l 3,0"
                                       "a 2,2 0 0 1 0,4"
                                       "l -4,0"
                                       "a 4,4 0 0 1 -4,-4"
                                       "l 0,-8"])})])])]])))