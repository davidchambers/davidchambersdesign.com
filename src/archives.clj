(import* ["./base.js" "./node.js" "./sanctuary.clj"]

(let [render (import "./render.clj")
      sections (import "./sections.clj")
      archives (import "./templates/archives.clj")]

   (invoke "write"
           [(render "    " 0 false [(archives sections)])]
           ("stdout" process))))
