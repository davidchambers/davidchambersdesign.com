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
import datetime from '../datetime.js';
const body = [
  p([img({
      alt: 'Helveticards',
      src: '/images/posts/92/helveticards.jpg'
    })]),
  blockquote([p([
      a('http://helveticards.uberdm.com/')('Helveticards'),
      ' are a\n      set of über minimalist typographic playing cards by designer ',
      a('https://twitter.com/uberryan')('Ryan Myers'),
      '.'
    ])]),
  p([
    'I love these! I designed a set of playing cards several years ago while\n    at university, but I certainly didn\'t think of doing ',
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
  id: 92,
  slug: 'helveticards',
  title: 'Helveticards',
  datetime: datetime('2011-11-20')('22:00:00')(Symbol.for('America/Los_Angeles')),
  tags: [
    'design',
    'typography'
  ],
  body: body
};
