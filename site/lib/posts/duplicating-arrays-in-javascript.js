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
  p([
    'Many of those who write JavaScript do not come from programming\n    backgrounds (while I\'ve written plenty of PHP, Python, and\n    JavaScript, I don\'t have much experience with "real" programming\n    languages',
    a('#footnote')('*'),
    '). As a result, a significant\n    portion of JavaScript coders do not think of variables as pointers\n    to memory addresses. This leads to confusion in cases such as this:'
  ]),
  code$002Dblock('javascript')(`var fruits = ['orange', 'lime'];
var colours = fruits; // naïve attempt to duplicate array
colours.push('yellow');
`),
  p([
    'One might be surprised to learn that ',
    code('fruits'),
    ' now contains\n    not just "orange" and "lime" but also "yellow". Oops! Here\'s how\n    it went wrong:'
  ]),
  code$002Dblock('javascript')(`var fruits = ['orange', 'lime'];
// fruits points to array containing "orange" and "lime"

var colours = fruits;
// colours now points to that same array!
`),
  p([
    'How, then, does one create a copy of the original array? ',
    em('Slice!')
  ]),
  code$002Dblock('javascript')(`var colours = fruits.slice();
`),
  aside$0027({ id: 'footnote' })([
    '* Languages such as C.\n    Like ',
    a('http://www.quirksmode.org/about/')('ppk'),
    ',\n    I take care to include quotation marks. ;)'
  ])
];
export default {
  id: 35,
  slug: 'duplicating-arrays-in-javascript',
  title: 'Duplicating arrays in JavaScript',
  datetime: datetime('2010-01-09')('19:26:00')('Pacific/Auckland'),
  tags: ['javascript'],
  body: body
};
