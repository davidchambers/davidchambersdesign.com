(let [s (require "./sanctuary")
      screen (require "./css/screen")

      ++ (s/join-with "")

      coerce
        (function coerce [x]
           (if (Array/isArray x)
               (s/unwords (s/map coerce x))
               (if (== "symbol" (typeof x))
                   (Symbol/keyFor x)
                   (String x))))

      split-every-2
        (function split-every-2 [kvs]
           (s/array []
                    (lambda [k] (s/array [] (lambda [v kvs] (s/prepend (s/Pair k v) (split-every-2 kvs)))))
                    kvs))

      vendor-prefixes (lambda [unprefixed prefixed]
                         (s/chain (s/pair (lambda [k v]
                                             (if (=== unprefixed k)
                                                 (s/map (s/flip s/Pair v)
                                                        (s/append unprefixed prefixed))
                                                 [(s/Pair k v)])))))

      vendor-prefixes-border-radius
        (vendor-prefixes :border-radius
                         [:-webkit-border-radius
                          :-moz-border-radius
                          :-ms-border-radius
                          :-o-border-radius])

      vendor-prefixes-box-shadow
        (vendor-prefixes :box-shadow
                         [:-webkit-box-shadow
                          :-moz-box-shadow])

      vendor-prefixes-duration
        (vendor-prefixes :transition-duration
                         [:-webkit-transition-duration
                          :-moz-transition-duration
                          :-o-transition-duration])

      vendor-prefixes-timing-function
        (vendor-prefixes :transition-timing-function
                         [:-webkit-transition-timing-function
                          :-moz-transition-timing-function
                          :-o-transition-timing-function])

      format-block
        (lambda [selector]
           (s/pipe [(s/map (s/pair (lambda [k v] (++ ["  " (coerce k) ": " (coerce v) ";"]))))
                    (s/prepend (s/concat (s/join-with "\n" selector) " {"))
                    (s/append "}")
                    s/unlines]))

      style-sheet (screen coerce)]

   (s/join-with "\n"
                (s/map (lambda [selector]
                          (s/pipe [split-every-2
                                   vendor-prefixes-border-radius
                                   vendor-prefixes-box-shadow
                                   vendor-prefixes-duration
                                   vendor-prefixes-timing-function
                                   (format-block (s/map s/trim (s/lines selector)))]
                                  (s/prop selector style-sheet)))
                       (Object/getOwnPropertyNames style-sheet))))
