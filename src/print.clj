(import* ["./base.js" "./sanctuary.clj" "./prelude.clj"]

(let [DateTime ("DateTime" (import "luxon"))
      $.Object ("Object" (import "sanctuary-def"))
      is-array ("isArray" Array)
      property-names ("getOwnPropertyNames" Object)
      property-symbols ("getOwnPropertySymbols" Object)]

   (function print [x]
      (let [group (lambda [f prefix suffix]
                     (pipe [(map f)
                            (join-with " ")
                            (concat prefix)
                            (flip concat suffix)]))
            paren (group I "(" ")")]
         (if (instance-of DateTime x)
             (paren ["datetime"
                     (print (.toFormat "yyyy-MM-dd" x))
                     (print (.toFormat "HH:mm:ss" x))
                     (print (string->symbol ("zoneName" x)))])
             (if (is $.Object x)
                 (group print "{" "}" (chain (lambda [k] [k (k x)]) (concat (property-names x) (property-symbols x))))
                 (if (is-array x)
                     (group print "[" "]" x)
                     (if (=== "Pair" ("name" (type x)))
                         (pair (lambda [fst snd] (paren ["Pair" (print fst) (print snd)])) x)
                         (if (=== "Maybe" ("name" (type x)))
                             (maybe "Nothing" (lambda [x] (paren ["Just" (print x)])) x)
                             (if (=== "Either" ("name" (type x)))
                                 (either (lambda [x] (paren ["Left" (print x)]))
                                         (lambda [x] (paren ["Right" (print x)]))
                                         x)
                                 (if (equals "function" (type-of x))
                                     "(lambda [...] ...)"
                                     (if (equals "symbol" (type-of x))
                                         (concat ":" (symbol->string x))
                                         (if (equals "string" (type-of x))
                                             ("stringify" JSON x)
                                             (String x))))))))))))))
