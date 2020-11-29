(import* ["./base.js" "./node.js"]

(let [base (import "./base.js")
      render-document (import "./render-document.clj")
      post (import "./templates/post.clj")]

   (render-document "  " [(post (import base $2))])))
