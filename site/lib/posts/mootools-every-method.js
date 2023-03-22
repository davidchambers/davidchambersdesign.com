import {
  text,
  a,
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
const Prelude = { map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f) };
const body = [
  p([
    'A reasonably common task is to determine whether a particular\n    statement evaluates as true for every item in a collection.\n    Take ',
    var_(['list']),
    ', for example, an Array containing\n    several numbers:'
  ]),
  code$002Dblock('javascript')(`var list = [4, -1, 3, 2, 5];
`),
  p([
    'One might wish to determine whether all the numbers in ',
    var_(['list']),
    ' are positive. The required logic is as follows:'
  ]),
  ol([
    li([
      'assume that all the numbers in ',
      var_(['list']),
      ' are positive, then...'
    ]),
    li([
      'loop through ',
      var_(['list']),
      ' until the assumption is proven to be\n      false, or until all items in ',
      var_(['list']),
      ' have been tested'
    ])
  ]),
  p([
    'In plain JavaScript, this can be achieved using a ',
    code(['for']),
    '\n    loop...'
  ]),
  code$002Dblock('javascript')(`var allPositive = true;
for (var i = 0; i < list.length; i++) {
    if (list[i] <= 0) {
        allPositive = false;
        break;
    }
}
`),
  p([
    '... or a ',
    code(['while']),
    ' loop (which is slightly more efficient).'
  ]),
  code$002Dblock('javascript')(`var allPositive = true, i = list.length;
while (i--) {
    if (list[i] <= 0) {
        allPositive = false;
        break;
    }
}
`),
  p([
    strong([
      'Seriously, though, who is writing ',
      em(['vanilla']),
      '\n    JavaScript in 2010?'
    ]),
    ' Everyone and their grandmothers are\n    using JavaScript frameworks these days, and there are plenty\n    of good ones out there. I recently made the switch to ',
    a({ href: 'http://mootools.net/' })(['MooTools']),
    ' from ',
    a({ href: 'http://prototypejs.org/' })(['Prototype']),
    ',\n    after deciding that while ',
    a({ href: 'http://jquery.com/' })(['jQuery']),
    ' is fantastic, the ',
    a({ href: 'http://jqueryvsmootools.com/#jsfun' })(['MooTools philosophy']),
    '\n    is more to my liking.'
  ]),
  p([
    'With MooTools, one might consider using the ',
    a({ href: 'http://mootools.net/docs/core/Native/Array#Array:each' })(['Array object\'s each method']),
    '\n    instead of a ',
    code(['for']),
    ' or ',
    code(['while']),
    ' loop.'
  ]),
  code$002Dblock('javascript')(`var allPositive = true;
list.each(function (item) {
    if (item <= 0) {
        allPositive = false;
    }
});
`),
  p([
    'While this gets the job done, it\'s suboptimal for two reasons: the\n    positiveness of ',
    em(['every']),
    ' item is evaluated, which will often\n    not be necessary; and, well, ',
    strong(['it ain\'t pretty']),
    '. ;)'
  ]),
  h3([
    'Enter ',
    code(['every'])
  ]),
  p([
    'As is so often the case in programming, if something seems fiddly and\n    difficult there\'s probably a better tool for the job. In this case the ',
    a({ href: 'http://mootools.net/docs/core/Native/Array#Array:every' })(['Array object\'s every method']),
    ' is the perfect tool for the job.'
  ]),
  code$002Dblock('javascript')(`var allPositive = list.every(function (item) {
    return item > 0;
});
`),
  p(['This is terser than is possible with vanilla JavaScript.\n    It reads better too, in my opinion!'])
];
export default {
  id: 41,
  slug: 'mootools-every-method',
  title: ['MooTools every method'],
  datetime: datetime('2010-03-18')('00:40:00')('Pacific/Auckland'),
  tags: [
    'javascript',
    'mootools'
  ],
  body: body
};
