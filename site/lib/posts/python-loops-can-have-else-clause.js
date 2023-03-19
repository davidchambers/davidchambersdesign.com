import {
  canonicalize$002Dchildren,
  text,
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
  update,
  $2014
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  p(['I write a lot of Python. I also write a lot of JavaScript. As I switch\n    between the two (often several times in a day) I sometimes find myself\n    trying to do something in one using the syntax of the other. The most\n    common example is joining a list.']),
  p(['Python:']),
  code$002Dblock(Symbol.for('python'))(`' '.join(['foo', 'bar'])
`),
  p(['JavaScript:']),
  code$002Dblock(Symbol.for('javascript'))(`['foo', 'bar'].join(' ')
`),
  p([
    'Often',
    $2014,
    'as is the case above',
    $2014,
    'the syntactical differences\n    are minor, but there are times when there\'s no direct translation.'
  ]),
  p([
    a('http://mootools.net/')('MooTools'),
    ', for example, adds the ',
    a('http://mootools.net/docs/core/Native/Array#Array:every')([
      code('every'),
      ' method'
    ]),
    ' to the ',
    code('Array'),
    ' object.\n      This makes it possible to write some rather terse conditional\n      statements.'
  ]),
  code$002Dblock(Symbol.for('javascript'))(`var numbers = [87, 33, 21, 75];
if (numbers.every(function (n) { return n % 3 == 0; })) {
    window.alert('The numbers are all divisible by 3.');
}
`),
  p(['Python lists have no comparable method, so how would one write\n    this in Python?']),
  code$002Dblock(Symbol.for('python'))(`numbers = [87, 33, 21, 75]
if [n for n in numbers if n % 3 == 0] == numbers:
    print 'The numbers are all divisible by 3.'
`),
  p([
    'This approach involves using a list comprehension to create a\n    list of numbers which are divisible by 3, and comparing this list\n    to ',
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
      ' an\n      elegant way to express this in Python:'
    ]),
    code$002Dblock(Symbol.for('python'))(`if all((n % 3 == 0 for n in numbers)):
     print 'The numbers are all divisible by 3.'
`)
  ]),
  h3('Now for something a bit more challenging'),
  p(['Assume that we have a list of documents, and we want to know which\n    of the documents contain all the terms in a list of search terms.']),
  code$002Dblock(Symbol.for('javascript'))(`// (MooTools) JavaScript

var terms = ['python', 'list', 'methods'], matches = [];
documents.each(function (document) {
    if (terms.every(function (term) {
        return document.body.indexOf(term) != -1;
    })) matches.append(document);
});
`),
  p([
    'Here, we ',
    em('could'),
    ' use the list comprehension approach\n    as before.'
  ]),
  code$002Dblock(Symbol.for('python'))(`# Python

terms = ['python', 'list', 'methods']
matches = []
for document in documents:
    if [t for t in terms if document.body.find(t) != -1] == terms:
        matches.append(document)
`),
  p([
    'This is reasonably succinct, but not terribly efficient since\n    each document is checked for ',
    em('every'),
    ' search term. Given\n    that we\'re not interested in documents that lack even a single\n    search term, it should be possible to rewrite this code so that\n    we don\'t waste time on lost causes.'
  ]),
  p([
    'It turns out that Python has just the thing for the job: ',
    strong([
      'in Python, a loop statements may have an ',
      code('else'),
      '\n    clause!'
    ])
  ]),
  code$002Dblock(Symbol.for('python'))(`terms = ['python', 'list', 'methods']
matches = []
for document in documents:
    for term in terms:
        if document.body.find(term) == -1:
            break
    else: # every term was found
        matches.append(document)
`),
  p([
    'From ',
    a('http://docs.python.org/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops')('4. More Control Flow Tools'),
    ':'
  ]),
  blockquote([p([
      'Loop statements may have an ',
      code('else'),
      ' clause; it is\n      executed when the loop terminates through exhaustion of the\n      list (with ',
      code('for'),
      ') or when the condition becomes\n      false (with ',
      code('while'),
      '), but not when the loop is\n      terminated by a ',
      code('break'),
      ' statement.'
    ])]),
  p([
    strong([
      'I\'m looking forward to finding more good spots to make\n    use of ',
      code('else'),
      ' clauses with my Python loops.'
    ]),
    ' :D'
  ])
];
export default {
  id: 66,
  slug: 'python-loops-can-have-else-clause',
  title: 'Python loops can have else clause?!',
  datetime: datetime('2010-07-25')('18:11:00')(Symbol.for('Pacific/Auckland')),
  tags: [
    'javascript',
    'mootools',
    'programming',
    'python'
  ],
  body: body
};
