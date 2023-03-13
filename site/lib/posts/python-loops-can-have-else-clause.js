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
import {
  code$002Dblock,
  update
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  p(['I write a lot of Python. I also write a lot of JavaScript.\n        As I switch between the two (often several times in a day)\n        I sometimes find myself trying to do something in one using\n        the syntax of the other. The most common example is joining\n        a list.']),
  p(['Python:']),
  code$002Dblock(Symbol.for('python'))('\n     \' \'.join([\'foo\', \'bar\'])\n     '),
  p(['JavaScript:']),
  code$002Dblock(Symbol.for('javascript'))('\n     [\'foo\', \'bar\'].join(\' \')\n     '),
  p(['Often -- as is the case above -- the syntactical differences are\n        minor, but there are times when there\'s no direct translation.']),
  p([
    a('http://mootools.net/')('MooTools'),
    ', for example, adds the ',
    a('http://mootools.net/docs/core/Native/Array#Array:every')([
      code('every'),
      ' method'
    ]),
    ' to the ',
    code('Array'),
    ' object.\n        This makes it possible to write some rather terse conditional\n        statements.'
  ]),
  code$002Dblock(Symbol.for('javascript'))('\n     var numbers = [87, 33, 21, 75];\n     if (numbers.every(function (n) { return n % 3 == 0; })) {\n         window.alert(\'The numbers are all divisible by 3.\');\n     }\n     '),
  p(['Python lists have no comparable method, so how would one write\n        this in Python?']),
  code$002Dblock(Symbol.for('python'))('\n     numbers = [87, 33, 21, 75]\n     if [n for n in numbers if n % 3 == 0] == numbers:\n         print \'The numbers are all divisible by 3.\'\n     '),
  p([
    'This approach involves using a list comprehension to create a\n        list of numbers which are divisible by 3, and comparing this list\n        to ',
    code('numbers'),
    '. If the lists are equal, everything in ',
    code('numbers'),
    ' is divisible by 3.'
  ]),
  update(datetime('2012-06-20')('14:15:00')(Symbol.for('America/Los_Angeles')))([
    p([
      'As ',
      a('https://twitter.com/rafael_ab/status/215428832872771584')('Rafael Almeida pointed out on Twitter'),
      ', there ',
      em('is'),
      ' an\n             elegant way to express this in Python:'
    ]),
    code$002Dblock(Symbol.for('python'))('\n          if all((n % 3 == 0 for n in numbers)):\n               print \'The numbers are all divisible by 3.\'\n          ')
  ]),
  h3('Now for something a bit more challenging'),
  p(['Assume that we have a list of documents, and we want to know which\n        of the documents contain all the terms in a list of search terms.']),
  code$002Dblock(Symbol.for('javascript'))('\n     // (MooTools) JavaScript\n\n     var terms = [\'python\', \'list\', \'methods\'], matches = [];\n     documents.each(function (document) {\n         if (terms.every(function (term) {\n             return document.body.indexOf(term) != -1;\n         })) matches.append(document);\n     });\n     '),
  p([
    'Here, we ',
    em('could'),
    ' use the list comprehension approach\n        as before.'
  ]),
  code$002Dblock(Symbol.for('python'))('\n     # Python\n\n     terms = [\'python\', \'list\', \'methods\']\n     matches = []\n     for document in documents:\n         if [t for t in terms if document.body.find(t) != -1] == terms:\n             matches.append(document)\n     '),
  p([
    'This is reasonably succinct, but not terribly efficient since\n        each document is checked for ',
    em('every'),
    ' search term. Given\n        that we\'re not interested in documents that lack even a single\n        search term, it should be possible to rewrite this code so that\n        we don\'t waste time on lost causes.'
  ]),
  p([
    'It turns out that Python has just the thing for the job: ',
    strong([
      'in Python, a loop statements may have an ',
      code('else'),
      '\n        clause!'
    ])
  ]),
  code$002Dblock(Symbol.for('python'))('\n     terms = [\'python\', \'list\', \'methods\']\n     matches = []\n     for document in documents:\n         for term in terms:\n             if document.body.find(term) == -1:\n                 break\n         else: # every term was found\n             matches.append(document)\n     '),
  p([
    'From ',
    a('http://docs.python.org/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops')('4. More Control Flow Tools'),
    ':'
  ]),
  blockquote([p([
      'Loop statements may have an ',
      code('else'),
      ' clause; it is\n             executed when the loop terminates through exhaustion of the\n             list (with ',
      code('for'),
      ') or when the condition becomes\n             false (with ',
      code('while'),
      '), but not when the loop is\n             terminated by a ',
      code('break'),
      ' statement.'
    ])]),
  p([
    strong([
      'I\'m looking forward to finding more good spots to make\n        use of ',
      code('else'),
      ' clauses with my Python loops.'
    ]),
    ' :D'
  ])
];
export default {
  [Symbol.for('id')]: 66,
  [Symbol.for('slug')]: 'python-loops-can-have-else-clause',
  [Symbol.for('title')]: 'Python loops can have else clause?!',
  [Symbol.for('datetime')]: datetime('2010-07-25')('18:11:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'javascript',
    'mootools',
    'programming',
    'python'
  ],
  [Symbol.for('body')]: body
};
