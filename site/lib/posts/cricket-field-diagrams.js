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
import { _captioned$002Dimages } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p([
    'While creating documentation for ',
    i('Dice Cricket'),
    ',\n        a game a friend and I designed many years ago, I produced\n        a set of diagrams which represent the segments of a cricket\n        field. The isolated nature of this small design challenge\n        provided a refreshing break from the various and interrelated\n        considerations involved in designing for the Web.'
  ]),
  _captioned$002Dimages([
    [
      '/images/posts/40/mid-wicket.png',
      'Cricket field with mid-wicket area highlighted',
      'Mid-wicket'
    ],
    [
      '/images/posts/40/down-the-ground.png',
      'Cricket field with covers highlighted',
      'Down the ground'
    ],
    [
      '/images/posts/40/covers.png',
      'Cricket field with covers highlighted',
      'Covers'
    ],
    [
      '/images/posts/40/behind-point.png',
      'Cricket field with area behind point highlighted',
      'Behind point'
    ],
    [
      '/images/posts/40/behind-the-wicket.png',
      'Cricket field with area behind the wicket highlighted',
      'Behind the wicket'
    ],
    [
      '/images/posts/40/behind-square.png',
      'Cricket field with area backward of square highlighted',
      'Behind square'
    ]
  ]),
  p(['You\'re free to make use of these images (they\'re transparent PNGs).\n        Attribution is appreciated but not required. :)'])
];
export default {
  [Symbol.for('id')]: 40,
  [Symbol.for('slug')]: 'cricket-field-diagrams',
  [Symbol.for('title')]: 'Cricket field diagrams',
  [Symbol.for('datetime')]: datetime('2010-03-15')('00:58:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'design',
    'icons'
  ],
  [Symbol.for('article-id')]: 'cricket-field-diagrams',
  [Symbol.for('body')]: body
};
