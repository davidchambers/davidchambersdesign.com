(import* [:base :prelude :sanctuary]

(let [escape (pipe [(invoke-2 "replace" (regex "g" "&") "&amp;")
                    (invoke-2 "replace" (regex "g" "<") "&lt;")
                    (invoke-2 "replace" (regex "g" ">") "&gt;")])]

   (function render-fragment [indent level inline nodes]
      (++ (map (lambda [node]
                  (if (=== :text (:type node))
                      (escape (:value node))
                      (if (=== :excerpt (:type node))
                          (render-fragment indent level inline (:children node))
                          (let [indentation (invoke-1 "repeat" level indent)
                                tag-name (symbol->string (:tag-name node))
                                attrs (++ (chain (lambda [sym]
                                                    [" "
                                                     (symbol->string sym)
                                                     "=\""
                                                     (escape (unwords (map trim (lines (prop sym (:attrs node))))))
                                                     "\""])
                                                 (Object/getOwnPropertySymbols (:attrs node))))]
                             (++ (if (:self-closing node)
                                     [indentation "<" tag-name attrs " />" (if inline "" "\n")]
                                     (if (=== :inline (:format node))
                                         [indentation "<" tag-name attrs ">"
                                          (render-fragment indent 0 true (:children node))
                                          "</" tag-name ">" (if inline "" "\n")]
                                         [indentation "<" tag-name attrs ">\n"
                                          (render-fragment indent (add 1 level) false (:children node))
                                          indentation "</" tag-name ">\n"])))))))
               nodes)))))
