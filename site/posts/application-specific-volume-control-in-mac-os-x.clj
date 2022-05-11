(import ["../elements"]

(let [
  uncaptioned-image   (require "../components/uncaptioned-image")
  update              (require "../components/update")
  datetime            (require "../datetime")
] {

  :id 47

  :slug "application-specific-volume-control-in-mac-os-x"

  :title "Application-specific volume control in Mac OS X?"

  :datetime (datetime "2010-04-07" "02:04:00" :Pacific/Auckland)

  :tags [:mac-os-x :ux]

  :body [

    (excerpt

       [(p
           ["It's not uncommon to start watching a video online and discover
             that its audio is quite quiet. This is not a problem in and of
             itself, as one can simply crank up the output volume. What "
            (em "is") " a problem, however, is a message then arriving in
             one's inbox and waking the neighbours!"])

        (p
           ["This situation could be avoided if it were possible adjust the
             browser's output volume without affecting the rest of the system.
             As it is, though, one is forced to increase the volume of "
            (em "everything") ". Not ideal."])

        (h3 "System Preferences > Sound > Application Volumes")

        (uncaptioned-image
           "/images/posts/windows/application-volumes.png"
           "Possible interface for application-specific volume settings
            in Mac OS X")

        (p
           ["Wouldn't this be nice? Many months ago I did some Googling
             to find out whether it's possible to control volume on an
             application-by-application basis in OS X. The closest thing
             to a solution was an X11 (read: ugly) app that " (em "kinda") "
             worked."])])

    (p
       ["Apple, I don't bug you often, but here I will. " (strong "Please
         build this into the OS and keep the neighbours happy.") " It'd be
         particularly sexy if applications such as iTunes which " (em "do") "
         currently grant the user control of the application's volume
         synchronized their volume settings with the ones in System
         Preferences. That is, adjusting the volume in iTunes would adjust
         the iTunes volume setting in System Preferences, and vice versa."])

    (p
       ["+1 in the comments if you'd like to see this feature implemented.
         :)"])

    (update (datetime "2010-04-15" "14:36:00" :Pacific/Auckland)

       [(p
           [(a "http://www.joesoft.com/products/hear.php" "Hear") "
             offers this functionality, but isn't cheap. I hope Hear's
             developers decide to release a preference pane that provides
             the functionality of Hear's mixer pane and nothing more
             (I'm about to make this request)."])

        (uncaptioned-image
           "/images/posts/windows/hear-mixer-pane.png"
           "Hear's mixer pane")])

    (h4 "Bonus titbit")

    (p
       ["While faking the drop shadow on the Sound window above I discovered
         a combination of drop shadow values which pretty much perfectly match
         those of an active window in OS X:"])

    (uncaptioned-image
       "/images/posts/47/drop-shadow-settings.png"
       "Photoshop's drop shadow dialog")

    (dl
       [(dt' {:class "textual"} "shadow color")
        (dd "#000000 (black)")

        (dt "opacity")
        (dd "45%")

        (dt "angle")
        (dd "90°")

        (dt "distance")
        (dd "16px")

        (dt "spread")
        (dd "0%")

        (dt "size")
        (dd "32px")])

  ]

}))
