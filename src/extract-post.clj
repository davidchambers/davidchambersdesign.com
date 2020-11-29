(import* ["./base.js" "./node.js" "./sanctuary.clj"]

(let [Future (import "fluture")

      print (import "./print.clj")
      parse-post (import "./parse-post.clj")
      read-file (import "./read-file.clj")

      fork ("fork" Future)
      reject ("reject" Future)
      resolve ("resolve" Future)]

   (compose (K "")
            (lambda [filename]
               (fork ("error" console)
                     ("log" console)
                     (chain (compose (maybe (reject (new Error ["Failed to parse post"]))
                                            (compose resolve print))
                                     (parse-post filename))
                            (read-file filename))))
            $2)))
