(import* ["./modules/base" "./modules/node" "./modules/path" "./modules/sanctuary"]

(let [repl (import "repl")

      base-env (import "./base")
      read (import "./read")
      eval (import "./eval")
      print (import "./print")

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
