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
