import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => Prelude["match'"](type)(_ => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude.filter(x => !predicate(x)),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {_apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
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
