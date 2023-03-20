import {
  text,
  a,
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
import {
  captioned$002Dimages,
  code$002Dblock
} from '../components.js';
import datetime from '../datetime.js';
const excerpt = [
  p(['I\'ve recently become interested in optimizing sites for\n    the iPhone and iPod touch. While nothing beats testing on\n    the device itself, I often find it quicker to test changes\n    on my Mac. Changing the user agent string is a piece of cake\n    in Safari (Develop > User Agent > Mobile Safari) but what\n    about adjusting the browser window\'s dimensions to match\n    those of the iPhone?']),
  p(['I\'ve created two bookmarklets to allow the current page to\n    be loaded in an iPhone-sized window with a single click:']),
  ul([
    li([
      p([
        strong(['Portrait']),
        ` (labelled "⁑")`
      ]),
      code$002Dblock('plain-text')(`javascript:open(location,'iPhone:portrait','innerWidth='+(320+15)+',innerHeight='+(480+15)+',scrollbars=yes');
`)
    ]),
    li([
      p([
        strong(['Landscape']),
        ` (labelled "**")`
      ]),
      code$002Dblock('plain-text')(`javascript:open(location,'iPhone:landscape','innerWidth='+(480+15)+',innerHeight='+(320+15)+',scrollbars=yes');
`)
    ])
  ]),
  captioned$002Dimages([{
      alt: 'iPhone testing bookmarklets',
      src: '/images/posts/37/iphone-testing-bookmarklets.png',
      caption: ['iPhone testing bookmarklets: portrait and landscape']
    }])
];
const body = [
  ...excerpt,
  captioned$002Dimages([
    {
      alt: 'Safari window resized to iPhone portrait dimensions',
      src: '/images/posts/windows/safari-window-iphone-dimensions-portrait.png',
      caption: ['320x480: iPhone portrait dimensions']
    },
    {
      alt: 'Safari window resized to iPhone landscape dimensions',
      src: '/images/posts/windows/safari-window-iphone-dimensions-landscape.png',
      caption: ['480x320: iPhone landscape dimensions']
    }
  ]),
  p(['It appears that I need to rework this site\'s style sheet\n    to better present content in these smaller viewports!'])
];
export default {
  id: 37,
  slug: 'resize-browser-window-to-match-iphone-viewport-dimensions',
  title: ['Resize browser window to match iPhone viewport dimensions'],
  datetime: datetime('2010-02-16')('03:20:00')('Pacific/Auckland'),
  tags: [
    'bookmarklets',
    'iphone',
    'javascript'
  ],
  body: body
};
