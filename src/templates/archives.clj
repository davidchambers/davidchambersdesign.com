(import* ["../base.js" "../sanctuary.clj" "../elements.clj"]

(let [base (import "./base.clj")
      parse-inline ("parseInline" (import "marked"))]

   (lambda [sections]
      (base "Archives"
            [(h1 {} [(text "Archives")])
             (ol {:class "archives"}
                (map (lambda [section]
                        (li {}
                           [(h2 {} [(text (:heading section))])
                            (ol {}
                               (map (lambda [post]
                                       (li {}
                                          [(a {:href (concat "/TK/" (:slug post))}
                                              [(html! (parse-inline (:title post)))])
                                           (text " ")
                                           (let [datetime (:datetime post)]
                                              (time {:datetime (invoke "toISO" [] datetime)}
                                                 [(text (concat (invoke "toFormat" ["d MMMM y | h:mm"] datetime)
                                                                (to-lower (invoke "toFormat" ["a"] datetime))))]))]))
                                    (:posts section)))]))
                     sections))]))))
