(import ["../orthogonal"]

(let [e (require "../elements")
      s (require "../sanctuary")]

   (s/map (path ->
             (e/path {:fill-rule :evenodd
                      :fill "#000"
                      :d (render (s/concat [(⇨  0) (⇩  0)] path))}))
          [[(→ 4) (↓ 7) (← 4) (↑ 7) (⇨ 1) (⇩ 1) (→ 2) (↓ 5) (← 2) (↑ 5)]
           [(→ 2) (↓ 7) (← 1) (↑ 6) (← 1) (↑ 1)]
           [(→ 4) (↓ 4) (← 3) (↓ 2) (→ 3) (↓ 1) (← 4) (↑ 4) (→ 3) (↑ 2) (← 3) (↑ 1)]
           [(→ 4) (↓ 7) (← 4) (↑ 1) (→ 3) (↑ 2) (← 3) (↑ 1) (→ 3) (↑ 2) (← 3) (↑ 1)]
           [(→ 1) (↓ 3) (→ 2) (↑ 3) (→ 1) (↓ 7) (← 1) (↑ 3) (← 3) (↑ 4)]
           [(→ 4) (↓ 1) (← 3) (↓ 2) (→ 3) (↓ 4) (← 4) (↑ 1) (→ 3) (↑ 2) (← 3) (↑ 4)]
           [(→ 4) (↓ 1) (← 3) (↓ 2) (→ 3) (↓ 4) (← 4) (↑ 7) (⇨ 1) (⇩ 4) (→ 2) (↓ 2) (← 2) (↑ 2)]
           [(→ 4) (↓ 7) (← 1) (↑ 6) (← 3) (↑ 1)]
           [(→ 4) (↓ 7) (← 4) (↑ 7) (⇨ 1) (⇩ 1) (→ 2) (↓ 2) (← 2) (↑ 2) (⇨ 0) (⇩ 3) (→ 2) (↓ 2) (← 2) (↑ 2)]
           [(→ 4) (↓ 7) (← 4) (↑ 1) (→ 3) (↑ 2) (← 3) (↑ 4) (⇨ 1) (⇩ 1) (→ 2) (↓ 2) (← 2) (↑ 2)]])))