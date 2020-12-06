(import* ["./base.js" "./node.js" "./sanctuary.clj" "./prelude.clj"]

(let [path (import "path")

      base (import "./base.js")
      render-document (import "./render-document.clj")
      archives (import "./templates/archives.clj")]

   (pipe [(map (lift-2 (insert :slug)
                       (lambda [filename] (.replace (regex "" "^[^=]+=") "" (.basename filename ".clj" path)))
                       (lambda [filename] (import base filename))))
          (map (join Pair))
          (map (map-left (prop :datetime)))
          (sort-by (compose (compose negate Number) fst))
          (map (map-left (lambda [datetime] (.toFormat "MMMM y" datetime))))
          (group-by (on equals fst))
          (chain (array [] (lambda [head tail] [{:heading (fst head) :posts (map snd (prepend head tail))}])))
          (lambda [sections] (render-document "  " [(archives sections)]))]
         (.slice 3 ("argv" process)))))
