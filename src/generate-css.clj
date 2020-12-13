(import* ["./sanctuary.clj" "./prelude.clj"]

(let [screen (import "./css/screen.clj")

      pairs (lambda [object]
               (let [names (.getOwnPropertyNames object Object)
                     symbols (.getOwnPropertySymbols object Object)]
                  (map (lambda [key] (Pair key (key object)))
                       (concat names symbols))))

      coerce (function coerce [x]
                (if (array? x)
                    (unwords (map coerce x))
                    (if (symbol? x)
                        (symbol->string x)
                        (String x))))]

   (join-with "\n"
              (map (pair (lambda [selector declarations]
                            (pipe [(unfoldr (lift-2 (lift-2 Pair) (take 2) (drop 2)))
                                   (chain (lambda [declaration]
                                             (if (=== :border-radius (0 declaration))
                                                 (map (flip prepend [(1 declaration)])
                                                      [:-webkit-border-radius
                                                       :-moz-border-radius
                                                       :-ms-border-radius
                                                       :-o-border-radius
                                                       :border-radius])
                                                 [declaration])))
                                   (chain (lambda [declaration]
                                             (if (=== :box-shadow (0 declaration))
                                                 (map (flip prepend [(1 declaration)])
                                                      [:-webkit-box-shadow
                                                       :-moz-box-shadow
                                                       :box-shadow])
                                                 [declaration])))
                                   (chain (lambda [declaration]
                                             (if (=== :transition-duration (0 declaration))
                                                 (map (flip prepend [(1 declaration)])
                                                      [:-webkit-transition-duration
                                                       :-moz-transition-duration
                                                       :-o-transition-duration
                                                       :transition-duration])
                                                 [declaration])))
                                   (chain (lambda [declaration]
                                             (if (=== :transition-timing-function (0 declaration))
                                                 (map (flip prepend [(1 declaration)])
                                                      [:-webkit-transition-timing-function
                                                       :-moz-transition-timing-function
                                                       :-o-transition-timing-function
                                                       :transition-timing-function])
                                                 [declaration])))
                                   (map (lambda [declaration]
                                           (++ ["  "
                                                (coerce (0 declaration))
                                                ": "
                                                (coerce (1 declaration))
                                                ";"])))
                                   (prepend (concat (join-with "\n" (map trim (lines selector))) " {"))
                                   (append "}")
                                   unlines]
                                  declarations)))
                   (pairs (screen coerce))))))
