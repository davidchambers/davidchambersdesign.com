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
