(import* ["./base.js" "./node.js" "./sanctuary.clj"]

(let [base (import "./base.js")
      render-document (import "./render-document.clj")
      archives (import "./templates/archives.clj")]

   (pipe [(map (lambda [filename] (import base filename)))
          (sort-by (lambda [post] (Number (:datetime post))))
          (group-by (on equals (lambda [post] (.toFormat "y-MM" (:datetime post)))))
          (map (lambda [posts] {:heading (.toFormat "MMMM y" (:datetime (0 posts))) :posts posts}))
          (lambda [sections] (render-document "  " [(archives sections)]))]
         (.slice 3 ("argv" process)))))
