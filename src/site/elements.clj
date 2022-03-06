(import* [:base :sanctuary :prelude]

(let
   [text
      (lambda [value]
         {:type :text
          :value value})

    canonicalize-attrs
      (reduce-object
         (lambda [k v] (insert k (if-else symbol? symbol->string String v)))
         {})

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
          :format :block
          :self-closing false
          :attrs (canonicalize-attrs attrs)
          :children (canonicalize-children children)})

    inline-element
      (lambda [tag-name attrs children]
         (let [children (canonicalize-children children)]
            {:type :element
             :tag-name tag-name
             :format (if (any (lambda [node] (=== :block (:format node))) children)
                         :block
                         :inline)
             :self-closing false
             :attrs (canonicalize-attrs attrs)
             :children children}))

    self-closing-element
      (lambda [tag-name attrs]
         {:type :element
          :tag-name tag-name
          :format :inline
          :self-closing true
          :attrs (canonicalize-attrs attrs)})

    excerpt
      (lambda [children]
         {:type :excerpt
          :children (canonicalize-children children)})

    ; 4.1 The document element
    html' (block-element :html)

    ; 4.2 Document metadata
    head' (block-element :head)
    title' (inline-element :title)
    base (self-closing-element :base)
    link (self-closing-element :link)
    meta (self-closing-element :meta)
    style' (block-element :style)

    ; 4.3 Sections
    body' (block-element :body)
    article' (block-element :article)
    section' (block-element :section)
    nav' (block-element :nav)
    aside' (inline-element :aside)
    h1' (inline-element :h1)
    h2' (inline-element :h2)
    h3' (inline-element :h3)
    h4' (inline-element :h4)
    h5' (inline-element :h5)
    h6' (inline-element :h6)
    hgroup' (block-element :hgroup)
    header' (block-element :header)
    footer' (block-element :footer)
    address' (block-element :address)

    ; 4.4 Grouping content
    p' (inline-element :p)
    hr' (self-closing-element :hr)
    pre' (inline-element :pre)
    blockquote' (block-element :blockquote)
    ol' (block-element :ol)
    ul' (block-element :ul)
    menu' (block-element :menu)
    li' (inline-element :li)
    dl' (block-element :dl)
    dt' (inline-element :dt)
    dd' (inline-element :dd)
    figure' (block-element :figure)
    figcaption' (block-element :figcaption)
    main' (block-element :main)
    div (block-element :div)]

   {:canonicalize-children canonicalize-children

    :text text
    :excerpt excerpt
    ; The opening and closing tags of each of the following elements
    ; are always rendered on their own lines.
    :article'               article'
    :article                (article' {})
    :blockquote'            blockquote'
    :blockquote             (blockquote' {})
    :body'                  body'
    :body                   (body' {})
    :div                    div
    :dl'                    dl'
    :dl                     (dl' {})
    :footer'                footer'
    :footer                 (footer' {})
    :head'                  head'
    :head                   (head' {})
    :header'                header'
    :header                 (header' {})
    :html'                  html'
    :html                   (html' {})
    :linearGradient         (block-element :linearGradient)
    :nav'                   nav'
    :nav                    (nav' {})
    :object                 (block-element :object)
    :ol'                    ol'
    :ol                     (ol' {})
    :svg                    (block-element :svg)
    :ul'                    ul'
    :ul                     (ul' {})
    ; The opening and closing tags of each of the following elements
    ; are rendered inline unless the element contains an element
    ; whose opening and closing tags are rendered on their own lines.
    :a'                    (inline-element :a)
    :a      (lambda [href] (inline-element :a {:href href}))
    :aside'                aside'
    :aside                 (aside' {})
    :code'                 (inline-element :code)
    :code                  (inline-element :code {})
    :dd'                   dd'
    :dd                    (dd' {})
    :del'                  (inline-element :del)
    :del                   (inline-element :del {})
    :dt'                   dt'
    :dt                    (dt' {})
    :em'                   (inline-element :em)
    :em                    (inline-element :em {})
    :h1'                   h1'
    :h1                    (h1' {})
    :h2'                   h2'
    :h2                    (h2' {})
    :h3'                   h3'
    :h3                    (h3' {})
    :h4'                   h4'
    :h4                    (h4' {})
    :h5'                   h5'
    :h5                    (h5' {})
    :h6'                   h6'
    :h6                    (h6' {})
    :i'                    (inline-element :i)
    :i                     (inline-element :i {})
    :ins'                  (inline-element :ins)
    :ins                   (inline-element :ins {})
    :li'                   li'
    :li                    (li' {})
    :p'                    p'
    :p                     (p' {})
    :pre'                  pre'
    :pre                   (pre' {})
    :script                (inline-element :script)
    :span                  (inline-element :span)
    :strong'               (inline-element :strong)
    :strong                (inline-element :strong {})
    :time                  (inline-element :time)
    :title'                title'
    :title                 (title' {})
    :var'                  (inline-element :var)
    :var                   (inline-element :var {})
    :video                 (inline-element :video)
    ; The following self-closing elements are always rendered inline.
    :embed                 (self-closing-element :embed)
    :hr'                   hr'
    :hr                    (hr' {})
    :img                   (self-closing-element :img)
    :link                  link
    :meta                  meta
    :param                 (self-closing-element :param)
    :path                  (self-closing-element :path)
    :stop                  (self-closing-element :stop)}))
