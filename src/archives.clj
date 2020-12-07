(import* ["./base.js" "./node.js" "./sanctuary.clj" "./prelude.clj" "./elements.clj"]

(let [path (import "path")

      base-env (import "./base.js")
      render-document (import "./render-document.clj")
      base-template (import "./templates/base.clj")]

   (pipe [(map (lift-2 (insert :slug)
                       (lambda [filename] (.replace (regex "" "^[^=]+=") "" (.basename filename ".clj" path)))
                       (lambda [filename] (import base-env filename))))
          (map (join Pair))
          (map (map-left (prop :datetime)))
          (sort-by (compose (compose negate Number) fst))
          (map (map-left (lambda [datetime] (.toFormat "MMMM y" datetime))))
          (group-by (on equals fst))
          (chain (array [] (lambda [head tail] [{:heading (fst head) :posts (map snd (prepend head tail))}])))
          (lambda [sections]
             (render-document
                "  "
                [(base-template
                    "Archives"
                    [(h1 "Archives")
                     (ol' {:class "archives"}
                        (map (lambda [section]
                                (li
                                   [(h2 (:heading section))
                                    (ol
                                       (map (lambda [post]
                                               (li
                                                  [(a' {:href (concat "/" (:slug post))} (:title post))
                                                   " "
                                                   (let [datetime (:datetime post)]
                                                      (time {:datetime (.toISO datetime)}
                                                         (concat (.toFormat "d MMMM y | h:mm" datetime)
                                                                 (to-lower (.toFormat "a" datetime)))))]))
                                            (:posts section)))]))
                             sections))])]))]
         (.slice 3 ("argv" process)))))
