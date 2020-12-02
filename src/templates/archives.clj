(import* ["../base.js" "../sanctuary.clj" "../elements.clj"]

(let [base (import "./base.clj")
      parse-inline ("parseInline" (import "marked"))]

   (lambda [sections]
      (base "Archives"
            [(h1 "Archives")
             (ol' {:class "archives"}
                (map (lambda [section]
                        (li
                           [(h2 (:heading section))
                            (ol
                               (map (lambda [post]
                                       (li
                                          [(a {:href (concat "/TK/" (:slug post))}
                                              [(html! (parse-inline (:title post)))])
                                           " "
                                           (let [datetime (:datetime post)]
                                              (time {:datetime (.toISO datetime)}
                                                 (concat (.toFormat "d MMMM y | h:mm" datetime)
                                                         (to-lower (.toFormat "a" datetime)))))]))
                                    (:posts section)))]))
                     sections))]))))
