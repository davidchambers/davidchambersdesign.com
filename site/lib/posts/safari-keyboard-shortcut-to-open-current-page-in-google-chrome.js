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
import { update } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p([
    'I followed ',
    a('http://daringfireball.net/2010/11/flash_free_and_cheating_with_google_chrome')('John Gruber\'s suggestion'),
    ' and removed Flash Player from my Mac.\n        Like John, I\'ve come to rely upon Google Chrome for viewing the\n        occasional Flash movie. As a result I\'ve become proficient at the\n        keyboard dance required to open in Chrome the page I\'m currently\n        viewing in Safari:'
  ]),
  ol([
    li([
      strong('\u2318L'),
      '\n              (',
      strong('File'),
      ' > ',
      strong('Open Location...'),
      ')'
    ]),
    li([
      strong('\u2318C'),
      '\n              (',
      strong('Edit'),
      ' > ',
      strong('Copy'),
      ')'
    ]),
    li([
      strong('\u2318Space'),
      '\n              (invoke Quicksilver/Spotlight)'
    ]),
    li([
      strong('C-H-R-\u21A9'),
      '\n              (open Google Chrome)'
    ]),
    li([
      strong('\u2318L'),
      '\n              (',
      strong('File'),
      ' > ',
      strong('Open Location...'),
      ')'
    ]),
    li([
      strong('\u2318V'),
      '\n              (',
      strong('Edit'),
      ' > ',
      strong('Paste'),
      ')'
    ]),
    li([
      strong('\u21A9'),
      '\n              (go, go, go!)'
    ])
  ]),
  p(['Well, I\'ve performed this dance for the last time.\n        I now do this instead:']),
  ol([li([strong('\u2325\u2318G')])]),
  p([
    'Credit for this simple but brilliant idea goes to Rob McBroom.\n        Rob\'s post on ',
    a('http://projects.skurfer.com/posts/2011/chrome_shortcut/')('opening pages in Google Chrome'),
    ' lists the (very easy)\n        steps required to enable this shortcut.'
  ]),
  update(datetime('2011-01-30')('23:30:00')(Symbol.for('America/Los_Angeles')))([p(['Chris points out that John himself mentioned this trick\n             in his aforelinked post.'])])
];
export default {
  [Symbol.for('id')]: 77,
  [Symbol.for('slug')]: 'safari-keyboard-shortcut-to-open-current-page-in-google-chrome',
  [Symbol.for('title')]: 'Safari keyboard shortcut to open current page in Google Chrome',
  [Symbol.for('datetime')]: datetime('2011-01-30')('21:35:00')(Symbol.for('America/Los_Angeles')),
  [Symbol.for('tags')]: [
    'flash',
    'google-chrome',
    'keyboard-shortcuts',
    'mac-os-x',
    'safari'
  ],
  [Symbol.for('body')]: body
};
