(import* ["./base.js" "./node.js"]

(let [metadata (import "./metadata.clj")]
   (invoke "log"
           [(metadata "date: 22 August 2008\ntime: 1:56am\nzone: Pacific/Auckland\ntags: design, typography, video\n\nText.\n")]
           console)))
