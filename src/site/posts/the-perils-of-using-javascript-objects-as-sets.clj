(import* ["../elements" "../components"]

(let [datetime (require "../datetime")] {

  :id 94

  :title "The perils of using JavaScript objects as sets"

  :datetime (datetime "2012-09-03" "20:00:00" :America/Los_Angeles)

  :tags [:best-practice :data-structures :javascript :programming :python]

  :body [

    (excerpt

       [(p
           ["One question I'm fond of asking in interviews is how to create
             a set of strings to which values may be added in an efficient
             manner. Furthermore, membership checks must be reliable and as
             fast as possible. This post can be considered the model answer.
             ;)"])])

    hr

    (p
       ["JavaScript is a small language. So small, in fact, that
         several useful constructs are entirely absent. Just two
         types of collection are provided: arrays and objects
         (and even these are less different than they appear).
         Sets (collections of unique values) and dictionaries
         (collections which map unique values to other values)
         are the most glaring omissions."])

    (h3 "How does Python do it?")

    (p
       ["Python has literal syntax for sets, and supports
         membership checks via the " (code "in") " keyword:"])

    (code-block :python

       "
       >>> usernames = {'brodie', 'jespern', 'nvenegas'}
       >>> 'brodie' in usernames
       True
       >>> 'davidchambers' in usernames
       False
       ")

    (p
       ["Incidentally, since sets are essentially dictionaries
         without values, it's unsurprising that the same form
         can be used to determine whether a value is among a
         dictionary's keys:"])

    (code-block :python

       "
       >>> settings = {'lines': 50, 'number': False, 'spell': True}
       >>> 'number' in settings
       True
       >>> 'wrap' in settings
       False
       ")

    (h3 "Fashioning a poor man’s set from the limited materials
         JavaScript provides")

    (p
       ["How might one create a set of strings in JavaScript given the
         limited, ahem, " (em "set") " of data structures at our disposal?
         One could use a string:"])

    (code-block :javascript

       "
       > usernames = ',brodie,jespern,nvenegas,'
       > /,brodie,/.test(usernames)
       true
       > /,davidchambers,/.test(username)
       false
       ")

    (p
       ["This approach is problematic for several reasons: it assumes
         that \",\" won't appear in a username, membership checks are
         inefficient, inserting an existing member will cause the
         string to grow unless an expensive membership check is
         performed, and the separators make things awkward."])

    (p
       ["An array is clearly a better choice:"])

    (code-block :javascript

       "
       > usernames = ['brodie', 'jespern', 'nvenegas']
       > usernames.indexOf('brodie') >= 0
       true
       > usernames.indexOf('davidchambers') >= 0
       false
       ")

    (p
       ["Though this is an improvement, membership checks are still
         inefficient, and each insert still requires a member check if
         we're to avoid having the array grow needlessly. If we kept the
         array ordered we could use binary search, but inserts would be
         even slower as each member would need to be inserted in the
         correct position."])

    (p
       ["An object, then, is the " (em "best") " choice:"])

    (code-block :javascript

       "
       > usernames = {'brodie': 1, 'jespern': 1, 'nvenegas': 1}
       > 'brodie' in usernames
       true
       > 'davidchambers' in usernames
       false
       ")

    (p
       ["This addresses the outstanding problems, and the " (code "in") "
         keyword makes the intent of these expressions clear."])

    (p
       ["But it also introduces a subtle bug:"])

    (code-block :javascript

       "
       > 'constructor' in usernames
       true
       > 'toString' in usernames
       true
       > 'valueOf' in usernames
       true
       ")

    (p
       ["The " (code "in") " check tells us whether the property exists on
         the object " (em "or anywhere in its prototype chain") ". Ugh."])

    (p
       [(code "in") " is out, then, but there is a way to ask whether a
         property exists on the object itself:"])

    (code-block :javascript

       "
       > usernames.hasOwnProperty('brodie')
       true
       > usernames.hasOwnProperty('davidchambers')
       false
       ")

    (p
       ["This fixes the unwanted inheritance problem, but introduces
         another subtle error:"])

    (code-block :javascript

       "
       > usernames['davidchambers'] = 1 // add \"davidchambers\" to set
       1
       > usernames['hasOwnProperty'] = 1 // add \"hasOwnProperty\" to set
       1
       > usernames.hasOwnProperty('davidchambers')
       TypeError: Property 'hasOwnProperty' of object #<Object> is not a function
       ")

    (p
       ["If we rely on " (code "usernames.hasOwnProperty") " we lose
         the ability to perform membership checks as soon as we add
         \"hasOwnProperty\" as a member. The solution is to grab the
         function from a reliable source (" (code "Object.prototype") "):"])

    (code-block :javascript

       "
       > Object.prototype.hasOwnProperty.call(usernames, 'davidchambers')
       true
       ")

    (p
       ["What a mouthful! This is, though, the correct way to maintain
         a collection of unique strings in JavaScript. It's efficient,
         and avoids the pitfalls of the aforementioned approaches."])

    (h3 "Bonus section")

    (p
       ["In working through this question with a candidate I realized
         there's another solution, though I can't think of a compelling
         reason to favour it:"])

    (code-block :javascript

       "
       > sentinel = {}
       > usernames = {'brodie': sentinel, 'jespern': sentinel, 'nvenegas': sentinel}
       > usernames['brodie'] === sentinel
       true
       > usernames['davidchambers'] === sentinel
       false
       > usernames['constructor'] === sentinel
       false
       ")

  ]

}))
