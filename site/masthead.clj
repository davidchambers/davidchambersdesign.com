(import ["./orthogonal"]

(let [e (require "./elements")
      s (require "./sanctuary")

      <A> [(→ 14) (↓ 24) (←  4) (↑ 10) (←  6) (↓ 10) (←  4) (↑ 24)
           (⇨  4) (⇩  4)
           (→  6) (↓  6) (←  6) (↑  6)]
      <B> [(→ 14) (↓ 24) (← 14) (↑ 24)
           (⇨  4) (⇩  4)
           (→  6) (↓  6) (←  6) (↑  6)
           (⇨  0) (⇩ 10)
           (→  6) (↓  6) (←  6) (↑  6)]
      <C> [(→ 14) (↓  9) (←  4) (↑  5) (←  6) (↓ 16) (→  6) (↑  5) (→  4) (↓  9) (← 14) (↑ 24)]
      <D> [(→ 14) (↓ 24) (← 14) (↑ 24)
           (⇨  4) (⇩  4)
           (→  6) (↓ 16) (←  6) (↑ 16)]
      <E> [(→ 12) (↓  4) (←  8) (↓  6) (→  8) (↓  4) (←  8) (↓  6) (→  8) (↓  4) (← 12) (↑ 24)]
      <G> [(→ 14) (↓  4) (← 10) (↓ 16) (→  6) (↑ 10) (→  4) (↓ 14) (← 14) (↑ 24)]
      <H> [(→  4) (↓ 10) (→  6) (↑ 10) (→  4) (↓ 24) (←  4) (↑ 10) (←  6) (↓ 10) (←  4) (↑ 24)]
      <I> [(→  4) (↓ 24) (←  4) (↑ 24)]
      <M> [(→ 22) (↓ 24) (←  4) (↑ 20) (←  5) (↓ 20) (←  4) (↑ 20) (←  5) (↓ 20) (←  4) (↑ 24)]
      <N> [(→ 14) (↓ 24) (←  4) (↑ 20) (←  6) (↓ 20) (←  4) (↑ 24)]
      <R> <A>
      <S> [(→ 12) (↓  4) (←  8) (↓  6) (→  8) (↓ 14) (← 12) (↑  4) (→  8) (↑  6) (←  8) (↑ 14)]
      <V> [(→  4) (↓ 20) (→  6) (↑ 20) (→  4) (↓ 24) (← 14) (↑ 24)]

      -A- [(→ 14) (↓  1) (← 13) (↓ 23) (←  1) (↑ 24)
           (⇨  4) (⇩ 10)
           (→  6) (↑  6) (→  1) (↓  7) (←  7) (↑  1)
           (⇨  6) (⇩  4)
           (→  1) (↓ 10) (←  1) (↑ 10)]
      -B- [(→ 14) (↓  1) (← 13) (↓ 23) (←  1) (↑ 24)
           (⇨  4) (⇩ 10)
           (→  6) (↑  6) (→  1) (↓  7) (←  7) (↑  1)
           (⇨  0) (⇩ 10)
           (→  6) (↑  6) (→  1) (↓  7) (←  7) (↑  1)]
      -C- [(→ 14) (↓  1) (← 13) (↓ 23) (←  1) (↑ 24)
           (⇨  4) (⇩ 20)
           (→  6) (↑  5) (→  4) (↓  1) (←  3) (↓  5) (←  7) (↑  1)
           (⇨  6) (⇧ 16)
           (→  1) (↓  5) (←  1) (↑  5)]
      -D- [(→ 14) (↓  1) (← 13) (↓ 23) (←  1) (↑ 24)
           (⇨  4) (⇩ 20)
           (→  6) (↑ 16) (→  1) (↓ 17) (←  7) (↑  1)]
      -E- [(→ 12) (↓  1) (← 11) (↓ 23) (←  1) (↑ 24)
           (⇨  4) (⇩ 10)
           (→  8) (↓  1) (←  8) (↑  1)
           (⇨  0) (⇩ 10)
           (→  8) (↓  1) (←  8) (↑  1)]
      -G- [(→ 14) (↓  1) (← 13) (↓ 23) (←  1) (↑ 24)
           (⇨  4) (⇩ 20)
           (→  6) (↑ 10) (→  4) (↓  1) (←  3) (↓ 10) (←  7) (↑  1)]
      -H- [(→  4) (↓  1) (←  3) (↓ 23) (←  1) (↑ 24)
           (⇨  4) (⇩ 10)
           (→  6) (↑ 10) (→  4) (↓  1) (←  3) (↓ 10) (←  7) (↑  1)
           (⇨  6) (⇩  4)
           (→  1) (↓ 10) (←  1) (↑ 10)]
      -I- [(→  4) (↓  1) (←  3) (↓ 23) (←  1) (↑ 24)]
      -M- [(→ 22) (↓  1) (← 21) (↓ 23) (←  1) (↑ 23)
           (⇨  9) (⇩  3)
           (→  1) (↓ 20) (←  1) (↑ 20)
           (⇨  9) (⇩  0)
           (→  1) (↓ 20) (←  1) (↑ 20)]
      -N- [(→ 14) (↓  1) (← 13) (↓ 23) (←  1) (↑ 24)
           (⇨ 10) (⇩  4)
           (→  1) (↓ 20) (←  1) (↑ 20)]
      -R- -A-
      -S- [(→ 12) (↓  1) (← 11) (↓ 13) (←  1) (↑ 14)
           (⇨  0) (⇩ 20)
           (→  8) (↑  6) (→  1) (↓  7) (←  8) (↓  3) (←  1) (↑  4)
           (⇨  4) (⇧ 10)
           (→  8) (↓  1) (←  8) (↑  1)]
      -V- [(→  4) (↓  1) (←  3) (↓ 23) (←  1) (↑ 24)
           (⇨  4) (⇩ 20)
           (→  6) (↑ 20) (→  4) (↓  1) (←  3) (↓ 20) (←  7) (↑  1)]

      =A= [(⇨  1) (⇩ 23)
           (→  2) (↑ 10) (→  8) (↓  1) (←  7) (↓ 10) (←  3) (↑  1)
           (⇨  2) (⇧ 20)
           (→  8) (↓  1) (←  7) (↓  7) (←  1) (↑  8)
           (⇨  8) (⇩ 20)
           (→  2) (↑ 22) (→  1) (↓ 23) (←  3) (↑  1)]
      =B= [(⇨  1) (⇩ 23)
           (→ 12) (↑ 22) (→  1) (↓ 23) (← 13) (↑  1)
           (⇨  2) (⇧ 20)
           (→  8) (↓  1) (←  7) (↓  7) (←  1) (↑  8)
           (⇨  0) (⇩ 10)
           (→  8) (↓  1) (←  7) (↓  7) (←  1) (↑  8)]
      =C= [(⇨  1) (⇩ 23)
           (→ 12) (↑  7) (→  1) (↓  8) (← 13) (↑  1)
           (⇨  2) (⇧ 20)
           (→  8) (↓  1) (←  7) (↓ 17) (←  1) (↑ 18)
           (⇨ 10) (⇧  2)
           (→  1) (↓  8) (←  3) (↑  1) (→  2) (↑  7)]
      =D= [(⇨  1) (⇩ 23)
           (→ 12) (↑ 22) (→  1) (↓ 23) (← 13) (↑  1)
           (⇨  2) (⇧ 20)
           (→  8) (↓  1) (←  7) (↓ 17) (←  1) (↑ 18)]
      =E= [(⇨  1) (⇩ 23)
           (→ 10) (↑  2) (→  1) (↓  3) (← 11) (↑  1)
           (⇨  2) (⇧ 20)
           (→  8) (↑  2) (→  1) (↓  3) (←  8) (↓  7) (←  1) (↑  8)
           (⇨  0) (⇩ 10)
           (→  8) (↑  2) (→  1) (↓  3) (←  8) (↓  7) (←  1) (↑  8)]
      =G= [(⇨  1) (⇩ 23)
           (→ 12) (↑ 12) (→  1) (↓ 13) (← 13) (↑  1)
           (⇨  2) (⇧ 20)
           (→ 10) (↑  2) (→  1) (↓  3) (← 10) (↓ 17) (←  1) (↑ 18)]
      =H= [(⇨  1) (⇩ 23)
           (→  2) (↑ 10) (→  8) (↓  1) (←  7) (↓ 10) (←  3) (↑  1)
           (⇨  2) (⇧ 22)
           (→  1) (↓ 10) (←  1) (↑ 10)
           (⇨ 10) (⇩  0)
           (→  1) (↓ 23) (←  3) (↑  1) (→  2) (↑ 22)]
      =I= [(⇨  1) (⇩ 23)
           (→  2) (↑ 22) (→  1) (↓ 23) (←  3) (↑  1)]
      =M= [(⇨  1) (⇩ 23)
           (→  2) (↑ 20) (→  7) (↓  1) (←  6) (↓ 20) (←  3) (↑  1)
           (⇨  9) (⇩  0)
           (→  2) (↑ 20) (→  7) (↓  1) (←  6) (↓ 20) (←  3) (↑  1)
           (⇨  9) (⇩  0)
           (→  2) (↑ 22) (→  1) (↓ 23) (←  3) (↑  1)]
      =N= [(⇨  1) (⇩ 23)
           (→  2) (↑ 20) (→  8) (↓  1) (←  7) (↓ 20) (←  3) (↑  1)
           (⇨ 10) (⇩  0)
           (→  2) (↑ 22) (→  1) (↓ 23) (←  3) (↑  1)]
      =R= =A=
      =S= [(⇨  1) (⇩ 13)
           (→  8) (↓  1) (←  8) (↑  1)
           (⇨  0) (⇩ 10)
           (→ 10) (↑ 12) (→  1) (↓ 13) (← 11) (↑  1)
           (⇨  2) (⇧ 20)
           (→  8) (↑  2) (→  1) (↓  3) (←  8) (↓  7) (←  1) (↑  8)]
      =V= [(⇨  1) (⇩ 23)
           (→ 12) (↑ 22) (→  1) (↓ 23) (← 13) (↑  1)
           (⇨  2) (⇧ 22)
           (→  1) (↓ 20) (←  1) (↑ 20)]

      update
        (lambda [positions dir]
           (s/prepend (s/T (0 positions)
                           (switch (0 dir)
                              [:m (s/bimap (+ (0 (1 dir))) (+ (1 (1 dir))))
                               :h (s/bimap (+ (1 dir)) s/I)
                               :v (s/bimap s/I (+ (1 dir)))]))
                      positions))

      reset (lambda [path]
               (let [paths (s/extend s/I (s/reduce update [(s/Pair 0 0)] path))
                     xs (s/chain (s/map s/fst) paths)
                     ys (s/chain (s/map s/snd) paths)
                     dx (- (0 xs) (s/reduce s/max 0 xs))
                     dy (- (0 ys) 0)]
                  [:m [dx dy]]))

      paths (s/pipe [(s/map (lambda [char] (s/append (reset char) char)))
                     (s/intercalate [[:m [6 0]]])
                     (s/prepend [:M [0 0]])])

      <chars> (paths [<D> <A> <V> <I> <D> <C> <H> <A> <M> <B> <E> <R> <S> <D> <E> <S> <I> <G> <N>])
      -chars- (paths [-D- -A- -V- -I- -D- -C- -H- -A- -M- -B- -E- -R- -S- -D- -E- -S- -I- -G- -N-])
      =chars= (paths [=D= =A= =V= =I= =D= =C= =H= =A= =M= =B= =E= =R= =S= =D= =E= =S= =I= =G= =N=])]

   {:mask [(e/path {:d (render <chars>) :fill "#000" :fill-rule :evenodd})]
    :fill [(e/path {:d (render -chars-) :fill "#999"})
           (e/path {:d (render =chars=) :fill "#666"})]}))
