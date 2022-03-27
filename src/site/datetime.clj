(let [luxon (require "luxon")

      s (require "./sanctuary")

      ++ (s/join-with "")]

(lambda [date time zone]
   (apply luxon/DateTime/fromFormat
          [(++ [date " " time " (" (Symbol/keyFor zone) ")"])
           "yyyy-MM-dd HH:mm:ss (z)"
           {"setZone" true}])))
