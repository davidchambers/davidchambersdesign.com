(import* ["./elements.clj" "./sanctuary.clj"] {

  :captioned-image
    (lambda [src alt caption]
       (dl
          [(dt (img {:alt alt :src src}))
           (dd caption)]))

  :code-block
    (lambda [source-code]
       (let [lines (lines source-code)
             head (0 lines)
             tail (.slice 1 lines)
             min-indent (array 0
                               (reduce min)
                               (map (props ["match" "length"])
                                    (justs (map (match (regex "" "^[ ]*(?=\\S)"))
                                                tail))))]
          (pre (code (text (join-with "\n"
                                      (prepend head
                                               (map (lambda [line]
                                                       (.slice min-indent line))
                                                    tail))))))))

})
