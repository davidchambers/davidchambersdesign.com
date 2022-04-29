(import ["../../elements" "../../orthogonal"]

(let [base
        [(⇨  0) (⇩  1)
         (→  1) (↓ 14) (→ 14) (↑ 14) (→  1) (↓ 15) (← 16) (↑ 15)]

      spiral
        [(⇨  3) (⇩  0)
         (→  1) (↓  1) (←  1) (↑  1)
         (⇨  3) (⇩  0)
         (→  1) (↓  1) (←  1) (↑  1)
         (⇨  3) (⇩  0)
         (→  1) (↓  1) (←  1) (↑  1)
         (⇨  3) (⇩  0)
         (→  1) (↓  1) (←  1) (↑  1)]

      header
        [(⇨  1) (⇩  1)
         (→  2) (↓  1) (→  1) (↑  1) (→  2) (↓  1) (→  1) (↑  1)
         (→  2) (↓  1) (→  1) (↑  1) (→  2) (↓  1) (→  1) (↑  1)
         (→  2) (↓  3) (← 14) (↑  3)]

      paper
        [(⇨  1) (⇩  4)
         (→ 14) (↓ 11) (← 14) (↑ 11)]]

   [(path {:fill "#da5" :d (render base)})
    (path {:fill "#333" :d (render spiral)})
    (path {:fill "#b00" :d (render header)})
    (path {:fill "#fff" :d (render paper)})]))
