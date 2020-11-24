(import ["../elements.clj" "./base.clj"]
   (lambda [sections]
      (base [(h1 {} ["Archives"])
             (ol {:class "archives"}
                (map (lambda [section]
                        (li {}
                           [(h2 {} [(:heading section)])
                            (ol {}
                               (map (lambda [post]
                                       (li {}
                                          [(a {:href (concat "/TK/" (:slug post))} [(:title post)])
                                           " "
                                           (let [datetime (:datetime post)]
                                              (time {:datetime (iso datetime)}
                                                 [(format-datetime "d MMMM y | h:mm" datetime)
                                                  (to-lower (format-datetime "a" datetime))]))]))
                                    (:posts section)))]))
                     sections))])))
