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
import { captioned$002Dimages } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p([
    'While creating documentation for ',
    i('Dice Cricket'),
    ',\n        a game a friend and I designed many years ago, I produced\n        a set of diagrams which represent the segments of a cricket\n        field. The isolated nature of this small design challenge\n        provided a refreshing break from the various and interrelated\n        considerations involved in designing for the Web.'
  ]),
  captioned$002Dimages([
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
  ['id']: 40,
  ['slug']: 'cricket-field-diagrams',
  ['title']: 'Cricket field diagrams',
  ['datetime']: datetime('2010-03-15')('00:58:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    'design',
    'icons'
  ],
  ['article-id']: 'cricket-field-diagrams',
  ['body']: body
};
