(import* ["../elements"]

(let [luxon (require "../luxon")
      s (require "../sanctuary")]

   (lambda [datetime body]
      (div {:class "update"}
         (s/prepend (h4 ["Update \u2014 "
                         (time {:datetime (luxon/to-iso datetime)}
                            (luxon/to-format "d MMMM y" datetime))])
                    (canonicalize-children body))))))
