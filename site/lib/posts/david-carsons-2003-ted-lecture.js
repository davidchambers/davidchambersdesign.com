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
    'One of my flatmates linked me to this clip recently. It\'s titled ',
    a('http://www.ted.com/index.php/talks/david_carson_on_design.html')('Design, discovery and humor'),
    ' and certainly delivers the\n        entertainment it promises. It\'s well worth a look.'
  ]),
  dl([
    dt(object({
      [Symbol.for('type')]: 'application/x-shockwave-flash',
      [Symbol.for('width')]: '446',
      [Symbol.for('height')]: '326',
      [Symbol.for('data')]: 'http://video.ted.com/assets/player/swf/EmbedPlayer.swf'
    })([
      param({
        [Symbol.for('name')]: 'movie',
        [Symbol.for('value')]: 'http://video.ted.com/assets/player/swf/EmbedPlayer.swf'
      }),
      param({
        [Symbol.for('name')]: 'wmode',
        [Symbol.for('value')]: 'transparent'
      }),
      param({
        [Symbol.for('name')]: 'allowFullScreen',
        [Symbol.for('value')]: 'true'
      }),
      param({
        [Symbol.for('name')]: 'flashvars',
        [Symbol.for('value')]: 'vu=http://video.ted.com/talks/embed/DavidCarson_2003-embed_high.flv&su=http://images.ted.com/images/ted/tedindex/embed-posters/DavidCarson-2003.embed_thumbnail.jpg&vw=432&vh=240&ap=0&ti=436'
      })
    ])),
    dd(p([
      'David Carson presents ',
      strong('Design, discovery and humor'),
      '\n                at TED, February 2003'
    ]))
  ])
];
export default {
  [Symbol.for('id')]: 6,
  [Symbol.for('slug')]: 'david-carsons-2003-ted-lecture',
  [Symbol.for('title')]: 'David Carson\'s 2003 TED lecture',
  [Symbol.for('datetime')]: datetime('2009-02-10')('11:21:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'design',
    'typography',
    'video'
  ],
  [Symbol.for('body')]: body
};
