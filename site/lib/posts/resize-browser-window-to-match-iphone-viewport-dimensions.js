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
import {
  _captioned$002Dimage,
  _captioned$002Dimages,
  _code$002Dblock
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p(['I\'ve recently become interested in optimizing sites for\n             the iPhone and iPod touch. While nothing beats testing on\n             the device itself, I often find it quicker to test changes\n             on my Mac. Changing the user agent string is a piece of cake\n             in Safari (Develop > User Agent > Mobile Safari) but what\n             about adjusting the browser window\'s dimensions to match\n             those of the iPhone?']),
    p(['I\'ve created two bookmarklets to allow the current page to\n             be loaded in an iPhone-sized window with a single click:']),
    ul([
      li([
        p([
          strong('Portrait'),
          ' (labelled "\u2051")'
        ]),
        _code$002Dblock(Symbol.for('plain-text'))('\n                    javascript:open(location,\'iPhone:portrait\',\'innerWidth=\'+(320+15)+\',innerHeight=\'+(480+15)+\',scrollbars=yes\');\n                    ')
      ]),
      li([
        p([
          strong('Landscape'),
          ' (labelled "**")'
        ]),
        _code$002Dblock(Symbol.for('plain-text'))('\n                    javascript:open(location,\'iPhone:landscape\',\'innerWidth=\'+(480+15)+\',innerHeight=\'+(320+15)+\',scrollbars=yes\');\n                    ')
      ])
    ]),
    _captioned$002Dimage('/images/posts/37/iphone-testing-bookmarklets.png')('iPhone testing bookmarklets')('iPhone testing bookmarklets: portrait and landscape')
  ]),
  _captioned$002Dimages([
    [
      '/images/posts/windows/safari-window-iphone-dimensions-portrait.png',
      'Safari window resized to iPhone portrait dimensions',
      '320x480: iPhone portrait dimensions'
    ],
    [
      '/images/posts/windows/safari-window-iphone-dimensions-landscape.png',
      'Safari window resized to iPhone landscape dimensions',
      '480x320: iPhone landscape dimensions'
    ]
  ]),
  p(['It appears that I need to rework this site\'s style sheet\n        to better present content in these smaller viewports!'])
];
export default {
  [Symbol.for('id')]: 37,
  [Symbol.for('slug')]: 'resize-browser-window-to-match-iphone-viewport-dimensions',
  [Symbol.for('title')]: 'Resize browser window to match iPhone viewport dimensions',
  [Symbol.for('datetime')]: datetime('2010-02-16')('03:20:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'bookmarklets',
    'iphone',
    'javascript'
  ],
  [Symbol.for('body')]: body
};
