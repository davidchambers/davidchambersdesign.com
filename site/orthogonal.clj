(let [s (require "./sanctuary")

      reducer
        (lambda [prev path curr]
           (if (=== :M (0 curr))
               (if (|| (=== :M (0 prev))
                       (=== :m (0 prev)))
                   (s/Pair curr path)  ; ignore previous move
                   (s/Pair curr (s/append prev path)))
               (if (&& (|| (=== :M (0 prev))
                           (=== :m (0 prev)))
                       (=== :m (0 curr)))
                   (s/Pair [(0 prev) [(+ (0 (1 prev)) (0 (1 curr))) (+ (1 (1 prev)) (1 (1 curr)))]] path)
                   (s/Pair curr (s/append prev path)))))

      simplify
        (s/array []
                 (lambda [head tail]
                    (s/pair s/append
                            (s/reduce (s/pair reducer)
                                      (s/Pair head [])
                                      tail))))

      render (s/pipe [simplify
                      s/join
                      (s/map (lambda [x]
                                (switch (typeof x)
                                   ["number" (String x)
                                    "object" (s/join-with "," x)  ; array
                                    "symbol" (Symbol.keyFor x)])))
                      s/unwords])]

   {:render render
    :⇦ (lambda [x] [:m [(- x 0) 0]])
    :⇨ (lambda [x] [:m [(+ x 0) 0]])
    :⇧ (lambda [y] [:m [0 (- y 0)]])
    :⇩ (lambda [y] [:m [0 (+ y 0)]])
    :← (lambda [x] [:h (- x 0)])
    :→ (lambda [x] [:h (+ x 0)])
    :↑ (lambda [y] [:v (- y 0)])
    :↓ (lambda [y] [:v (+ y 0)])
    :a (lambda [rx-ry angle large-arc-flag sweep-flag dx-dy]
          [:a rx-ry angle large-arc-flag sweep-flag dx-dy])})
