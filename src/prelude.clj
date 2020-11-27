(import* ["./base.js" "./sanctuary.clj"]

(let [$ (import "sanctuary-def")
      $.Object ("Object" $)]

   {:string->symbol ("for" Symbol)
    :symbol->string (lambda [sym] (invoke "slice" [("length" "Symbol(") (- ("length" ")") 0)] (String sym)))

    :curry-2 (lambda [f x y] (apply f [x y]))
    :curry-3 (lambda [f x y z] (apply f [x y z]))

    :concat (lambda [m1 m2] (if (is $.Object m1) (invoke "assign" [{} m1 m2] Object) (concat m1 m2)))
    :insert (lambda [key val obj] (invoke "assign" [{} obj (invoke "fromEntries" [[[key val]]] Object)] Object))}))
