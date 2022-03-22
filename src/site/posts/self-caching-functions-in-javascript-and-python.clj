(import* [:base "../elements" "../components"] {

  :id 67

  :title "Self-caching functions in JavaScript and Python"

  :datetime (datetime "2010-08-29" "01:10:00" :Pacific/Auckland)

  :tags [:javascript :programming :python]

  :body [

    (excerpt

       [(p
           ["Earlier I wrote some code which repeatedly calls a function
             which performs a database query – often " (strong "the same") "
             query. This encouraged me to explore various ways to cache the
             results of function calls in both Python (to solve my immediate
             problem) and JavaScript (because I find that language endlessly
             fascinating)."])

        (p
           ["I played around with "
            (a "http://en.wikipedia.org/wiki/Fibonacci_number" "Fibonacci") ",
             which is a well suited to the task: it can be described in just
             a couple of lines of code yet benefits enormously from caching
             due to its recursive nature."])

        (h3 "JavaScript Fibonacci without caching")

        (code-block :javascript

           "
           function fibonacci(n) {
               if (n <= 1) return n;
               return fibonacci(n - 2) + fibonacci(n - 1);
           }
           ")])

    (p
       ["I created a simple timer:"])

    (code-block :javascript

       "
       function timer(func) {
           var i = 10, start;
           while (i--) {
               start = new Date;
               func.apply(this, [].slice.call(arguments, 1));
               console.log(func.name, 'executed in', new Date - start, 'ms');
           }
       }
       ")

    (p
       ["How does the vanilla function perform?"])

    (code-block :TK

       "
       >>> timer(fibonacci, 35);
       fibonacci executed in 559 ms
       fibonacci executed in 559 ms
       fibonacci executed in 559 ms
       fibonacci executed in 557 ms
       fibonacci executed in 557 ms
       fibonacci executed in 559 ms
       fibonacci executed in 558 ms
       fibonacci executed in 558 ms
       fibonacci executed in 559 ms
       fibonacci executed in 559 ms
       ")

    (p
       ["Values of " (code "n") " much larger than 35 locked up my browser.
         That's not good. Fortunately, it's easy to improve the performance
         significantly."])

    (h3 "JavaScript Fibonacci with caching via closure")

    (p
       ["JavaScript has closure, which means that each function has access to
         the variables and parameters or its outer function (and the variables
         and parameters of its outer function's outer function, and so on)."])

    (p
       ["This is incredibly powerful. It makes it possible to create a
         variable, " (code "cache") ", which can " (em "only") " be accessed
         by our " (code "fibonacci") " function. This ensures that our cache
         cannot be overwritten, accidentally or otherwise."])

    (code-block :javascript

       "
       fibonacci = (function () {

           var cache = {};

           return function (n) {

               var cached = cache[n];
               if (cached) return cached;

               if (n <= 1) return n;

               return (cache[n] = fibonacci(n - 2) + fibonacci(n - 1));
           };
       }());
       ")

    (p
       ["Does caching make a difference?"])

    (code-block :TK

       "
       >>> timer(fibonacci, 35);
        executed in 1 ms
        executed in 0 ms
        executed in 0 ms
        executed in 0 ms
        executed in 0 ms
        executed in 0 ms
        executed in 0 ms
        executed in 0 ms
        executed in 0 ms
        executed in 0 ms
       ")

    (p
       ["Undeniably, yes. Not only is the new version of the function much
         faster, but its less recursive nature makes it possible to find
         Fibonacci numbers for much larger values of " (code "n") "."])

    (p
       ["A slightly different approach is to initialize the cache with
         values for 0 and 1, making the " (code "if (n <= 1)") " logic
         unnecessary. Since one of the cached values is now 0, however,
         the " (code "if (cached)") " statement is no longer appropriate."])

    (code-block :javascript

       "
       fibonacci = (function () {

           var cache = { 0:0, 1:1 };

           return function (n) {

               var cached = cache[n];
               if (typeof cached !== 'undefined') return cached;

               return (cache[n] = fibonacci(n - 2) + fibonacci(n - 1));
           };
       }());
       ")

    (h3 "JavaScript Fibonacci with caching via function property")

    (p
       ["It's also possible to cache results without using closure.
         This is important since Python (which I'll get to shortly)
         does not have this capability."])

    (code-block :javascript

       "
       function fibonacci(n) {

           if (!fibonacci.cache) fibonacci.cache = {};

           var cached = fibonacci.cache[n];
           if (cached) return cached;

           if (n <= 1) return n;

           return (fibonacci.cache[n] = fibonacci(n - 2) + fibonacci(n - 1));
       }
       ")

    (p
       ["To avoid the overhead of checking for the existence of the cache
         on each invocation, the cache could be initialized outside of the
         function definition."])

    (code-block :javascript

       "
       function fibonacci(n) {
           // function body
       }
       fibonacci.cache = {};
       ")

    (p
       ["Caching via function property and caching via closure performed
         equally well for me in Safari on Mac OS X."])

    (h3 "Python Fibonacci without caching")

    (code-block :python

       "
       def fibonacci(n):
           if n <= 1:
               return n
           else:
               return fibonacci(n - 2) + fibonacci(n - 1)
       ")

    (p
       ["Does the vanilla Python function outperform the vanilla JavaScript
         function?"])

    (code-block :TK

       "
       >>> import time
       >>> for i in range(10): t = time.time(); fibonacci(35); print time.time() - t;
       ")

    (p
       ["Interestingly, Python was more than an order of magnitude slower than
         JavaScript in this worst-case scenario. The point of this exercise is
         not to compare apples to oranges, however, it's to see how much of a
         difference caching makes in each case."])

    (h3 "Python Fibonacci with caching via function property")

    (code-block :python

       "
       def fibonacci(n):
           if n in fibonacci.cache:
               return fibonacci.cache[n]
           elif n <= 1:
               return n
           else:
               f = fibonacci.cache[n] = fibonacci(n - 2) + fibonacci(n - 1)
               return f

       fibonacci.cache = {}
       ")

    (p
       ["This resulted in " (code "fibonacci(35)") " being executed roughly
         75,000 times as fast on an empty cache as the vanilla function."])

    (h3 "Python Fibonacci with caching via mutable default argument")

    (p
       ["For the sake of completion I'll include this unappealing approach."])

    (code-block :python

       "
       def fibonacci(n, _cache={}):
           if n <= 1:
               return n
           elif n in _cache:
               return _cache[n]
           else:
               f = _cache[n] = fibonacci(n - 2) + fibonacci(n - 1)
               return f
       ")

    (p
       ["How does this work? In Python, default arguments are brought to
         life upon a function's creation, not its execution. Thus when "
        (code "fibonacci") " is called with just one argument (" (code "n") ")
         the value of " (code "_cache") " is the dictionary that was created
         at the time that " (code "fibonacci") " was created. Python's
         dictionaries are mutable, meaning that they can be changed in place.
         Together, these two features make it possible to use a mutable
         default argument -- in this case a dictionary -- as a cache."])

    (h3 "Final thoughts")

    (p
       ["I had fun experimenting with these various approaches, furthering
         my understanding of both JavaScript and Python in the process.
         I've been writing JavaScript casually for several years; now that
         I'm making an effort to actually " (em "learn") " the language
         I'm starting to appreciate its brilliance."])

  ]

})