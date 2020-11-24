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

   {:body     (block-element "body")
    :div      (block-element "div")
    :head     (block-element "head")
    :html     (block-element "html")
    :nav      (block-element "nav")
    :ol       (block-element "ol")
    :ul       (block-element "ul")

    :a        (inline-element "a")
    :h1       (inline-element "h1")
    :h2       (inline-element "h2")
    :h3       (inline-element "h3")
    :h4       (inline-element "h4")
    :h5       (inline-element "h5")
    :h6       (inline-element "h6")
    :li       (inline-element "li")
    :p        (inline-element "p")
    :span     (inline-element "span")
    :strong   (inline-element "strong")
    :time     (inline-element "time")

    :hr       (self-closing-element "hr")
    :link     (self-closing-element "link")})
