(import* ["./base.js" "./prelude.clj" "./sanctuary.js"]

(let [replace (lambda [this that text] (.replace this that text))
      escape (pipe [(replace (regex "g" "&") "&amp;")
                    (replace (regex "g" "<") "&lt;")
                    (replace (regex "g" ">") "&gt;")])]

   (function render-fragment [indent level inline nodes]
      (++ (map (lambda [node]
                  (if (=== :text (:type node))
                      (escape (:value node))
                      (if (=== :excerpt (:type node))
                          (render-fragment indent level inline (:children node))
                          (let [indentation (.repeat level indent)
                                tag-name (symbol->string (:tag-name node))
                                attrs (++ (chain (lambda [sym]
                                                    [" "
                                                     (symbol->string sym)
                                                     "=\""
                                                     (escape (unwords (map trim (lines (sym (:attrs node))))))
                                                     "\""])
                                                 (.getOwnPropertySymbols (:attrs node) Object)))]
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
