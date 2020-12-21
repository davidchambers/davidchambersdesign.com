(import* ["../src/elements.clj" "../src/components.clj"] {

  :title ["Valid XHTML alternative to " (code "<strike>")]

  :datetime (datetime "2009-03-17" "21:53:00" :Pacific/Auckland)

  :tags ["CSS" "HTML"]

  :body [

    (p
       ["Today I noticed that a page on this site failed validation. "
        (a "http://validator.w3.org/" "W3C's markup validation service") "
         gave the following error:"])

    (code-block :plain-text
       "element \"strike\" undefined")

    (p
       [(code "<strike>") " is not valid XHTML; I'd forgotten the correct
         XHTML markup for this purpose:"])

    (code-block :html
       "my favourite colour is <del>red</del> <ins>white</ins>")

    (p
       ["The above gives:
         my favourite colour is " (del "red") " " (ins "white")])

    (p
       ["It's a good idea to explicitly define the appearance of deleted
         and inserted text in your style sheet:"])

    (code-block :css
       "del { text-decoration: line-through; }
        ins { text-decoration: underline; }")

  ]

})
