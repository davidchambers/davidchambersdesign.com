(let [luxon (require "luxon")

      s (require "./sanctuary")

      ++ (s.join-with "")]

   {"datetime" (lambda [date time zone]
                  (apply luxon.DateTime.fromFormat
                         [(++ [date " " time " (" (Symbol.keyFor zone) ")"])
                          "yyyy-MM-dd HH:mm:ss (z)"
                          {"setZone" true}]))

    "to-iso" (invoke-0 "toISO")

    "to-format" (invoke-1 "toFormat")})
