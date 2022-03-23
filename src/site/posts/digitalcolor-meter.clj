(import* ["../elements"]

(let [
  uncaptioned-image   (require "../components/uncaptioned-image")
  datetime            (require "../datetime")
] {

  :id 65

  :title "DigitalColor Meter"

  :datetime (datetime "2010-07-23" "01:45:00" :Pacific/Auckland)

  :tags [:mac-os-x :photoshop]

  :body [

    (uncaptioned-image
       "/images/posts/windows/digitalcolor-meter.png"
       "DigitalColor Meter")

    (p
       ["I thought this recent "
        (a "http://minimalmac.com/post/836796290/"
           "post on the Minimal Mac blog") " well worth sharing:"])

    (blockquote

       [(p
           ["When was the last time you checked out your Utilities folder?
             Well, if your answer was “What’s that?” then let me explain.
             Inside of your Applications folder is another folder called
             Utilities that is filled with all sorts of wondrous things
             that most people either don’t know or completely forget are
             there. Even veteran Mac users are guilty of this. I know I am."])

        (p
           [(strong "DigitalColor Meter") " is one example of this. The other
             day, I wanted to find out the " (strong "web safe color") " of a
             particular item on the screen of my Mac for a web design project
             I was working on. My first step was to go searching the Internet
             for such a tool (preferably free). Then, in the midst of said
             search, I was reminded that this little tool was not only already
             on my Mac, did exactly what I wanted, but also did it better than
             any of the tools I was able to find."])

        (p
           ["The point is that, even the tools we think we know can "
            (strong "always reveal a little something we don’t") ". The Mac is
             an incredibly deep and rich OS and there are few that know it all.
             I’m going to spend some time every day for the next little while
             spending some time getting to know some more of these built-in
             tools I largely have ignored and see if I have any practical
             applications for using them. You will likely see more posts
             like this in the coming days."])])

    (p
       [(a "http://tumblr.frijole.info/post/836825948/"
           "Reblogged by ¡ɜɿoɾɪɹℲ") " with this extremely nifty addition:"])

    (blockquote

       [(p
           ["To take your Digital Color Metering to the next level, you
             can drag the color off of the well on the right (next to the
             R G B labels) into any standard color picker to bring it over.
             Sometimes, you can even drop it straight into an object in
             another app!"])

        (p
           ["Give it a try: sample a color, press cmd-shift-h to hold it, then
             drag and drop from the swatch an object in Pages or Keynote."])])

    (p
       ["I'm going to find this incredibly useful. No more grabbing
         a portion of the screen, switching to Photoshop, creating a
         new document, hitting ⌘V, switching to the eyedropper tool,
         double-clicking the foreground colour swatch to invoke the
         Color Picker, and " (em "then") " clicking on the appropriate
         pixel to find its colour value."])

    (p
       ["I don't think I'll miss this process, somehow, although my
         flatmate'll miss the camera shutter sound that accompanies
         screen captures on OS X (he really likes it, for some reason)."])

  ]

}))
