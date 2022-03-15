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
    (compose dl (chain (lambda [element] (:children element))))

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
       (ol (snd (reduce (pair (lambda [name items quotation]
                                 (if (equals interviewer name)
                                     (Pair interviewee
                                           (append (li' {:class "interviewer"}
                                                      (concat [(strong (concat interviewer ":")) " "] quotation))
                                                   items))
                                     (Pair interviewer
                                           (append (li' {}
                                                      (concat [(strong (concat interviewee ":")) " "] quotation))
                                                   items)))))
                        (Pair interviewer [])
                        (map canonicalize-children exchange)))))

  :pros-and-cons-list
    (lambda [f]
       (ul (f (li' {:class "pro"})
              (li' {:class "con"}))))

  :update
    (lambda [datetime body]
       (div {:class "update"}
          (prepend (h4 ["Update \u2014 "
                        (time {:datetime (invoke-0 "toISO" datetime)}
                           (invoke-1 "toFormat" "d MMMM y" datetime))])
                   (canonicalize-children body))))

})
