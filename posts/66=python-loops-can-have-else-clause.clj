(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "Python loops can have else clause?!"

  :datetime (datetime "2010-07-25" "18:11:00" :Pacific/Auckland)

  :tags [:javascript :mootools :programming :python]

  :body [

    (p
       ["I write a lot of Python. I also write a lot of JavaScript.
         As I switch between the two (often several times in a day)
         I sometimes find myself trying to do something in one using
         the syntax of the other. The most common example is joining
         a list."])

    (p
       ["Python:"])

    (code-block :python
       "' '.join(['foo', 'bar'])")

    (p
       ["JavaScript:"])

    (code-block :javascript
       "['foo', 'bar'].join(' ')")

    (p
       ["Often -- as is the case above -- the syntactical differences are
         minor, but there are times when there's no direct translation."])

    (p
       [(a "http://mootools.net/" "MooTools") ", for example, adds the "
        (a "http://mootools.net/docs/core/Native/Array#Array:every"
           [(code "every") " method"]) " to the " (code "Array") " object.
         This makes it possible to write some rather terse conditional
         statements."])

    (code-block :javascript
       "var numbers = [87, 33, 21, 75];
        if (numbers.every(function (n) { return n % 3 == 0; })) {
            window.alert('The numbers are all divisible by 3.');
        }")

    (p
       ["Python lists have no comparable method, so how would one write
         this in Python?"])

    (code-block :python
       "numbers = [87, 33, 21, 75]
        if [n for n in numbers if n % 3 == 0] == numbers:
            print 'The numbers are all divisible by 3.'")

    (p
       ["This approach involves using a list comprehension to create a
         list of numbers which are divisible by 3, and comparing this list
         to " (code "numbers") ". If the lists are equal, everything in "
        (code "numbers") " is divisible by 3."])

    (update (datetime "2012-06-20" "14:15:00" :America/Los_Angeles)

       [(p
           ["As " (a "https://twitter.com/rafael_ab/status/215428832872771584"
            "Rafael Almeida pointed out on Twitter") ", there " (em "is") " an
             elegant way to express this in Python:"])

        (code-block :python
           "if all((n % 3 == 0 for n in numbers)):
                print 'The numbers are all divisible by 3.'")])

    (h3 "Now for something a bit more challenging")

    (p
       ["Assume that we have a list of documents, and we want to know which
         of the documents contain all the terms in a list of search terms."])

    (code-block :javascript
       "// (MooTools) JavaScript

        var terms = ['python', 'list', 'methods'], matches = [];
        documents.each(function (document) {
            if (terms.every(function (term) {
                return document.body.indexOf(term) != -1;
            })) matches.append(document);
        });")

    (p
       ["Here, we " (em "could") " use the list comprehension approach
         as before."])

    (code-block :python
       "# Python

        terms = ['python', 'list', 'methods']
        matches = []
        for document in documents:
            if [t for t in terms if document.body.find(t) != -1] == terms:
                matches.append(document)")

    (p
       ["This is reasonably succinct, but not terribly efficient since
         each document is checked for " (em "every") " search term. Given
         that we're not interested in documents that lack even a single
         search term, it should be possible to rewrite this code so that
         we don't waste time on lost causes."])

    (p
       ["It turns out that Python has just the thing for the job: "
        (strong ["in Python, a loop statements may have an " (code "else") "
         clause!"])])

    (code-block :python
       "terms = ['python', 'list', 'methods']
        matches = []
        for document in documents:
            for term in terms:
                if document.body.find(term) == -1:
                    break
            else: # every term was found
                matches.append(document)")

    (p
       ["From "
        (a "http://docs.python.org/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops"
           "4. More Control Flow Tools") ":"])

    (blockquote

       [(p
           ["Loop statements may have an " (code "else") " clause; it is
             executed when the loop terminates through exhaustion of the
             list (with " (code "for") ") or when the condition becomes
             false (with " (code "while") "), but not when the loop is
             terminated by a " (code "break") " statement."])])

    (p
       [(strong ["I'm looking forward to finding more good spots to make
         use of " (code "else") " clauses with my Python loops."]) " :D"])

  ]

})
