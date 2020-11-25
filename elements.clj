(let
   [block-element
      (lambda [tag-name attrs children]
              {:tag-name tag-name
               :format "block"
               :self-closing false
               :attrs attrs
               :children children})
    inline-element
      (lambda [tag-name attrs children]
              {:tag-name tag-name
               :format (if (any (lambda [node] (equals "block" (:format node))) children)
                           "block"
                           "inline")
               :self-closing false
               :attrs attrs
               :children children})
    self-closing-element
      (lambda [tag-name attrs]
              {:tag-name tag-name
               :format "inline"
               :self-closing true
               :attrs attrs})]

   (invoke "fromEntries"
           [(reduce concat
                    []
                    [(map (lambda [tag-name] [tag-name (block-element tag-name)])
                          [:body :div :head :html :nav :ol :ul])
                     (map (lambda [tag-name] [tag-name (inline-element tag-name)])
                          [:a :h1 :h2 :h3 :h4 :h5 :h6 :li :p :span :strong :time])
                     (map (lambda [tag-name] [tag-name (self-closing-element tag-name)])
                          [:hr :link])])]
           Object))
