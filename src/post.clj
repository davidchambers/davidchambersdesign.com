(import* ["./base.js" "./node.js"]

(let [base (import "./base.js")
      render-document (import "./render-document.clj")
      post (import "./templates/post.clj")]

   (>&1 (render-document "  " [(post (import base (3 ("argv" process))))]))))
