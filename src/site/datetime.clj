(let [luxon (require "luxon")
      sanctuary (require "sanctuary")

      kebab-case-keys (require "./kebab-case-keys")

      s (kebab-case-keys sanctuary)
      ++ (s/join-with "")]

(lambda [date time zone]
   (apply luxon/DateTime/fromFormat
          [(++ [date " " time " (" (Symbol/keyFor zone) ")"])
           "yyyy-MM-dd HH:mm:ss (z)"
           {"setZone" true}])))
