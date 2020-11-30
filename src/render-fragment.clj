(import* ["./base.js" "./prelude.clj" "./sanctuary.clj"]

(let [replace (lambda [this that text] (.replace this that text))]

   (function render [indent level inline nodes]
      (++ (map (lambda [node]
                  (if (=== :text (:type node))
                      (pipe [(replace (regex "g" "&") "&amp;")
                             (replace (regex "g" "<") "&lt;")
                             (replace (regex "g" ">") "&gt;")]
                            (:value node))
                      (if (=== :html (:type node))
                          (:value node)
                          (let [indentation (.repeat level indent)
                                tag-name (symbol->string (:tag-name node))
                                attrs (++ (chain (lambda [sym]
                                                    [" " (symbol->string sym) "=\"" (sym (:attrs node)) "\""])
                                                 (.getOwnPropertySymbols (:attrs node) Object)))]
                             (++ (if (:self-closing node)
                                     [indentation "<" tag-name attrs " />\n"]
                                     (if (equals "inline" (:format node))
                                         [indentation "<" tag-name attrs ">"
                                          (render indent 0 true (:children node))
                                          "</" tag-name ">" (if inline "" "\n")]
                                         [indentation "<" tag-name attrs ">\n"
                                          (render indent (add 1 level) false (:children node))
                                          indentation "</" tag-name ">\n"])))))))
               nodes)))))
