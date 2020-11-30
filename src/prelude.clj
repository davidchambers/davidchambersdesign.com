(import* ["./base.js" "./sanctuary.clj"]

(let [$ (import "sanctuary-def")
      $.Object ("Object" $)]

   {:string->symbol ("for" Symbol)
    :symbol->string (lambda [sym] (.slice ("length" "Symbol(") (- ("length" ")") 0) (String sym)))

    :curry-2 (lambda [f a b] (apply f [a b]))
    :curry-3 (lambda [f a b c] (apply f [a b c]))
    :curry-4 (lambda [f a b c d] (apply f [a b c d]))
    :curry-5 (lambda [f a b c d e] (apply f [a b c d e]))

    :++ (join-with "")

    :concat (lambda [m1 m2] (if (is $.Object m1) (.assign {} m1 m2 Object) (concat m1 m2)))
    :insert (lambda [key val obj] (.assign {} obj (.fromEntries [[key val]] Object) Object))}))
