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
      dirname (.dirname filename path)
      slug (.replace (regex "" "^[^=]+=") "" (.basename filename ".clj" path))]

   (pipe [read-file
          (chain (pipe [read
                        (map snd)
                        (chain (eval dirname base))
                        (either reject resolve)]))
          (map (insert :slug slug))
          (map print)
          (fork ("error" console) ("log" console))]
         filename)))
