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
import { _captioned$002Dimage } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p([
    'Gmail currently serves up two possible favicons, a 16x16 ',
    code('shortcut icon'),
    ' and a 32x32 ',
    code('icon'),
    '.\n        I\'ve no idea why the latter is included, but my browser\n        is happy to accept either version, which can lead to a\n        rather amusing situation.'
  ]),
  _captioned$002Dimage('/images/posts/63/gmail-icons.png')('Browser tabs featuring different Gmail icons')('Scaled down 32x32 icon (left) and regular favicon'),
  p(['Most days when Gmail loads I get the favicon, but I\'ve had a couple\n        of extended periods of seeing the other version instead. I\'d even\n        wondered whether Google was undertaking some A/B testing, although\n        this seemed rather far-fetched. I now believe that there\'s a race\n        condition, and that the smaller image usually wins this race.']),
  p(['I far prefer the 32x32 version (it makes the favicon look anaemic),\n        but when I had a close look at it I was upset by its sloppiness.']),
  _captioned$002Dimage('/images/posts/63/gmail-icon-32*10.png')('32x32 Gmail icon at 1000%')('32x32 Gmail icon at 1000%'),
  p([
    a('http://blog.cocoia.com/')('Sebastiaan de With'),
    '\n        would not stand for this!'
  ])
];
export default {
  [Symbol.for('id')]: 63,
  [Symbol.for('slug')]: 'gmail-favicon-confusion',
  [Symbol.for('title')]: 'Gmail\'s favicon confusion',
  [Symbol.for('datetime')]: datetime('2010-07-21')('10:56:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'design',
    'gmail'
  ],
  [Symbol.for('body')]: body
};