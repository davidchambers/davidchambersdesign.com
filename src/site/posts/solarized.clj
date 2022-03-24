(import* ["../elements"]

(let [
  captioned-image     (require "../components/captioned-image")
  datetime            (require "../datetime")
] {

  :id 84

  :slug "solarized"

  :title "Solarized"

  :datetime (datetime "2011-04-23" "02:20:00" :America/Los_Angeles)

  :tags [:coda :design :programming :solarized]

  :body [

    (p
       ["Earlier this week I discovered "
        (a "http://ethanschoonover.com/solarized" "Solarized") ",
         \"a sixteen color palette [...] designed for use with
         terminal and gui applications\"."])

    (p
       ["Bundles are available for all the popular editors;
         I went ahead and cloned the "
        (a "https://github.com/bobthecow/solarized-seestyle" "Coda bundle") ".
         While the code on my screen immediately looked very nice, a few of
         Justin's colour choices didn't sit well with me.* I spent an hour
         or two trying a large number of different combinations until my
         JavaScript file was harmoniously highlighted."])

    (captioned-image
       "/images/posts/84/solarized-code-snippet.png"
       "Solarized code snippet"
       "Solarized code snippet")

    (p
       ["I wanted an even intensity, but didn't allow myself to deviate
         from Ethan's prescribed colours. I'm happy with the result: the
         soft highlighting makes the code easier to understand without
         being a distraction. Only regular expression literals leap
         forward, but these tend to occur infrequently."])

    (p
       ["Coda users may be surprised to see method invocations
         highlighted. That's one of the minor enhancements I've made
         to the default mode. If you're interested, have a look at "
        (a "https://bitbucket.org/davidchambers/javascript.mode"
           "Javascript.mode") " on Bitbucket."])

    (p
       ["* Blue escape sequences within red regular expression literals
         are too striking for my liking!"])

  ]

}))
