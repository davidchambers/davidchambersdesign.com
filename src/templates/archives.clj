(import* ["../base.js" "../sanctuary.clj" "../elements.clj"]

(let [base (import "./base.clj")]

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
                                          [(a' {:href (concat "/" (:slug post))} (:title post))
                                           " "
                                           (let [datetime (:datetime post)]
                                              (time {:datetime (.toISO datetime)}
                                                 (concat (.toFormat "d MMMM y | h:mm" datetime)
                                                         (to-lower (.toFormat "a" datetime)))))]))
                                    (:posts section)))]))
                     sections))]))))
