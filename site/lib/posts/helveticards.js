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
import { _uncaptioned$002Dimage } from '../components.js';
import datetime from '../datetime.js';
const body = [
  _uncaptioned$002Dimage('/images/posts/92/helveticards.jpg')('Helveticards'),
  blockquote([p([
      a('http://helveticards.uberdm.com/')('Helveticards'),
      ' are a\n             set of über minimalist typographic playing cards by designer ',
      a('https://twitter.com/uberryan')('Ryan Myers'),
      '.'
    ])]),
  p([
    'I love these! I designed a set of playing cards several years\n        ago while at university, but I certainly didn\'t think of doing ',
    em('this'),
    '.'
  ]),
  p([
    'Via ',
    a('http://laughingsquid.com/helveticards-minimalist-typographic-playing-cards/')('Laughing Squid'),
    '.'
  ])
];
export default {
  [Symbol.for('id')]: 92,
  [Symbol.for('slug')]: 'helveticards',
  [Symbol.for('title')]: 'Helveticards',
  [Symbol.for('datetime')]: datetime('2011-11-20')('22:00:00')(Symbol.for('America/Los_Angeles')),
  [Symbol.for('tags')]: [
    'design',
    'typography'
  ],
  [Symbol.for('body')]: body
};