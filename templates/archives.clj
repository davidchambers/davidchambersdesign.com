(import* ["../elements.clj" "./base.clj"]
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
                                              (time {:datetime (invoke "toISO" [] datetime)}
                                                 [(invoke "toFormat" ["d MMMM y | h:mm"] datetime)
                                                  (to-lower (invoke "toFormat" ["a"] datetime))]))]))
                                    (:posts section)))]))
                     sections))])))
