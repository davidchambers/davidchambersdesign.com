(import* ["../../lang/modules/base" "../elements" "../components"] {

  :title "Changing keyboard shortcuts in Mac OS X"

  :datetime (datetime "2009-03-25" "16:36:00" :Pacific/Auckland)

  :tags [:keyboard-shortcuts :mac-os-x]

  :body [

    (excerpt

       [(p
           ["I've been using OS X almost exclusively for the last three
             or four years, but it was only recently that I discovered the
             system-wide method for changing keyboard shortcuts. I think
             the reason that this feature eluded me for so long is that so
             many of the hours I've spent on OS X have involved the use of
             the Adobe applications Photoshop, Illustrator, and InDesign,
             which provide their own means of changing keyboard shortcuts.
             I assumed that since application developers sometimes provide
             their own interfaces for changing keyboard shortcuts, the
             operating system must lack this functionality. I was wrong."])])

    (p
       ["I stumbled upon this useful information while reading "
        (a "http://caminobrowser.org/documentation/faq/#cust_change"
           "Camino's FAQ") ". I have reproduced its step-by-step instructions
         below, since they are right on the money."])

    (ul
       [(li ["First, quit «application»; if it is running."])
        (li ["Open " (strong "System Preferences") "."])
        (li ["Choose the " (strong "\"Keyboard & Mouse\"") " pane."])
        (li ["Select the \"Keyboard Shortcuts\" tab."])
        (li ["Press the \"+\" button at the bottom of that tab."])
        (li ["In the " (strong "Application") " pop-up menu, choose "
             (strong "<application>") "."])
        (li ["In the \"Menu Title\" field, type the exact name of the menu
              item you want to change, and in the \"Keyboard Shortcut\" field,
              type the new shortcut you want that menu item to have. Press the
              \"OK\" button to save the new shortcut."])
        (li ["You may now relaunch <application>."])])

  ]

})
