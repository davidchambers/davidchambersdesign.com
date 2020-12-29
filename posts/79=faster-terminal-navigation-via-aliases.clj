(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "Faster Terminal navigation via aliases"

  :datetime (datetime "2011-02-12" "22:10:00" :America/Los_Angeles)

  :tags [:mac-os-x :productivity :terminal.app]

  :body [

    (excerpt

       [(p
           ["Workmates will be quick to confirm that I'm "
            (strong "not exactly leet") " on the command line.
             Efforts to advance beyond " (code "cd") " and "
            (code "ls") " have been hampered by the fact that
             many posts and discussion threads assume a level
             of competency which as yet I lack."])

        (p
           ["When I sit down to write a post, oftentimes "
            (strong "I write the post I wish I'd read an hour earlier") ".
             As I unravel the mysteries of ack and bash and Emacs and the
             like, I'll publish tips and explanations so that others can
             benefit from my discoveries (or, as will likely be the case,
             so that you people can further enlighten " (em "me") ")."])])

    (h3 "Aliases")

    (p
       ["Do you find yourself " (code "cd") "-ing to a particular directory
         dozens of times each day? Perhaps you -- like me -- forget "
        (strong "where the heck Python's site-packages directory lives") ",
         and resort to Googling to find out? Aliases to the rescue!"])

    (p
       ["Aliases can be placed in your " (strong ".bashrc") " or "
        (strong ".bash_profile") ", or in a separate file which either
         one of these imports."])

    (code-block :bash

       "alias site-packages=\"cd /Library/Frameworks/Python.framework/Versions/2.6/lib/python2.6/site-packages\"")

    (p
       ["Thanks to this alias I can enter " (code "site-packages") "
         and be taken straight there. Another cool thing to know about
         is " (code "cd -") ", which takes you to the directory you were
         in most recently."])

    (code-block :console

       "$ cd ~/Desktop
        $ site-packages
        $ pwd
        /Library/Frameworks/Python.framework/Versions/2.6/lib/python2.6/site-packages
        $ cd -
        /Users/dc/Desktop")

    (p
       [(a "https://github.com/r00k/dotfiles/blob/master/bash/aliases"
           "r00k's bash aliases") " provide some ideas as to other ways
         in which aliases can be put to use. :D"])

    (h3 "Finder.app")

    (p
       ["I've sworn off it, and I'm pleased to have done so. It's great
         to be able to edit settings files on a server in place, rather
         than opening Transmit, navigating to the relevant directory,
         right-clicking and selecting \"Open\", making the change in
         Coda, and saving to have the updated file sent back via FTP."])

  ]

})
