(import* ["../elements"]

(lambda [f]
   (ul (f (li' {:class "pro"})
          (li' {:class "con"})))))
