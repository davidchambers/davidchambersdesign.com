(import ["../elements"]

(let [s (require "../sanctuary")]

   (images -> (dl (s/chain (image -> (let [src (0 image)
                                           alt (1 image)
                                           cap (2 image)]
                                        [(dt (img {:alt alt :src src}))
                                         (dd cap)]))
                           images)))))
