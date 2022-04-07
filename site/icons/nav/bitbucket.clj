(let [e (require "../../elements")
      o (require "../../orthogonal")]

   (lambda [path cont]
      (cont {:width 16 :height 16}
            [(path "#27c"
                   [[:r  0] [:d  0] [:D  2] [:R  1] [:D  6] [:R  1] [:D  6] [:R  1] [:D  1] [:R  2]
                                    [:D  1] [:R  6] [:U  1] [:R  2] [:U  1] [:R  1] [:U  6] [:R  1]
                                    [:U  6] [:R  1] [:U  2] [:L 16]])
             (path "#ee7"
                   [[:r  4] [:d  1] [:R  8] [:D  7] [:L  8] [:U  7]])
             (path "#a7a"
                   [[:r  6] [:d  2] [:R  1] [:D  5] [:R  2] [:U  5] [:R  1] [:D  1] [:L  4] [:U  1]
                    [:r  0] [:d  2] [:R  4] [:D  2] [:L  4] [:U  2]])
             (e/path {:fill-rule :evenodd
                      :fill "#fff"
                      :opacity "0.25"
                      :d (o/render [[:r  7] [:d  0] [:R  2] [:D  3] [:L  2] [:U  3]])})])))
