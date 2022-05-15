(import ["../elements" "../orthogonal"]

(let [bucket
        [(⇨  0) (⇩  0)
         (↓  2) (→  1) (↓  6) (→  1)
         (↓  6) (→  1) (↓  1) (→  2)
         (↓  1) (→  6) (↑  1) (→  2)
         (↑  1) (→  1) (↑  6) (→  1)
         (↑  6) (→  1) (↑  2) (← 16)]

      sticky-note
        [(⇨  4) (⇩  1)
         (→  8) (↓  7) (←  8) (↑  7)]

      symbol
        [(⇨  6) (⇩  2)
         (→  1) (↓  5) (→  2) (↑  5)
         (→  1) (↓  1) (←  4) (↑  1)
         (⇨  0) (⇩  2)
         (→  4) (↓  2) (←  4) (↑  2)]

      sticky-tape
        [(⇨  7) (⇩  0)
         (→  2) (↓  3) (←  2) (↑  3)]]

   [(path {:fill "#27c" :d (render bucket)})
    (path {:fill "#ee7" :d (render sticky-note)})
    (path {:fill "#a7a" :d (render symbol)})
    (path {:fill "#fff" :d (render sticky-tape) :opacity 0.25})]))