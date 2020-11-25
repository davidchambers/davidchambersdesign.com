(let [str (join-with "")]
   (function render [indent level inline nodes]
      (str (map (lambda [node]
                   (if (equals "string" (typeof node))
                       (invoke "replace"
                               [(regex "g" ">") "&gt;"]
                               (invoke "replace"
                                       [(regex "g" "<") "&lt;"]
                                       (invoke "replace"
                                               [(regex "g" "&") "&amp;"]
                                               node)))
                       (let [indentation (invoke "repeat" [level] indent)
                             tag-name (symbol->string (:tag-name node))
                             attrs (str (map (lambda [sym]
                                                (str [" " (symbol->string sym) "=\"" (sym (:attrs node)) "\""]))
                                             (invoke "getOwnPropertySymbols" [(:attrs node)] Object)))]
                          (str (if (:self-closing node)
                                   [indentation "<" tag-name attrs " />\n"]
                                   (if (equals "inline" (:format node))
                                       [indentation "<" tag-name attrs ">"
                                        (render indent 0 true (:children node))
                                        "</" tag-name ">" (if inline "" "\n")]
                                       [indentation "<" tag-name attrs ">\n"
                                        (render indent (add 1 level) false (:children node))
                                        indentation "</" tag-name ">\n"]))))))
                nodes))))