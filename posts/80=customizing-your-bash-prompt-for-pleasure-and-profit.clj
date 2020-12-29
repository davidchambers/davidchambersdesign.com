(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "Customizing your bash prompt for pleasure and profit"

  :datetime (datetime "2011-02-13" "01:30:00" :America/Los_Angeles)

  :tags [:mac-os-x :productivity :terminal.app]

  :body [

    (excerpt
       [(p
           ["Mac OS X's default bash prompt is dull and uninformative."])

        (captioned-image
           "/images/posts/80/windows/default-os-x-bash-prompt.png"
           "Mac OS X's default bash prompt"
           "Mac OS X's default bash prompt")

        (p
           ["Since only the current directory name is visible, I find
             myself running " (code "pwd") " more often than is healthy.
             Also, I find the uneven prompt length jarring."])])

    (p
       ["My solution to both of these problems is to include the full
         path " (em "on its own line") " (with a preceding " (code "\\n") "
         providing much-needed breathing room)."])

    (captioned-image
       "/images/posts/80/windows/custom-bash-prompt.png"
       "Custom bash prompt which displays the full path"
       "Custom bash prompt which displays the full path")

    (h3 "Configuring the bash prompt")

    (p
       ["Add something like the following to your " (strong "~/.bashrc") "."])

    (code-block :bash

       "PS1=\"\\n\\[\\e[1;36m\\]\\w\\n\\[\\e[1;32m\\]> \\[\\e[0m\\]\"")

    (h4 "What the heck does all this mean?")

    (p
       [(code "PS1") " refers to the bash prompt. " (code "PS2") ", "
        (code "PS3") ", and " (code "PS4") " relate to similar things."])

    (p
       [(code "\\n") " is a newline."])

    (p
       [(code "\\[") " begins a sequence of non-printing characters."])

    (p
       [(code "\\e[1;36m") " is the code for \"light cyan\"."])

    (p
       [(code "\\]") " ends the sequence of non-printing characters."])

    (p
       [(code "\\w") " is the current working directory
         (with a tilde used in place of " (code "$HOME") ")."])

    (p
       [(code "\\n") " is another newline."])

    (p
       [(code "\\[\\e[1;32m\\]") " is a sequence of non-printing
         characters containing the code for \"light green\"."])

    (p
       [(code "> ") " is simply a \">\" followed by a space."])

    (p
       [(code "\\[\\e[0m\\]") " puts an end to the colouring,
         preventing it from \"spilling out\"."])

    (update (datetime "2011-04-03" "21:00:00" :America/Los_Angeles)

       [(p
           ["When first this post was published colour codes were not
             preceded by " (code "\\[") ". The colour codes themselves
             were thus considered when calculating the prompt's length,
             meaning that the first several characters of a command
             would sometimes remain visible when arrowing up and down.
             >.<"])])

    (update (datetime "2012-04-20" "01:15:00" :America/Los_Angeles)

       [(p
           ["I've recently taken up Vim. In Vim, one can enter "
            (code ":shell") " while in command mode to open a shell.
             The first time I did so I noticed that the colour codes
             appeared in the prompt. Feature detection can be used to
             ensure that colour codes are only provided to \"smart\"
             terminals:"])

        (code-block :bash

           "[[ \"$TERM\" == dumb ]] && PS1=\"\\n\\w\\n> \"
            [[ \"$TERM\" != dumb ]] && PS1=\"\\n\\[\\e[1;36m\\]\\w\\n\\[\\e[1;32m\\]> \\[\\e[0m\\]\"")])

    (h4 "Note for Mac OS X users")

    (p
       ["Terminal loads your " (strong "~/.bash_profile") "
         but not your " (strong "~/.bashrc") ". As a result,
         your " (strong "~/.bash_profile") " should contain
         the following snippet."])

    (code-block :bash

       "if [ -f ~/.bashrc ]; then
          source ~/.bashrc
        fi")

  ]

})
