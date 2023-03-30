import {a, code, em, h3, p, strong} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["<<"]: rhs => lhs => lhs << rhs,
      [">>"]: rhs => lhs => lhs >> rhs,
      [">>>"]: rhs => lhs => lhs >>> rhs,
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => Prelude.filter(x => Prelude.not(f(x))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const excerpt = [p(["Earlier I wrote some code which repeatedly calls a function\n    which performs a database query – often ", strong(["the same"]), "\n    query. This encouraged me to explore various ways to cache the\n    results of function calls in both Python (to solve my immediate\n    problem) and JavaScript (because I find that language endlessly\n    fascinating)."]), p(["I played around with ", a({
  href: "http://en.wikipedia.org/wiki/Fibonacci_number"
})(["Fibonacci"]), ",\n    which is a well suited to the task: it can be described in just\n    a couple of lines of code yet benefits enormously from caching\n    due to its recursive nature."]), h3(["JavaScript Fibonacci without caching"]), code$002Dblock("javascript")(`function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 2) + fibonacci(n - 1);
}
`)];
const body = [...excerpt, p(["I created a simple timer:"]), code$002Dblock("javascript")(`function timer(func) {
    var i = 10, start;
    while (i--) {
        start = new Date;
        func.apply(this, [].slice.call(arguments, 1));
        console.log(func.name, 'executed in', new Date - start, 'ms');
    }
}
`), p(["How does the vanilla function perform?"]), code$002Dblock("TK")(`>>> timer(fibonacci, 35);
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
`), p(["Values of ", code(["n"]), " much larger than 35 locked up my browser.\n    That's not good. Fortunately, it's easy to improve the performance\n    significantly."]), h3(["JavaScript Fibonacci with caching via closure"]), p(["JavaScript has closure, which means that each function has access to\n    the variables and parameters or its outer function (and the variables\n    and parameters of its outer function's outer function, and so on)."]), p(["This is incredibly powerful. It makes it possible to create a variable, ", code(["cache"]), ", which can ", em(["only"]), " be accessed by our ", code(["fibonacci"]), " function. This ensures that our cache cannot be\n    overwritten, accidentally or otherwise."]), code$002Dblock("javascript")(`fibonacci = (function () {

    var cache = {};

    return function (n) {

        var cached = cache[n];
        if (cached) return cached;

        if (n <= 1) return n;

        return (cache[n] = fibonacci(n - 2) + fibonacci(n - 1));
    };
}());
`), p(["Does caching make a difference?"]), code$002Dblock("TK")(`>>> timer(fibonacci, 35);
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
`), p(["Undeniably, yes. Not only is the new version of the function much\n    faster, but its less recursive nature makes it possible to find\n    Fibonacci numbers for much larger values of ", code(["n"]), "."]), p(["A slightly different approach is to initialize the cache with values\n    for 0 and 1, making the ", code(["if (n <= 1)"]), " logic unnecessary.\n    Since one of the cached values is now 0, however, the ", code(["if (cached)"]), " statement is no longer appropriate."]), code$002Dblock("javascript")(`fibonacci = (function () {

    var cache = { 0:0, 1:1 };

    return function (n) {

        var cached = cache[n];
        if (typeof cached !== 'undefined') return cached;

        return (cache[n] = fibonacci(n - 2) + fibonacci(n - 1));
    };
}());
`), h3(["JavaScript Fibonacci with caching via function property"]), p(["It's also possible to cache results without using closure.\n    This is important since Python (which I'll get to shortly)\n    does not have this capability."]), code$002Dblock("javascript")(`function fibonacci(n) {

    if (!fibonacci.cache) fibonacci.cache = {};

    var cached = fibonacci.cache[n];
    if (cached) return cached;

    if (n <= 1) return n;

    return (fibonacci.cache[n] = fibonacci(n - 2) + fibonacci(n - 1));
}
`), p(["To avoid the overhead of checking for the existence of the cache\n    on each invocation, the cache could be initialized outside of the\n    function definition."]), code$002Dblock("javascript")(`function fibonacci(n) {
    // function body
}
fibonacci.cache = {};
`), p(["Caching via function property and caching via closure performed\n    equally well for me in Safari on Mac OS X."]), h3(["Python Fibonacci without caching"]), code$002Dblock("python")(`def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n - 2) + fibonacci(n - 1)
`), p(["Does the vanilla Python function outperform the vanilla JavaScript\n    function?"]), code$002Dblock("TK")(`>>> import time
>>> for i in range(10): t = time.time(); fibonacci(35); print time.time() - t;
`), p(["Interestingly, Python was more than an order of magnitude slower than\n    JavaScript in this worst-case scenario. The point of this exercise is\n    not to compare apples to oranges, however, it's to see how much of a\n    difference caching makes in each case."]), h3(["Python Fibonacci with caching via function property"]), code$002Dblock("python")(`def fibonacci(n):
    if n in fibonacci.cache:
        return fibonacci.cache[n]
    elif n <= 1:
        return n
    else:
        f = fibonacci.cache[n] = fibonacci(n - 2) + fibonacci(n - 1)
        return f

fibonacci.cache = {}
`), p(["This resulted in ", code(["fibonacci(35)"]), " being executed roughly\n    75,000 times as fast on an empty cache as the vanilla function."]), h3(["Python Fibonacci with caching via mutable default argument"]), p(["For the sake of completion I'll include this unappealing approach."]), code$002Dblock("python")(`def fibonacci(n, _cache={}):
    if n <= 1:
        return n
    elif n in _cache:
        return _cache[n]
    else:
        f = _cache[n] = fibonacci(n - 2) + fibonacci(n - 1)
        return f
`), p(["How does this work? In Python, default arguments are brought to\n    life upon a function's creation, not its execution. Thus when ", code(["fibonacci"]), " is called with just one argument (", code(["n"]), ")\n    the value of ", code(["_cache"]), " is the dictionary that was created\n    at the time that ", code(["fibonacci"]), " was created. Python's\n    dictionaries are mutable, meaning that they can be changed in place.\n    Together, these two features make it possible to use a mutable\n    default argument", $2014, "in this case a dictionary", $2014, "as a cache."]), h3(["Final thoughts"]), p(["I had fun experimenting with these various approaches, furthering\n    my understanding of both JavaScript and Python in the process.\n    I've been writing JavaScript casually for several years; now that\n    I'm making an effort to actually ", em(["learn"]), " the language\n    I'm starting to appreciate its brilliance."])];
export default {
  id: 67,
  slug: "self-caching-functions-in-javascript-and-python",
  title: ["Self-caching functions in JavaScript and Python"],
  datetime: datetime("2010-08-29")("01:10:00")("Pacific/Auckland"),
  tags: ["javascript", "programming", "python"],
  body
};
