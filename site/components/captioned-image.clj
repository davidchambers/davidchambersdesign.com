(import ["../elements"]

(src alt caption ->
   (dl
      [(dt (img {:alt alt :src src}))
       (dd caption)])))
