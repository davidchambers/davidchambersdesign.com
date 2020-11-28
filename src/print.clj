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
             (let [format "yyyy-MM-dd HH:mm:ss (z)"]
                (paren ["invoke"
                        (print "fromFormat")
                        (print [(invoke "toFormat" [format] x) format {"setZone" true}])
                        (paren [(print "DateTime")
                                (paren ["import" (print "luxon")])])]))
             (if (is $.Object x)
                 (group print "{" "}" (chain (lambda [k] [k (k x)]) (concat (property-names x) (property-symbols x))))
                 (if (is-array x)
                     (group print "[" "]" x)
                     (if (equals "function" (type-of x))
                         "(lambda [...] ...)"
                         (if (equals "symbol" (type-of x))
                             (concat ":" (symbol->string x))
                             (if (equals "string" (type-of x))
                                 ("stringify" JSON x)
                                 (String x)))))))))))
