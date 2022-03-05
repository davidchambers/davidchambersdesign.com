(import* ["../lang/modules/base" "../lang/modules/sanctuary" "../lang/modules/prelude"]

(let [screen (import "./css/screen")

      coerce
        (function coerce [x]
           (if (array? x)
               (unwords (map coerce x))
               (if (symbol? x)
                   (symbol->string x)
                   (String x))))

      split-every-2
        (function split-every-2 [kvs]
           (array []
                  (lambda [k] (array [] (lambda [v kvs] (prepend (Pair k v) (split-every-2 kvs)))))
                  kvs))

      vendor-prefixes (lambda [unprefixed prefixed]
                         (chain (pair (lambda [k v]
                                         (if (=== unprefixed k)
                                             (map (flip Pair v)
                                                  (append unprefixed prefixed))
                                             [(Pair k v)])))))

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
           (pipe [(map (pair (lambda [k v] (++ ["  " (coerce k) ": " (coerce v) ";"]))))
                  (prepend (concat (join-with "\n" selector) " {"))
                  (append ("}"))
                  unlines]))]

   (join-with "\n"
              (map (pair (lambda [selector]
                            (pipe [split-every-2
                                   vendor-prefixes-border-radius
                                   vendor-prefixes-box-shadow
                                   vendor-prefixes-duration
                                   vendor-prefixes-timing-function
                                   (format-block selector)])))
                   (reduce-object (lambda [k v o] (append (Pair (map trim (lines k)) v) o))
                                  []
                                  (screen coerce))))))
