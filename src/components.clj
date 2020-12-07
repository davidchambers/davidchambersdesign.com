(import* ["./sanctuary.clj" "./elements.clj"] {

  :caption
    (lambda [caption]
       (p' {:class "caption"} caption))

  :captioned-image
    (lambda [src alt caption]
       (dl
          [(dt (img {:alt alt :src src}))
           (dd caption)]))

  :captioned-images
    (compose dl
             (chain (lambda [triple]
                       (let [src (0 triple)
                             alt (1 triple)
                             cap (2 triple)]
                          [(dt (img {:alt alt :src src}))
                           (dd cap)]))))

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

  :pros-and-cons-list
    (lambda [f]
       (ul (f (li' {:class "pro"})
              (li' {:class "con"}))))

  :update
    (lambda [datetime body]
       (div {:class "update"}
          (prepend (h4 ["Update \u2014 "
                        (time {:datetime (.toISO datetime)}
                           (.toFormat "d MMMM y" datetime))])
                   (canonicalize-children body))))

})
