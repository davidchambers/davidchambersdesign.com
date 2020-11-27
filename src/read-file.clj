(import* ["./base.js" "./prelude.clj"]

(let [fs-read-file (curry-3 ("readFile" (import "fs")))
      node ("node" (import "fluture"))]

   (lambda [filename] (node (fs-read-file filename "utf8")))))
