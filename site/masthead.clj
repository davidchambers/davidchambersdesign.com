(let [render-svg (require "./render-svg")
      s (require "./sanctuary")

      =A= [[:R 14] [:D 24] [:L  4] [:U 10] [:L  6] [:D 10] [:L  4] [:U 24] [:r  4] [:d  4] [:R  6] [:D  6] [:L  6] [:U  6]]
      -A- [[:R 12] [:D 22] [:L  2] [:U 10] [:L  8] [:D 10] [:L  2] [:U 22] [:r  2] [:d  2] [:R  8] [:D  8] [:L  8] [:U  8]]
      =B= [[:R 14] [:D 24] [:L 14] [:U 24] [:r  4] [:d  4] [:R  6] [:D  6] [:L  6] [:U  6] [:r  0] [:d 10] [:R  6] [:D  6] [:L  6] [:U  6]]
      -B- [[:R 12] [:D 22] [:L 12] [:U 22] [:r  2] [:d  2] [:R  8] [:D  8] [:L  8] [:U  8] [:r  0] [:d 10] [:R  8] [:D  8] [:L  8] [:U  8]]
      =C= [[:R 14] [:D  9] [:L  4] [:U  5] [:L  6] [:D 16] [:R  6] [:U  5] [:R  4] [:D  9] [:L 14] [:U 24]]
      -C- [[:R 12] [:D  7] [:L  2] [:U  5] [:L  8] [:D 18] [:R  8] [:U  5] [:R  2] [:D  7] [:L 12] [:U 22]]
      =D= [[:R 14] [:D 24] [:L 14] [:U 24] [:r  4] [:d  4] [:R  6] [:D 16] [:L  6] [:U 16]]
      -D- [[:R 12] [:D 22] [:L 12] [:U 22] [:r  2] [:d  2] [:R  8] [:D 18] [:L  8] [:U 18]]
      =E= [[:R 12] [:D  4] [:L  8] [:D  6] [:R  8] [:D  4] [:L  8] [:D  6] [:R  8] [:D  4] [:L 12] [:U 24]]
      -E- [[:R 10] [:D  2] [:L  8] [:D  8] [:R  8] [:D  2] [:L  8] [:D  8] [:R  8] [:D  2] [:L 10] [:U 22]]
      =G= [[:R 14] [:D  4] [:L 10] [:D 16] [:R  6] [:U 10] [:R  4] [:D 14] [:L 14] [:U 24]]
      -G- [[:R 12] [:D  2] [:L 10] [:D 18] [:R  8] [:U 10] [:R  2] [:D 12] [:L 12] [:U 22]]
      =H= [[:R  4] [:D 10] [:R  6] [:U 10] [:R  4] [:D 24] [:L  4] [:U 10] [:L  6] [:D 10] [:L  4] [:U 24]]
      -H- [[:R  2] [:D 10] [:R  8] [:U 10] [:R  2] [:D 22] [:L  2] [:U 10] [:L  8] [:D 10] [:L  2] [:U 22]]
      =I= [[:R  4] [:D 24] [:L  4] [:U 24]]
      -I- [[:R  2] [:D 22] [:L  2] [:U 22]]
      =M= [[:R 22] [:D 24] [:L  4] [:U 20] [:L  5] [:D 20] [:L  4] [:U 20] [:L  5] [:D 20] [:L  4] [:U 24]]
      -M- [[:R 20] [:D 22] [:L  2] [:U 20] [:L  7] [:D 20] [:L  2] [:U 20] [:L  7] [:D 20] [:L  2] [:U 22]]
      =N= [[:R 14] [:D 24] [:L  4] [:U 20] [:L  6] [:D 20] [:L  4] [:U 24]]
      -N- [[:R 12] [:D 22] [:L  2] [:U 20] [:L  8] [:D 20] [:L  2] [:U 22]]
      =R= =A=
      -R- -A-
      =S= [[:R 12] [:D  4] [:L  8] [:D  6] [:R  8] [:D 14] [:L 12] [:U  4] [:R  8] [:U  6] [:L  8] [:U 14]]
      -S- [[:R 10] [:D  2] [:L  8] [:D  8] [:R  8] [:D 12] [:L 10] [:U  2] [:R  8] [:U  8] [:L  8] [:U 12]]
      =V= [[:R  4] [:D 20] [:R  6] [:U 20] [:R  4] [:D 24] [:L 14] [:U 24]]
      -V- [[:R  2] [:D 20] [:R  8] [:U 20] [:R  2] [:D 22] [:L 12] [:U 22]]

      =chars= [=D= =A= =V= =I= =D= =C= =H= =A= =M= =B= =E= =R= =S= =D= =E= =S= =I= =G= =N=]
      -chars- [-D- -A- -V- -I- -D- -C- -H- -A- -M- -B- -E- -R- -S- -D- -E- -S- -I- -G- -N-]

      last (lambda [xs] (0 (s/reverse xs)))

      update
        (lambda [positions directive]
           (let [position (last positions)
                 x (0 position)
                 y (1 position)]
              (switch (0 directive)
                 [:M (s/append [(1 directive) (2 directive)] positions)
                  :m (s/append [(+ (1 directive) x) (+ (2 directive) y)] positions)
                  :r (s/append [(+ (1 directive) x) y] positions)
                  :R (s/append [(+ (1 directive) x) y] positions)
                  :l (s/append [(- (1 directive) x) y] positions)
                  :L (s/append [(- (1 directive) x) y] positions)
                  :u (s/append [x (- (1 directive) y)] positions)
                  :U (s/append [x (- (1 directive) y)] positions)
                  :d (s/append [x (+ (1 directive) y)] positions)
                  :D (s/append [x (+ (1 directive) y)] positions)])))

      #0 (lambda [xs] (0 xs))
      #1 (lambda [xs] (1 xs))

      reset (lambda [path]
               (let [paths (s/reverse (s/extend s/reverse (s/reverse (s/reduce update [[0 0]] path))))
                     xs (s/chain (s/map #0) paths)
                     ys (s/chain (s/map #1) paths)
                     dx (- (last xs) (s/reduce s/max 0 xs))
                     dy (- (last ys) 0)]
                  [:m dx dy]))

      paths (lambda [offset gap]
               (s/pipe [(s/map (lambda [char] (s/append (reset char) char)))
                        (s/intercalate [gap])
                        (s/prepend offset)]))]

   {:mask (render-svg
             (lambda [path cont]
                (cont {}
                      [(path "#000" (paths [:M 0 0] [:m 6 0] =chars=))])))
    :fill (render-svg
             (lambda [path cont]
                (cont {}
                      [(path "#333" (s/concat (paths [:M 0 0] [:m 6 0] =chars=)
                                              (paths [:M 1 1] [:m 8 0] -chars-)))])))})
