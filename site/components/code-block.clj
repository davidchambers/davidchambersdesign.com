(import ["../elements"]

(let [s (require "../sanctuary")]

   (language source-code ->
      (let [lines
              (s/from-maybe [] (s/chain s/init (s/tail (s/lines source-code))))
            trim-leading-spaces
              (line ->
                 (s/from-maybe line
                               (s/chain (s/strip-prefix _ line)
                                        (s/map (s/prop "match")
                                               (s/chain (s/match (s/regex "" "^[ ]*"))
                                                        (s/head lines))))))]
         (pre (code (text (s/unlines (s/map trim-leading-spaces lines)))))))))
