(import* ["./base.js" "./node.js" "./sanctuary.clj" "./prelude.clj"]

(let [path (import "path")

      Future (import "fluture")

      base (import "./base.js")
      eval (import "./eval.js")
      read (import "./read.js")
      print (import "./print.clj")
      read-file (import "./read-file.clj")

      fork ("fork" Future)
      reject ("reject" Future)
      resolve ("resolve" Future)

      filename $2
      dirname (invoke "dirname" [filename] path)
      slug (invoke "replace"
                   [(regex "" "^[^=]+=") ""]
                   (invoke "basename" [filename ".text"] path))]

   (fork ("error" console)
         (compose ("log" console) print)
         (chain (lambda [text]
                   (chain (pair (lambda [rest expr]
                                   (lift-2 concat
                                           (either reject resolve (eval dirname base expr))
                                           (array (reject (new Error ["Failed to find post title"]))
                                                  (lambda [line lines]
                                                     (maybe (reject (new Error ["Failed to find post title"]))
                                                            (lambda [title]
                                                               (resolve {:slug slug
                                                                         :title title
                                                                         :body (invoke "replace"
                                                                                       [(regex "g" " -- ") "\u2009\u2014\u2009"]
                                                                                       (unlines (drop-while (equals "") lines)))}))
                                                            (strip-prefix "# " line)))
                                                  (drop-while (equals "") (lines rest))))))
                          (read text)))
                (read-file filename)))))
