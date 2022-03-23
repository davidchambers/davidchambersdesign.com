(import* ["./elements"]

   (let [sanctuary (require "sanctuary")

         kebab-case-keys (require "./kebab-case-keys")

         s (kebab-case-keys sanctuary)]

      {:caption
         (lambda [caption]
            (p' {:class "caption"} caption))

       :captioned-image
         (lambda [src alt caption]
            (dl
               [(dt (img {:alt alt :src src}))
                (dd caption)]))

       :captioned-images
         (s/compose dl (s/chain (lambda [element] (:children element))))

       :uncaptioned-image
         (lambda [src alt]
            (p (img {:alt alt :src src})))

       :decorative-image
         (lambda [src]
            (p (img {:alt "" :src src})))

       :code-block
         (lambda [language source-code]
            (let [lines
                    (s/from-maybe [] (s/chain s/init (s/tail (s/lines source-code))))
                  trim-leading-spaces
                    (lambda [line]
                       (s/from-maybe line
                                     (s/chain (s/flip s/strip-prefix line)
                                              (s/map (s/prop "match")
                                                     (s/chain (s/match (s/regex "" "^[ ]*"))
                                                              (s/head lines))))))]
               (pre (code (text (s/unlines (s/map trim-leading-spaces lines)))))))

       :interview-list
         (lambda [interviewer interviewee exchange]
            (ol (s/snd (s/reduce (s/pair (lambda [name items quotation]
                                            (if (s/equals interviewer name)
                                                (s/Pair interviewee
                                                        (s/append (li' {:class "interviewer"}
                                                                     (s/concat [(strong (s/concat interviewer ":")) " "] quotation))
                                                                  items))
                                                (s/Pair interviewer
                                                        (s/append (li' {}
                                                                     (s/concat [(strong (s/concat interviewee ":")) " "] quotation))
                                                                  items)))))
                                 (s/Pair interviewer [])
                                 (s/map canonicalize-children exchange)))))

       :pros-and-cons-list
         (lambda [f]
            (ul (f (li' {:class "pro"})
                   (li' {:class "con"}))))

       :update
         (lambda [datetime body]
            (div {:class "update"}
               (s/prepend (h4 ["Update \u2014 "
                               (time {:datetime (invoke-0 "toISO" datetime)}
                                  (invoke-1 "toFormat" "d MMMM y" datetime))])
                          (canonicalize-children body))))}))
