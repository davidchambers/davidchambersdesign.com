(let [s (require "./sanctuary")

      escape (s/pipe [(.replace (s/regex "g" "&") "&amp;" _)
                      (.replace (s/regex "g" "<") "&lt;" _)
                      (.replace (s/regex "g" ">") "&gt;" _)])]

   (function render-fragment [indent level inline]
      (s/fold-map String
                  (lambda [node]
                     (if (=== :text (:type node))
                         (escape (:value node))
                         (if (=== :excerpt (:type node))
                             (render-fragment indent level inline (:children node))
                             (let [indentation (.repeat level indent)
                                   tag-name (Symbol.keyFor (:tag-name node))
                                   attrs (s/fold-map String
                                                     (lambda [sym]
                                                        (.join ""
                                                               [" "
                                                                (Symbol.keyFor sym)
                                                                "=\""
                                                                (escape (s/unwords (s/map s/trim (s/lines (s/prop sym (:attrs node))))))
                                                                "\""]))
                                                     (Object.getOwnPropertySymbols (:attrs node)))]
                                (if (:self-closing node)
                                    (.join "" [indentation "<" tag-name attrs " />" (if inline "" "\n")])
                                    (if (=== :inline (:format node))
                                        (.join ""
                                               [indentation "<" tag-name attrs ">"
                                                (render-fragment indent 0 true (:children node))
                                                "</" tag-name ">" (if inline "" "\n")])
                                        (.join ""
                                               [indentation "<" tag-name attrs ">\n"
                                                (render-fragment indent (+ 1 level) false (:children node))
                                                indentation "</" tag-name ">\n"]))))))))))
