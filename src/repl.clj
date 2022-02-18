(import* ["./base.js" "./node.js" "./path.clj" "./sanctuary.js"]

(let [repl (import "repl")

      base-env (import "./base.js")
      read (import "./read.js")
      eval (import "./eval.js")
      print (import "./print.clj")

      Recoverable ("Recoverable" repl)]

   (.start {"eval" (uncurry-4 (lambda [input context filename callback]
                                 (either (lambda [error]
                                            (if (equals (new SyntaxError ["Unexpected end of input"]) error)
                                                (callback (new Recoverable [error]))
                                                (callback error)))
                                         (lambda [value]
                                            (apply callback [null value]))
                                         (chain (eval (dirname filename) base-env)
                                                (map snd (read input))))))
            "writer" print}
           repl)))
