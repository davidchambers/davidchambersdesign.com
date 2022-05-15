(let
   [s (require "./sanctuary")

    escape (s/pipe [(.replace (s/regex "g" "&") "&amp;" _)
                    (.replace (s/regex "g" "<") "&lt;" _)
                    (.replace (s/regex "g" ">") "&gt;" _)])

    text
      (value ->
         {:text [value]
          :render (indent level inline -> (escape value))})

    canonicalize-attrs
      (attrs ->
         (Object.fromEntries (s/map (name ->
                                       (let [value (s/prop name attrs)]
                                          [name
                                           (if (== "symbol" (typeof value))
                                               (Symbol.keyFor value)
                                               (String value))]))
                                    (Object.getOwnPropertySymbols attrs))))

    canonicalize-children
      (s/compose (s/map (child ->
                           (if (== "string" (typeof child))
                               (text (.replace (s/regex "g" " -- ")
                                               "\u2009\u2014\u2009"
                                               (s/fold-map String
                                                           (.replace (s/regex "" "^[ ]+") " " _)
                                                           (s/lines child))))
                               child)))
                 (s/unless Array.isArray Array.of))

    block-element
      (tag-name attrs children ->
         (let [attrs (canonicalize-attrs attrs)
               children (canonicalize-children children)]
            {:format :block
             :text (s/chain (:text _) children)
             :render (indent level inline ->
                        (.join ""
                               [(.repeat level indent)
                                "<"
                                (Symbol.keyFor tag-name)
                                (s/fold-map String
                                            (sym ->
                                               (.join ""
                                                      [" "
                                                       (Symbol.keyFor sym)
                                                       "=\""
                                                       (escape (s/unwords (s/map s/trim (s/lines (s/prop sym attrs)))))
                                                       "\""]))
                                            (Object.getOwnPropertySymbols attrs))
                                ">\n"
                                (s/fold-map String (:render _ indent (+ 1 level) false) children)
                                (.repeat level indent)
                                "</"
                                (Symbol.keyFor tag-name)
                                ">\n"]))}))

    inline-element
      (tag-name attrs children ->
         (let [attrs (canonicalize-attrs attrs)
               children (canonicalize-children children)
               format (if (s/any (node -> (=== :block (:format node))) children)
                          :block
                          :inline)]
            {:format format
             :text (s/chain (:text _) children)
             :render (indent level inline ->
                        (if (=== :inline format)
                            (.join ""
                                   [(.repeat level indent)
                                    "<"
                                    (Symbol.keyFor tag-name)
                                    (s/fold-map String
                                                (sym ->
                                                   (.join ""
                                                          [" "
                                                           (Symbol.keyFor sym)
                                                           "=\""
                                                           (escape (s/unwords (s/map s/trim (s/lines (s/prop sym attrs)))))
                                                           "\""]))
                                                (Object.getOwnPropertySymbols attrs))
                                    ">"
                                    (s/fold-map String (:render _ indent 0 true) children)
                                    "</"
                                    (Symbol.keyFor tag-name)
                                    ">"
                                    (if inline "" "\n")])
                            (.join ""
                                   [(.repeat level indent)
                                    "<"
                                    (Symbol.keyFor tag-name)
                                    (s/fold-map String
                                                (sym ->
                                                   (.join ""
                                                          [" "
                                                           (Symbol.keyFor sym)
                                                           "=\""
                                                           (escape (s/unwords (s/map s/trim (s/lines (s/prop sym attrs)))))
                                                           "\""]))
                                                (Object.getOwnPropertySymbols attrs))
                                    ">\n"
                                    (s/fold-map String (:render _ indent (+ 1 level) false) children)
                                    (.repeat level indent)
                                    "</"
                                    (Symbol.keyFor tag-name)
                                    ">\n"])))}))

    self-closing-element
      (tag-name attrs ->
         (let [attrs (canonicalize-attrs attrs)]
            {:format :inline
             :text []
             :render (indent level inline ->
                        (.join ""
                               [(.repeat level indent)
                                "<"
                                (Symbol.keyFor tag-name)
                                (s/fold-map String
                                            (sym ->
                                               (.join ""
                                                      [" "
                                                       (Symbol.keyFor sym)
                                                       "=\""
                                                       (escape (s/unwords (s/map s/trim (s/lines (s/prop sym attrs)))))
                                                       "\""]))
                                            (Object.getOwnPropertySymbols attrs))
                                " />"
                                (if inline "" "\n")]))}))

    excerpt
      (children ->
         (let [children (canonicalize-children children)]
            {:text (s/chain (:text _) children)
             :render (indent level inline ->
                        (s/fold-map String (:render _ indent level inline) children))}))

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

    :b                      (inline-element :b {})
    :mask                   (block-element :mask)
    :rect                   (self-closing-element :rect)
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
    :a            (href -> (inline-element :a {:href href}))
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
    :stop                  (self-closing-element :stop)})
