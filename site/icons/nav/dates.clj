(import* ["../../elements" "../../orthogonal"]

(let [s (require "../../sanctuary")

      number-0 [(→  4) (↓  7) (←  4) (↑  7)
                (⇨  1) (⇩  1)
                (→  2) (↓  5) (←  2) (↑  5)]
      number-1 [(→  2) (↓  7) (←  1) (↑  6) (←  1) (↑  1)]
      number-2 [(→  4) (↓  4) (←  3) (↓  2) (→  3) (↓  1)
                (←  4) (↑  4) (→  3) (↑  2) (←  3) (↑  1)]
      number-3 [(→  4) (↓  7) (←  4) (↑  1) (→  3) (↑  2)
                (←  3) (↑  1) (→  3) (↑  2) (←  3) (↑  1)]
      number-4 [(→  1) (↓  3) (→  2) (↑  3) (→  1) (↓  7)
                (←  1) (↑  3) (←  3) (↑  4)]
      number-5 [(→  4) (↓  1) (←  3) (↓  2) (→  3) (↓  4)
                (←  4) (↑  1) (→  3) (↑  2) (←  3) (↑  4)]
      number-6 [(→  4) (↓  1) (←  3) (↓  2) (→  3) (↓  4)
                (←  4) (↑  7)
                (⇨  1) (⇩  4)
                (→  2) (↓  2) (←  2) (↑  2)]
      number-7 [(→  4) (↓  7) (←  1) (↑  6) (←  3) (↑  1)]
      number-8 [(→  4) (↓  7) (←  4) (↑  7)
                (⇨  1) (⇩  1)
                (→  2) (↓  2) (←  2) (↑  2)
                (⇨  0) (⇩  3)
                (→  2) (↓  2) (←  2) (↑  2)]
      number-9 [(→  4) (↓  7) (←  4) (↑  1) (→  3) (↑  2)
                (←  3) (↑  4)
                (⇨  1) (⇩  1)
                (→  2) (↓  2) (←  2) (↑  2)]

      date-1  (s/join [[(⇨  3) (⇩  6)] number-1])
      date-2  (s/join [[(⇨  3) (⇩  6)] number-2])
      date-3  (s/join [[(⇨  3) (⇩  6)] number-3])
      date-4  (s/join [[(⇨  3) (⇩  6)] number-4])
      date-5  (s/join [[(⇨  3) (⇩  6)] number-5])
      date-6  (s/join [[(⇨  3) (⇩  6)] number-6])
      date-7  (s/join [[(⇨  3) (⇩  6)] number-7])
      date-8  (s/join [[(⇨  3) (⇩  6)] number-8])
      date-9  (s/join [[(⇨  3) (⇩  6)] number-9])
      date-10 (s/join [[(⇨  4) (⇩  6)] number-1 [(⇨  4) (⇩  0)] number-0])
      date-11 (s/join [[(⇨  5) (⇩  6)] number-1 [(⇨  4) (⇩  0)] number-1])
      date-12 (s/join [[(⇨  4) (⇩  6)] number-1 [(⇨  4) (⇩  0)] number-2])
      date-13 (s/join [[(⇨  4) (⇩  6)] number-1 [(⇨  4) (⇩  0)] number-3])
      date-14 (s/join [[(⇨  4) (⇩  6)] number-1 [(⇨  4) (⇩  0)] number-4])
      date-15 (s/join [[(⇨  4) (⇩  6)] number-1 [(⇨  4) (⇩  0)] number-5])
      date-16 (s/join [[(⇨  4) (⇩  6)] number-1 [(⇨  4) (⇩  0)] number-6])
      date-17 (s/join [[(⇨  4) (⇩  6)] number-1 [(⇨  4) (⇩  0)] number-7])
      date-18 (s/join [[(⇨  4) (⇩  6)] number-1 [(⇨  4) (⇩  0)] number-8])
      date-19 (s/join [[(⇨  4) (⇩  6)] number-1 [(⇨  4) (⇩  0)] number-9])
      date-20 (s/join [[(⇨  3) (⇩  6)] number-2 [(⇨  6) (⇩  0)] number-0])
      date-21 (s/join [[(⇨  3) (⇩  6)] number-2 [(⇨  6) (⇩  0)] number-1])
      date-22 (s/join [[(⇨  3) (⇩  6)] number-2 [(⇨  6) (⇩  0)] number-2])
      date-23 (s/join [[(⇨  3) (⇩  6)] number-2 [(⇨  6) (⇩  0)] number-3])
      date-24 (s/join [[(⇨  3) (⇩  6)] number-2 [(⇨  6) (⇩  0)] number-4])
      date-25 (s/join [[(⇨  3) (⇩  6)] number-2 [(⇨  6) (⇩  0)] number-5])
      date-26 (s/join [[(⇨  3) (⇩  6)] number-2 [(⇨  6) (⇩  0)] number-6])
      date-27 (s/join [[(⇨  3) (⇩  6)] number-2 [(⇨  6) (⇩  0)] number-7])
      date-28 (s/join [[(⇨  3) (⇩  6)] number-2 [(⇨  6) (⇩  0)] number-8])
      date-29 (s/join [[(⇨  3) (⇩  6)] number-2 [(⇨  6) (⇩  0)] number-9])
      date-30 (s/join [[(⇨  3) (⇩  6)] number-3 [(⇨  6) (⇩  0)] number-0])
      date-31 (s/join [[(⇨  4) (⇩  6)] number-3 [(⇨  6) (⇩  0)] number-1])]

   [0
    (path {:fill-rule :evenodd :fill "#000" :d (render date-1)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-2)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-3)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-4)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-5)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-6)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-7)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-8)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-9)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-10)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-11)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-12)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-13)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-14)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-15)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-16)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-17)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-18)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-19)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-20)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-21)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-22)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-23)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-24)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-25)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-26)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-27)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-28)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-29)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-30)})
    (path {:fill-rule :evenodd :fill "#000" :d (render date-31)})]))
