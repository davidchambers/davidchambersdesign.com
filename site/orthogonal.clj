(let [s (require "./sanctuary")

      - (lambda [x] (- x 0))
      + (lambda [x] (+ x 0))

      ++ (s/join-with "")

      M (lambda [x y] (++ ["M" " " x "," y]))
      m (lambda [x y] (++ ["m" " " x "," y]))
      l (lambda [x y] (++ ["l" " " x "," y]))

      render (s/compose s/unwords
                        (s/map (lambda [directive]
                                  (switch (0 directive)
                                     [:M (M (1 directive) (2 directive))
                                      :m (m (1 directive) (2 directive))
                                      :l (m (- (1 directive)) 0)
                                      :r (m (+ (1 directive)) 0)
                                      :u (m 0 (- (1 directive)))
                                      :d (m 0 (+ (1 directive)))
                                      :L (l (- (1 directive)) 0)
                                      :R (l (+ (1 directive)) 0)
                                      :U (l 0 (- (1 directive)))
                                      :D (l 0 (+ (1 directive)))]))))]

   {:render render})
