(let [e (require "../../elements")
      render-svg (require "../../render-svg")
      s (require "../../sanctuary")]

   (render-svg
      (lambda [path cont]
         (cont {:width 16 :height 16}
               [(e/linearGradient {:id "gradient" :x1 "50%" :y1 "0%" :x2 "50%" :y2 "100%"}
                   [(e/stop {:stop-color "#96ecfd" :offset "0%"})
                    (e/stop {:stop-color "#14dff0" :offset "100%"})])
                (e/path {:stroke "#fff"
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
                                        "l 0,-8"])})]))))
