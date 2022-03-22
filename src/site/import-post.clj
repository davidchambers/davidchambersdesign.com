(import* [:base]

(let [path (import "path")

      sanctuary (import "sanctuary")

      kebab-case-keys (import "./kebab-case-keys")

      s (kebab-case-keys sanctuary)]

   (lambda [filename]
      (let [post (import (apply path/resolve [__dirname ".." ".." filename]))]
         (Object/fromEntries (s/append [:slug (apply path/basename [filename ".js"])]
                                       (s/map (lambda [symbol] [symbol (s/prop symbol post)])
                                              (Object/getOwnPropertySymbols post))))))))
