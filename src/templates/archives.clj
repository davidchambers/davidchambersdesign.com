(import* ["../base.js" "../elements.clj" "../sanctuary.clj"]

(let [base        (import "./base.clj")

      marked      (import "marked")]

   (lambda [sections]
      (base [(h1 {} [(text "Archives")])
             (ol {:class "archives"}
                (map (lambda [section]
                        (li {}
                           [(h2 {} [(text (:heading section))])
                            (ol {}
                               (map (lambda [post]
                                       (li {}
                                          [(a {:href (concat "/TK/" (:slug post))}
                                              [(html! (invoke "parseInline" [(:title post)] marked))])
                                           (text " ")
                                           (let [datetime (:datetime post)]
                                              (time {:datetime (invoke "toISO" [] datetime)}
                                                 [(text (concat (invoke "toFormat" ["d MMMM y | h:mm"] datetime)
                                                                (to-lower (invoke "toFormat" ["a"] datetime))))]))]))
                                    (:posts section)))]))
                     sections))]))))
