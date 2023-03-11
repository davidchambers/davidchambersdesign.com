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
import datetime from '../datetime.js';
const body = [
  p([
    'I came across this recently while browsing ',
    a('http://markboulton.co.uk/')('Mark Boulton\'s site'),
    '. The style\n        and control of Job\'s hand is played off against the exuberance of his\n        son\'s approach. An upbeat soundtrack accompanies the performance.'
  ]),
  dl([
    dt(a('http://www.youtube.com/watch?v=ajjg3faIQ5A')('abcdefghijklmnopqrstuvwxyz')),
    dd('Video by Job & Roel Wouters')
  ]),
  p(['From the director:']),
  blockquote(p(['Job and Gradus are both ambitious concerning letters.\n           Spontaneous jam sessions in our studio inspired us to\n           make this film about the fun [of] drawing letters.']))
];
export default {
  [Symbol.for('id')]: 1,
  [Symbol.for('slug')]: 'beautiful-painted-alphabet',
  [Symbol.for('title')]: 'Beautiful painted alphabet',
  [Symbol.for('datetime')]: datetime('2008-08-22')('01:56:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'design',
    'typography',
    'video'
  ],
  [Symbol.for('body')]: body
};