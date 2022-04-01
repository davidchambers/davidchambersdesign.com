(import* ["../elements"]

(let [
  captioned-image   (require "../components/captioned-image")
] {

  :slug "about"

  :title "About"

  :body [

    (p
       [(b "Greetings! My name is David Chambers and I'm a software developer
         based in San Francisco.")])

    (p
       ["I work at " (a "http://www.atlassian.com/" "Atlassian") "
         with a great group of people dedicated to making "
        (a "https://bitbucket.org/" "Bitbucket") " awesome.
         Our efforts benefit tens of thousands of software
         developers, which makes the job incredibly rewarding."])

    (p
       ["I've created several dozen "
        (a "https://bitbucket.org/davidchambers" "open source projects") ",
         many of which are small, self-contained JavaScript utilities
         written in CoffeeScript. In 2011 I created and released "
        (a "http://hashify.me/" "Hashify") ", a little gift to the Internet.
         :)"])

    (captioned-image
       "/images/about/david-jo-shaun.jpg"
       "Me with friends Jo and Shaun at the Luge in Rotorua"
       "Me with friends at the Luge in Rotorua")

    (p
       ["Feel free to "
        (a "http://twitter.com/davidchambers" "follow me on Twitter") ".
         I tweet sporadically and infrequently."])

  ]

}))