(import* ["./base.js" "./sanctuary.clj" "./elements.clj"] {

  :caption
    (lambda [caption]
       (p' {:class "caption"} caption))

  :captioned-image
    (lambda [src alt caption]
       (dl
          [(dt (img {:alt alt :src src}))
           (dd caption)]))

  :captioned-images
    (compose dl (chain (prop :children)))

  :uncaptioned-image
    (lambda [src alt]
       (p (img {:alt alt :src src})))

  :decorative-image
    (lambda [src]
       (p (img {:alt "" :src src})))

  :code-block
    (lambda [language source-code]
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

  :interview-list
    (lambda [interviewer interviewee exchange]
       (ol (.map (uncurry-2 (lambda [quotation index]
                               (if (even index)
                                   (li' (if (equals 0 index) {:class "interviewer"} {})
                                      (concat [(strong (concat interviewer ":")) " "] quotation))
                                   (li' {}
                                      (concat [(strong (concat interviewee ":")) " "] quotation)))))
                 (map canonicalize-children exchange))))

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
