(import* [:path :prelude]

(lambda [filename]
   (insert :slug
           (basename ".js" filename)
           (import (resolve [__dirname ".." ".." filename])))))
