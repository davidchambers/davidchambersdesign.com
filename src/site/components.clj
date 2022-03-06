(import* [:base :sanctuary "./elements"] {

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
       (pre (code (text source-code))))

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
