(import* ["./base.js" "./prelude.clj"]

(let [fs (import "fs")
      fs-read-dir (curry-2 ("readdir" fs))
      fs-read-file (curry-3 ("readFile" fs))
      fs-write-file (curry-4 ("writeFile" fs))
      node ("node" (import "fluture"))]

   {:read-dir
      (lambda [path]
         (node (fs-read-dir path)))

    :read-file
      (lambda [filename]
         (node (fs-read-file filename "utf8")))

    :write-file
      (lambda [filename data]
         (node (fs-write-file filename data "utf8")))}))
