(import ["../elements"]

(let [
  code-block          (require "../components/code-block")
  datetime            (require "../datetime")
] {

  :id 28

  :slug "memorable-passwords-for-programmers"

  :title "Memorable passwords for programmers"

  :datetime (datetime "2009-10-21" "00:42:00" :Pacific/Auckland)

  :tags [:security]

  :body [

    (p
       ["Those of us running Mac OS X are spoilt by Keychain Access.
         It's no help, of course, to have a password stored in your Mac's
         keychain if you're at an Internet café unable to access it.
         Thus, memorable passwords are still useful."])

    (p
       ["Those of us who write code can create passwords riddled with
         spaces and punctuation without resorting to the use of random
         strings of characters. Here's a \"JavaScript\" password,
         for example:"])

    (code-block :javascript

       "
       var favourites = { book: 'Collapse', game: 'Agricola', site: 'ted.com' };
       ")

    (p
       ["Carefully written passwords wrapping personal information
         in programming syntax should be both strong and memorable.
         I'm sure Perl programmers could write some concise, cryptic
         passwords using this approach. ;)"])

  ]

}))