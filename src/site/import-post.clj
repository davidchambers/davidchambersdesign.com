(import* [:base]

(let [path (require "path")

      sanctuary (require "sanctuary")

      kebab-case-keys (require "./kebab-case-keys")

      s (kebab-case-keys sanctuary)]

   (lambda [filename]
      (let [post (require (apply path/resolve [__dirname ".." ".." filename]))]
         (Object/fromEntries (s/append [:slug (apply path/basename [filename ".js"])]
                                       (s/map (lambda [symbol] [symbol (s/prop symbol post)])
                                              (Object/getOwnPropertySymbols post))))))))
