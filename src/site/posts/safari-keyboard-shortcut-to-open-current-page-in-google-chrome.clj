(import* ["../elements"]

(let [
  luxon               (require "../luxon")
  update              (require "../components/update")
] {

  :id 77

  :slug "safari-keyboard-shortcut-to-open-current-page-in-google-chrome"

  :title "Safari keyboard shortcut to open current page in Google Chrome"

  :datetime (luxon/datetime "2011-01-30" "21:35:00" :America/Los_Angeles)

  :tags [:flash :google-chrome :keyboard-shortcuts :mac-os-x :safari]

  :body [

    (p
       ["I followed "
        (a "http://daringfireball.net/2010/11/flash_free_and_cheating_with_google_chrome"
           "John Gruber's suggestion") " and removed Flash Player from my Mac.
         Like John, I've come to rely upon Google Chrome for viewing the
         occasional Flash movie. As a result I've become proficient at the
         keyboard dance required to open in Chrome the page I'm currently
         viewing in Safari:"])

    (ol
       [(li [(strong "⌘L") "
              (" (strong "File") " > " (strong "Open Location...") ")"])
        (li [(strong "⌘C") "
              (" (strong "Edit") " > " (strong "Copy") ")"])
        (li [(strong "⌘Space") "
              (invoke Quicksilver/Spotlight)"])
        (li [(strong "C-H-R-↩") "
              (open Google Chrome)"])
        (li [(strong "⌘L") "
              (" (strong "File") " > " (strong "Open Location...") ")"])
        (li [(strong "⌘V") "
              (" (strong "Edit") " > " (strong "Paste") ")"])
        (li [(strong "↩") "
              (go, go, go!)"])])

    (p
       ["Well, I've performed this dance for the last time.
         I now do this instead:"])

    (ol
       [(li [(strong "⌥⌘G")])])

    (p
       ["Credit for this simple but brilliant idea goes to Rob McBroom.
         Rob's post on "
        (a "http://projects.skurfer.com/posts/2011/chrome_shortcut/"
           "opening pages in Google Chrome") " lists the (very easy)
         steps required to enable this shortcut."])

    (update (luxon/datetime "2011-01-30" "23:30:00" :America/Los_Angeles)

       [(p
           ["Chris points out that John himself mentioned this trick
             in his aforelinked post."])])

  ]

}))
