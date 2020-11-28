(import* ["./base.js" "./node.js" "./sanctuary.clj"]

(let [Future (import "fluture")

      print (import "./print.clj")
      parse-post (import "./parse-post.clj")
      read-file (import "./read-file.clj")

      fork ("fork" Future)
      reject ("reject" Future)
      resolve ("resolve" Future)]

   (compose (fork ("error" console) >&1)
            (lambda [filename]
               (chain (lambda [text]
                         (maybe (reject (new Error ["Failed to parse post"]))
                                (lambda [post] (resolve (concat (print post) "\n")))
                                (parse-post filename text)))
                      (read-file filename)))
            (3 ("argv" process)))))
