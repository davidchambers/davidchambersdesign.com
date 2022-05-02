(import ["../elements" "../orthogonal"]

   [(linearGradient {:id "gradient" :x1 "50%" :y1 "0%" :x2 "50%" :y2 "100%"}
       [(stop {:stop-color "#96ecfd" :offset "0%"})
        (stop {:stop-color "#14dff0" :offset "100%"})])
    (path {:stroke "#fff"
           :stroke-width 1
           :fill "url(#gradient)"
           :d (render [(⇨ 3)
                       (⇩ 3)
                       (a [2 2] 0 0 1 [4 0])
                       (↓ 1)
                       (→ 4)
                       (a [2 2] 0 0 1 [0 4])
                       (← 4)
                       (↓ 2)
                       (a [1 1] 0 0 0 [1 1])
                       (→ 3)
                       (a [2 2] 0 0 1 [0 4])
                       (← 4)
                       (a [4 4] 0 0 1 [-4 -4])
                       (↑ 8)])})])
