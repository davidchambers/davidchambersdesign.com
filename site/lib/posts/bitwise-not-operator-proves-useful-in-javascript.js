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
import { code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p(['JavaScript is a wonderful language. Its syntax, though, leaves a\n    lot to be desired at times. String pattern matching, for example,\n    is rather ugly.']),
  code$002Dblock(Symbol.for('javascript'))(`// ugly option 1
if (text.indexOf('✈') != -1)

// ugly option 2
if (text.indexOf('✈') >= 0)

// ugly option 3
if (text.indexOf('✈') > -1)
`),
  p([
    'It\'d be nice to be able to write ',
    code('text.contains(\'\u2708\')'),
    ', which\n    is both intuitive and self-documenting. The language does provide a way\n    to make such expressions terser, but it\'s far from obvious.'
  ]),
  code$002Dblock(Symbol.for('javascript'))(`// bitwise NOT
if (~text.indexOf('✈'))
`),
  p([
    a('https://developer.mozilla.org/en/JavaScript/Reference/Operators/Bitwise_Operators')('Bitwise operators'),
    ' make my head spin, but the Perl programmer in\n    me thinks they\'re awesome. I don\'t profess to understand ',
    em('why'),
    '\n    exactly the bitwise NOT operator does what it does, but I\'ve played\n    with it enough to know how it behaves. It\'s equivalent to the following\n    function, at least for the values that can be returned by ',
    a('https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/indexOf')([code('indexOf')]),
    '.'
  ]),
  code$002Dblock(Symbol.for('javascript'))(`function bitwiseNot(n) {
    return -n - 1;
}
`),
  p([
    code('indexOf'),
    ' returns -1, 0, 1, 2, 3, or some other positive\n    integer. When these values are used as operands for the bitwise\n    NOT operator, the results are 0, -1, -2, -3, -4, and so on.\n    Therefore, ',
    code('~text.indexOf(\'\u2708\')'),
    ' is equivalent to ',
    code('text.contains(\'\u2708\')'),
    ' in Boolean contexts.'
  ])
];
export default {
  id: 75,
  slug: 'bitwise-not-operator-proves-useful-in-javascript',
  title: 'Bitwise NOT operator proves useful in JavaScript',
  datetime: datetime('2010-12-11')('15:00:00')(Symbol.for('Australia/Sydney')),
  tags: [
    'javascript',
    'programming'
  ],
  body: body
};
