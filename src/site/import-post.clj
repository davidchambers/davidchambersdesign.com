(import* [:base]

(let [path (import "path")

      s (import :sanctuary)]

   (lambda [filename]
      (let [post (import (apply path/resolve [__dirname ".." ".." filename]))]
         (Object/fromEntries (s/append [:slug (apply path/basename [filename ".js"])]
                                       (s/map (lambda [symbol] [symbol (s/prop symbol post)])
                                              (Object/getOwnPropertySymbols post))))))))
