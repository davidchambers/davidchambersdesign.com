(import* [:base "../elements" "../components"] {

  :id 81

  :title "Mapping file extensions to Emacs syntax modes"

  :datetime (datetime "2011-02-18" "23:15:00" :America/Los_Angeles)

  :tags [:emacs :syntax-highlighting]

  :body [

    (p
       ["I spent much of my day at work editing Django templates in Emacs,
         which does a decent job of applying syntax highlighting to HTML.
         When I got home, though, and resumed work on a new Mango feature,
         my Django templates lacked colour. :\\"])

    (p
       ["Emacs doesn't recognize the \"dhtml\" extension, but it's easy to
         add a custom mapping (when the appropriate snippet is sitting in a
         chat window waiting to be copied (ty, Brodie))."])

    (code-block :TK

       """
       (add-to-list 'auto-mode-alist '("[.]dhtml$" . html-mode))
       """)

    (p
       ["Adding the above snippet to my " (strong "~/.emacs") " file did
         the trick. :)"])

    (captioned-image
       "/images/posts/81/emacs-syntax-highlighting.png"
       "Emacs syntax highlighting"
       "HTML in Emacs with and without syntax highlighting")

  ]

})
