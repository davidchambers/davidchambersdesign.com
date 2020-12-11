(import* ["./base.js"]

(let [path (import "path")]

   {:dirname
      (lambda [filename]
         (.dirname filename path))

    :basename
      (lambda [ext filename]
         (.basename filename ext path))

    :resolve
      (apply ("resolve" path))}))
