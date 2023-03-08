import {
  _canonicalize$002Dchildren,
  text,
  excerpt,
  a,
  _a$0027,
  article,
  _article$0027,
  aside,
  _aside$0027,
  b,
  blockquote,
  _blockquote$0027,
  _body$0027,
  code,
  _code$0027,
  dd,
  _dd$0027,
  del,
  _del$0027,
  div,
  dl,
  _dl$0027,
  dt,
  _dt$0027,
  em,
  _em$0027,
  embed,
  footer,
  _footer$0027,
  h1,
  _h1$0027,
  h2,
  _h2$0027,
  h3,
  _h3$0027,
  h4,
  _h4$0027,
  h5,
  _h5$0027,
  h6,
  _h6$0027,
  head,
  _head$0027,
  header,
  _header$0027,
  hr,
  _hr$0027,
  html,
  _html$0027,
  i,
  _i$0027,
  img,
  ins,
  _ins$0027,
  li,
  _li$0027,
  linearGradient,
  link,
  mask,
  meta,
  nav,
  _nav$0027,
  object,
  ol,
  _ol$0027,
  p,
  _p$0027,
  param,
  path,
  pre,
  _pre$0027,
  rect,
  script,
  span,
  stop,
  strong,
  _strong$0027,
  svg,
  time,
  title,
  _title$0027,
  ul,
  _ul$0027,
  _var,
  _var$0027,
  video
} from '../elements.js';
import { _code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p([
    'A reasonably common task is to determine whether a particular\n        statement evaluates as true for every item in a collection.\n        Take ',
    _var('list'),
    ', for example, an Array containing\n        several numbers:'
  ]),
  _code$002Dblock(Symbol.for('javascript'))('\n     var list = [4, -1, 3, 2, 5];\n     '),
  p([
    'One might wish to determine whether all the numbers in ',
    _var('list'),
    ' are positive. The required logic is as follows:'
  ]),
  ol([
    li([
      'assume that all the numbers in ',
      _var('list'),
      ' are positive,\n             then...'
    ]),
    li([
      'loop through ',
      _var('list'),
      ' until the assumption is proven\n             to be false, or until all items in ',
      _var('list'),
      ' have been\n             tested'
    ])
  ]),
  p([
    'In plain JavaScript, this can be achieved using a ',
    code('for'),
    '\n        loop...'
  ]),
  _code$002Dblock(Symbol.for('javascript'))('\n     var allPositive = true;\n     for (var i = 0; i < list.length; i++) {\n         if (list[i] <= 0) {\n             allPositive = false;\n             break;\n         }\n     }\n     '),
  p([
    '... or a ',
    code('while'),
    ' loop (which is slightly more efficient).'
  ]),
  _code$002Dblock(Symbol.for('javascript'))('\n     var allPositive = true, i = list.length;\n     while (i--) {\n         if (list[i] <= 0) {\n             allPositive = false;\n             break;\n         }\n     }\n     '),
  p([
    strong([
      'Seriously, though, who is writing ',
      em('vanilla'),
      '\n        JavaScript in 2010?'
    ]),
    ' Everyone and their grandmothers are\n        using JavaScript frameworks these days, and there are plenty\n        of good ones out there. I recently made the switch to ',
    a('http://mootools.net/')('MooTools'),
    ' from ',
    a('http://prototypejs.org/')('Prototype'),
    ', after deciding that\n        while ',
    a('http://jquery.com/')('jQuery'),
    ' is fantastic, the ',
    a('http://jqueryvsmootools.com/#jsfun')('MooTools philosophy'),
    '\n        is more to my liking.'
  ]),
  p([
    'With MooTools, one might consider using the ',
    a('http://mootools.net/docs/core/Native/Array#Array:each')('Array object\'s each method'),
    '\n        instead of a ',
    code('for'),
    ' or ',
    code('while'),
    ' loop.'
  ]),
  _code$002Dblock(Symbol.for('javascript'))('\n     var allPositive = true;\n     list.each(function (item) {\n         if (item <= 0) {\n             allPositive = false;\n         }\n     });\n     '),
  p([
    'While this gets the job done, it\'s suboptimal for two reasons: the\n        positiveness of ',
    em('every'),
    ' item is evaluated, which will often\n        not be necessary; and, well, ',
    strong('it ain\'t pretty'),
    '. ;)'
  ]),
  h3([
    'Enter ',
    code('every')
  ]),
  p([
    'As is so often the case in programming, if something seems fiddly and\n        difficult there\'s probably a better tool for the job. In this case the ',
    a('http://mootools.net/docs/core/Native/Array#Array:every')('Array object\'s every method'),
    ' is the perfect tool for the job.'
  ]),
  _code$002Dblock(Symbol.for('javascript'))('\n     var allPositive = list.every(function (item) {\n         return item > 0;\n     });\n     '),
  p(['This is terser than is possible with vanilla JavaScript.\n        It reads better too, in my opinion!'])
];
export default {
  [Symbol.for('id')]: 41,
  [Symbol.for('slug')]: 'mootools-every-method',
  [Symbol.for('title')]: 'MooTools every method',
  [Symbol.for('datetime')]: datetime('2010-03-18')('00:40:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'javascript',
    'mootools'
  ],
  [Symbol.for('body')]: body
};
