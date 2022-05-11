(let [s (require "./sanctuary")
      screen (require "./css/screen")

      coerce
        (function coerce [x]
           (if (Array.isArray x)
               (s/unwords (s/map coerce x))
               (if (== "symbol" (typeof x))
                   (Symbol.keyFor x)
                   (String x))))

      split-every-2
        (function split-every-2 [kvs]
           (s/array []
                    (lambda [k] (s/array [] (lambda [v kvs] (s/prepend (s/Pair k v) (split-every-2 kvs)))))
                    kvs))

      vendor-prefix (lambda [unprefixed prefixed]
                       (s/chain (s/pair (lambda [k v]
                                           (if (=== unprefixed k)
                                               (s/map (s/Pair _ v)
                                                      (s/append unprefixed prefixed))
                                               [(s/Pair k v)])))))

      vendor-prefixes
        (s/pipe [(vendor-prefix :border-radius
                                [:-webkit-border-radius
                                    :-moz-border-radius
                                     :-ms-border-radius
                                      :-o-border-radius])
                 (vendor-prefix :box-shadow
                                [:-webkit-box-shadow
                                    :-moz-box-shadow])
                 (vendor-prefix :transition-duration
                                [:-webkit-transition-duration
                                    :-moz-transition-duration
                                      :-o-transition-duration])
                 (vendor-prefix :transition-timing-function
                                [:-webkit-transition-timing-function
                                    :-moz-transition-timing-function
                                      :-o-transition-timing-function])])

      format-block
        (lambda [selectors]
           (s/pipe [(s/map (s/pair (lambda [k v] (.join "" ["  " (coerce k) ": " (coerce v) ";"]))))
                    (s/prepend (s/concat (s/join-with ",\n" selectors) " {"))
                    (s/append "}")
                    s/unlines]))]

   (s/pipe [screen
            split-every-2
            (s/map (s/map split-every-2))
            (s/map (s/map vendor-prefixes))
            (s/map (s/pair format-block))
            (s/join-with "\n")]
           coerce))
