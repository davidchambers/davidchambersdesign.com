(import* ["./base.js" "./sanctuary.clj" "./prelude.clj"]

(let
   [text
      (lambda [value]
         {:type :text
          :value value})

    replace (lambda [this that text] (.replace this that text))
    canonicalize-children
      (compose (map (when string?
                          (pipe [lines
                                 (fold-map String (replace (regex "" "^[ ]+") " "))
                                 (replace (regex "g" " -- ") "\u2009\u2014\u2009")
                                 text])))
               (unless array? (of Array)))

    block-element
      (lambda [tag-name attrs children]
         {:type :element
          :tag-name tag-name
          :format "block"
          :self-closing false
          :attrs attrs
          :children (canonicalize-children children)})

    inline-element
      (lambda [tag-name attrs children]
         (let [children (canonicalize-children children)]
            {:type :element
             :tag-name tag-name
             :format (if (any (lambda [node] (equals "block" (:format node))) children)
                         "block"
                         "inline")
             :self-closing false
             :attrs attrs
             :children children}))

    self-closing-element
      (lambda [tag-name attrs]
         {:type :element
          :tag-name tag-name
          :format "inline"
          :self-closing true
          :attrs attrs})

    excerpt
      (lambda [children]
         {:type :excerpt
          :children (canonicalize-children children)})]

   {:canonicalize-children canonicalize-children

    :text text
    :excerpt excerpt
    ; The opening and closing tags of each of the following elements
    ; are always rendered on their own lines.
    :article'               (block-element :article)
    :article                (block-element :article {})
    :blockquote'            (block-element :blockquote)
    :blockquote             (block-element :blockquote {})
    :body'                  (block-element :body)
    :body                   (block-element :body {})
    :div                    (block-element :div)
    :dl'                    (block-element :dl)
    :dl                     (block-element :dl {})
    :footer'                (block-element :footer)
    :footer                 (block-element :footer {})
    :head'                  (block-element :head)
    :head                   (block-element :head {})
    :header'                (block-element :header)
    :header                 (block-element :header {})
    :html'                  (block-element :html)
    :html                   (block-element :html {})
    :linearGradient         (block-element :linearGradient)
    :nav'                   (block-element :nav)
    :nav                    (block-element :nav {})
    :object                 (block-element :object)
    :ol'                    (block-element :ol)
    :ol                     (block-element :ol {})
    :svg                    (block-element :svg)
    :ul'                    (block-element :ul)
    :ul                     (block-element :ul {})
    ; The opening and closing tags of each of the following elements
    ; are rendered inline unless the element contains an element
    ; whose opening and closing tags are rendered on their own lines.
    :a'                    (inline-element :a)
    :a      (lambda [href] (inline-element :a {:href href}))
    :aside'                (inline-element :aside)
    :aside                 (inline-element :aside {})
    :code'                 (inline-element :code)
    :code                  (inline-element :code {})
    :dd'                   (inline-element :dd)
    :dd                    (inline-element :dd {})
    :del'                  (inline-element :del)
    :del                   (inline-element :del {})
    :dt'                   (inline-element :dt)
    :dt                    (inline-element :dt {})
    :em'                   (inline-element :em)
    :em                    (inline-element :em {})
    :h1'                   (inline-element :h1)
    :h1                    (inline-element :h1 {})
    :h2'                   (inline-element :h2)
    :h2                    (inline-element :h2 {})
    :h3'                   (inline-element :h3)
    :h3                    (inline-element :h3 {})
    :h4'                   (inline-element :h4)
    :h4                    (inline-element :h4 {})
    :h5'                   (inline-element :h5)
    :h5                    (inline-element :h5 {})
    :h6'                   (inline-element :h6)
    :h6                    (inline-element :h6 {})
    :i'                    (inline-element :i)
    :i                     (inline-element :i {})
    :ins'                  (inline-element :ins)
    :ins                   (inline-element :ins {})
    :li'                   (inline-element :li)
    :li                    (inline-element :li {})
    :p'                    (inline-element :p)
    :p                     (inline-element :p {})
    :pre'                  (inline-element :pre)
    :pre                   (inline-element :pre {})
    :script                (inline-element :script)
    :span                  (inline-element :span)
    :strong'               (inline-element :strong)
    :strong                (inline-element :strong {})
    :time                  (inline-element :time)
    :title'                (inline-element :title)
    :title                 (inline-element :title {})
    ; The following self-closing elements are always rendered inline.
    :hr'                   (self-closing-element :hr)
    :hr                    (self-closing-element :hr {})
    :img                   (self-closing-element :img)
    :link                  (self-closing-element :link)
    :meta                  (self-closing-element :meta)
    :param                 (self-closing-element :param)
    :path                  (self-closing-element :path)
    :stop                  (self-closing-element :stop)}))
