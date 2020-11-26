(import* ["./base.js"]

{:string->symbol ("for" Symbol)
 :symbol->string (lambda [sym] (invoke "slice" [("length" "Symbol(") (- ("length" ")") 0)] (String sym)))})
