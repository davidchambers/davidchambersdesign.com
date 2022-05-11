(let [luxon (require "luxon")]

   (lambda [date time zone]
      (.fromFormat (.join "" [date " " time " (" (Symbol.keyFor zone) ")"])
                   "yyyy-MM-dd HH:mm:ss (z)"
                   {"setZone" true}
                   luxon.DateTime)))
