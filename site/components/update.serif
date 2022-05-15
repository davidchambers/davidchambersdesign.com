(import ["../elements"]

(let [s (require "../sanctuary")]

   (datetime body ->
      (div {:class "update"}
         (s/prepend (h4 ["Update \u2014 "
                         (time {:datetime (.toISO datetime)}
                            (.toFormat "d MMMM y" datetime))])
                    (canonicalize-children body))))))
