(import* ["../elements"]

(let [
  code-block          (require "../components/code-block")
  decorative-image    (require "../components/decorative-image")
  update              (require "../components/update")
  datetime            (require "../datetime")
] {

  :id 76

  :slug "composing-mercurial-commit-messages-in-textmate"

  :title "Composing Mercurial commit messages in TextMate"

  :datetime (datetime "2011-01-10" "01:25:00" :Australia/Sydney)

  :tags [:hg :mac-os-x :markdown :mercurial :textmate]

  :body [

    (decorative-image "/images/posts/decorative/right/textmate-icon.png")

    (p
       ["Using the " (code "-m") " flag can be a timesaver, but for several
         reasons I prefer to write my commit messages in a text editor:"])

    (ul
       [(li "Spell-checking")
        (li "Familiar keyboard navigation")
        (li "No need to escape quotation marks")])

    (p
       [(a "http://macromates.com/" "TextMate") "
         is particularly well suited to my needs due to its built-in "
        (a "http://daringfireball.net/projects/markdown/syntax" "Markdown") "
         highlighting and previewing – yes, I write commit messages in
         Markdown!"])

    (p
       [(strong
           ["To set TextMate as Mercurial's editor, add "
            (code "editor = mate -w") " to the " (code "[ui]") "
             section of your " (code "~/.hgrc") " file."])])

    (p
       [(a "http://vincecima.com/post/578017364/using-textmate-as-mercurials-editor"
           "Vince Cima explains") ":"])

    (blockquote

       [(p
           ["Next time you do " (code "hg commit") " TextMate will open a
             temporary file you write your commit message into. Type your
             message, save the file and then close the window to finish
             the commit. The " (code "-w") " flag on the " (code "mate") "
             command tells TextMate not to return control to the command
             line until the editor window has been closed."])])

    (update (datetime "2011-01-22" "15:20:00" :Australia/Sydney)

       [(p
           ["To use TextMate as your git editor, run the following command:"])

        (code-block :console

           "
           git config --global core.editor \"mate -w\"
           ")

        (p
           ["This adds " (code "editor = mate -w") " to the " (code "[core]") "
             section of your " (code "~/.gitconfig") " file."])])

  ]

}))
