import {
  canonicalize$002Dchildren,
  text,
  excerpt,
  a,
  a$0027,
  article,
  article$0027,
  aside,
  aside$0027,
  b,
  blockquote,
  blockquote$0027,
  body$0027,
  code,
  code$0027,
  dd,
  dd$0027,
  del,
  del$0027,
  div,
  dl,
  dl$0027,
  dt,
  dt$0027,
  em,
  em$0027,
  embed,
  footer,
  footer$0027,
  h1,
  h1$0027,
  h2,
  h2$0027,
  h3,
  h3$0027,
  h4,
  h4$0027,
  h5,
  h5$0027,
  h6,
  h6$0027,
  head,
  head$0027,
  header,
  header$0027,
  hr,
  hr$0027,
  html,
  html$0027,
  i,
  i$0027,
  img,
  ins,
  ins$0027,
  li,
  li$0027,
  linearGradient,
  link,
  mask,
  meta,
  nav,
  nav$0027,
  object,
  ol,
  ol$0027,
  p,
  p$0027,
  param,
  path,
  pre,
  pre$0027,
  rect,
  script,
  span,
  stop,
  strong,
  strong$0027,
  svg,
  time,
  title,
  title$0027,
  ul,
  ul$0027,
  var_,
  var$0027,
  video
} from '../elements.js';
import { code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p([
      'Earlier I wrote some code which repeatedly calls a function\n           which performs a database query \u2013 often ',
      strong('the same'),
      '\n           query. This encouraged me to explore various ways to cache the\n           results of function calls in both Python (to solve my immediate\n           problem) and JavaScript (because I find that language endlessly\n           fascinating).'
    ]),
    p([
      'I played around with ',
      a('http://en.wikipedia.org/wiki/Fibonacci_number')('Fibonacci'),
      ',\n           which is a well suited to the task: it can be described in just\n           a couple of lines of code yet benefits enormously from caching\n           due to its recursive nature.'
    ]),
    h3('JavaScript Fibonacci without caching'),
    code$002Dblock(Symbol.for('javascript'))('\n         function fibonacci(n) {\n             if (n <= 1) return n;\n             return fibonacci(n - 2) + fibonacci(n - 1);\n         }\n         ')
  ]),
  p(['I created a simple timer:']),
  code$002Dblock(Symbol.for('javascript'))('\n     function timer(func) {\n         var i = 10, start;\n         while (i--) {\n             start = new Date;\n             func.apply(this, [].slice.call(arguments, 1));\n             console.log(func.name, \'executed in\', new Date - start, \'ms\');\n         }\n     }\n     '),
  p(['How does the vanilla function perform?']),
  code$002Dblock(Symbol.for('TK'))('\n     >>> timer(fibonacci, 35);\n     fibonacci executed in 559 ms\n     fibonacci executed in 559 ms\n     fibonacci executed in 559 ms\n     fibonacci executed in 557 ms\n     fibonacci executed in 557 ms\n     fibonacci executed in 559 ms\n     fibonacci executed in 558 ms\n     fibonacci executed in 558 ms\n     fibonacci executed in 559 ms\n     fibonacci executed in 559 ms\n     '),
  p([
    'Values of ',
    code('n'),
    ' much larger than 35 locked up my browser.\n       That\'s not good. Fortunately, it\'s easy to improve the performance\n       significantly.'
  ]),
  h3('JavaScript Fibonacci with caching via closure'),
  p(['JavaScript has closure, which means that each function has access to\n       the variables and parameters or its outer function (and the variables\n       and parameters of its outer function\'s outer function, and so on).']),
  p([
    'This is incredibly powerful. It makes it possible to create a\n       variable, ',
    code('cache'),
    ', which can ',
    em('only'),
    ' be accessed\n       by our ',
    code('fibonacci'),
    ' function. This ensures that our cache\n       cannot be overwritten, accidentally or otherwise.'
  ]),
  code$002Dblock(Symbol.for('javascript'))('\n     fibonacci = (function () {\n\n         var cache = {};\n\n         return function (n) {\n\n             var cached = cache[n];\n             if (cached) return cached;\n\n             if (n <= 1) return n;\n\n             return (cache[n] = fibonacci(n - 2) + fibonacci(n - 1));\n         };\n     }());\n     '),
  p(['Does caching make a difference?']),
  code$002Dblock(Symbol.for('TK'))('\n     >>> timer(fibonacci, 35);\n      executed in 1 ms\n      executed in 0 ms\n      executed in 0 ms\n      executed in 0 ms\n      executed in 0 ms\n      executed in 0 ms\n      executed in 0 ms\n      executed in 0 ms\n      executed in 0 ms\n      executed in 0 ms\n     '),
  p([
    'Undeniably, yes. Not only is the new version of the function much\n       faster, but its less recursive nature makes it possible to find\n       Fibonacci numbers for much larger values of ',
    code('n'),
    '.'
  ]),
  p([
    'A slightly different approach is to initialize the cache with\n       values for 0 and 1, making the ',
    code('if (n <= 1)'),
    ' logic\n       unnecessary. Since one of the cached values is now 0, however,\n       the ',
    code('if (cached)'),
    ' statement is no longer appropriate.'
  ]),
  code$002Dblock(Symbol.for('javascript'))('\n     fibonacci = (function () {\n\n         var cache = { 0:0, 1:1 };\n\n         return function (n) {\n\n             var cached = cache[n];\n             if (typeof cached !== \'undefined\') return cached;\n\n             return (cache[n] = fibonacci(n - 2) + fibonacci(n - 1));\n         };\n     }());\n     '),
  h3('JavaScript Fibonacci with caching via function property'),
  p(['It\'s also possible to cache results without using closure.\n       This is important since Python (which I\'ll get to shortly)\n       does not have this capability.']),
  code$002Dblock(Symbol.for('javascript'))('\n     function fibonacci(n) {\n\n         if (!fibonacci.cache) fibonacci.cache = {};\n\n         var cached = fibonacci.cache[n];\n         if (cached) return cached;\n\n         if (n <= 1) return n;\n\n         return (fibonacci.cache[n] = fibonacci(n - 2) + fibonacci(n - 1));\n     }\n     '),
  p(['To avoid the overhead of checking for the existence of the cache\n       on each invocation, the cache could be initialized outside of the\n       function definition.']),
  code$002Dblock(Symbol.for('javascript'))('\n     function fibonacci(n) {\n         // function body\n     }\n     fibonacci.cache = {};\n     '),
  p(['Caching via function property and caching via closure performed\n       equally well for me in Safari on Mac OS X.']),
  h3('Python Fibonacci without caching'),
  code$002Dblock(Symbol.for('python'))('\n     def fibonacci(n):\n         if n <= 1:\n             return n\n         else:\n             return fibonacci(n - 2) + fibonacci(n - 1)\n     '),
  p(['Does the vanilla Python function outperform the vanilla JavaScript\n       function?']),
  code$002Dblock(Symbol.for('TK'))('\n     >>> import time\n     >>> for i in range(10): t = time.time(); fibonacci(35); print time.time() - t;\n     '),
  p(['Interestingly, Python was more than an order of magnitude slower than\n       JavaScript in this worst-case scenario. The point of this exercise is\n       not to compare apples to oranges, however, it\'s to see how much of a\n       difference caching makes in each case.']),
  h3('Python Fibonacci with caching via function property'),
  code$002Dblock(Symbol.for('python'))('\n     def fibonacci(n):\n         if n in fibonacci.cache:\n             return fibonacci.cache[n]\n         elif n <= 1:\n             return n\n         else:\n             f = fibonacci.cache[n] = fibonacci(n - 2) + fibonacci(n - 1)\n             return f\n\n     fibonacci.cache = {}\n     '),
  p([
    'This resulted in ',
    code('fibonacci(35)'),
    ' being executed roughly\n       75,000 times as fast on an empty cache as the vanilla function.'
  ]),
  h3('Python Fibonacci with caching via mutable default argument'),
  p(['For the sake of completion I\'ll include this unappealing approach.']),
  code$002Dblock(Symbol.for('python'))('\n     def fibonacci(n, _cache={}):\n         if n <= 1:\n             return n\n         elif n in _cache:\n             return _cache[n]\n         else:\n             f = _cache[n] = fibonacci(n - 2) + fibonacci(n - 1)\n             return f\n     '),
  p([
    'How does this work? In Python, default arguments are brought to\n       life upon a function\'s creation, not its execution. Thus when ',
    code('fibonacci'),
    ' is called with just one argument (',
    code('n'),
    ')\n       the value of ',
    code('_cache'),
    ' is the dictionary that was created\n       at the time that ',
    code('fibonacci'),
    ' was created. Python\'s\n       dictionaries are mutable, meaning that they can be changed in place.\n       Together, these two features make it possible to use a mutable\n       default argument -- in this case a dictionary -- as a cache.'
  ]),
  h3('Final thoughts'),
  p([
    'I had fun experimenting with these various approaches, furthering\n       my understanding of both JavaScript and Python in the process.\n       I\'ve been writing JavaScript casually for several years; now that\n       I\'m making an effort to actually ',
    em('learn'),
    ' the language\n       I\'m starting to appreciate its brilliance.'
  ])
];
export default {
  ['id']: 67,
  ['slug']: 'self-caching-functions-in-javascript-and-python',
  ['title']: 'Self-caching functions in JavaScript and Python',
  ['datetime']: datetime('2010-08-29')('01:10:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    'javascript',
    'programming',
    'python'
  ],
  ['body']: body
};
