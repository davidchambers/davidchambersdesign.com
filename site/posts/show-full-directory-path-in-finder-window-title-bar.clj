(import ["../elements"]

(let [
  captioned-image     (require "../components/captioned-image")
  code-block          (require "../components/code-block")
  datetime            (require "../datetime")
] {

  :id 2

  :slug "show-full-directory-path-in-finder-window-title-bar"

  :title "Show full directory path in Finder window title bar"

  :datetime (datetime "2008-11-29" "19:07:00" :Pacific/Auckland)

  :tags [:mac-os-x]

  :body [

    (excerpt

       [(p
           ["If you have ever found yourself command-clicking the
             title of a Finder window to find out where you are ("
            (strong "/Library/Fonts") " or " (strong "~/Library/Fonts") "
             is one I've double-checked many times), you'll understand how
             pleased I was to discover that there is a command which can be
             entered in Terminal to "
            (a "http://osxdaily.com/2007/12/02/show-full-directory-path-in-finder-window-title-bars/"
               "show full directory paths in Finder window title bars")
            "."])])

    (captioned-image
       "/images/posts/2/finder-windows-without-paths.png"
       "Finder windows without paths"
       [(strong "Before:") " Finder windows with directory name only in title bar"])

    (p
       ["In the screenshot above, it is clear that the two Finder windows are
         displaying different Fonts folders, but it is unclear which is which."])

    (p
       ["To display the full path, copy and paste the following into Terminal
         and hit " (strong "return") "."])

    (code-block :console

       "
       defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES
       ")

    (p
       ["For the changes to take effect, you will need to restart Finder:"])

    (code-block :console

       "
       killall Finder
       ")

    (captioned-image
       "/images/posts/2/finder-windows-with-paths.png"
       "Finder windows with paths"
       [(strong "After:") " Finder windows with full directory path in title bar"])

    (p
       ["Confusion resolved! Please note that this is "
        (strong "only applicable for OS X 10.5") " users."])

    (p
       ["To revert to the default title bar treatment, simply enter:"])

    (code-block :console

       "
       defaults write com.apple.finder _FXShowPosixPathInTitle -bool NO
       ")

    (p
       ["Then, restart Finder once again:"])

    (code-block :console

       "
       killall Finder
       ")

  ]

}))