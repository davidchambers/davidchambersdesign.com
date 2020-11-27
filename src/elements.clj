(import* ["./base.js" "./sanctuary.clj"]

(let
   [block-element
      (lambda [tag-name attrs children]
         {:type :element
          :tag-name tag-name
          :format "block"
          :self-closing false
          :attrs attrs
          :children children})
    inline-element
      (lambda [tag-name attrs children]
         {:type :element
          :tag-name tag-name
          :format (if (any (lambda [node] (equals "block" (:format node))) children)
                      "block"
                      "inline")
          :self-closing false
          :attrs attrs
          :children children})
    self-closing-element
      (lambda [tag-name attrs]
         {:type :element
          :tag-name tag-name
          :format "inline"
          :self-closing true
          :attrs attrs})
    text
      (lambda [value]
         {:type :text
          :value value})
    html!
      (lambda [value]
         {:type :html
          :value value})]

   (invoke "fromEntries"
           [(reduce concat
                    [[:text text] [:html! html!]]
                    [(map (lambda [tag-name] [tag-name (block-element tag-name)])
                          [:article :body :div :footer :head :header :html :nav :ol :ul])
                     (map (lambda [tag-name] [tag-name (inline-element tag-name)])
                          [:a :h1 :h2 :h3 :h4 :h5 :h6 :li :p :script :span :strong :time :title])
                     (map (lambda [tag-name] [tag-name (self-closing-element tag-name)])
                          [:hr :link :meta])])]
           Object)))
