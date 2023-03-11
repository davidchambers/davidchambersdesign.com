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
import { _code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p(['If you\'ve ever worked with CSS, you\'ll understand how frustrating\n        it is to edit a style sheet and be unable to view the change because\n        a cached version of the file is being used. One line of PHP will fix\n        this problem, and will also ensure that visitors never view your site\n        through the lens of an outdated style sheet.']),
  p(['If you\'ve ever worked with CSS, you\'ll understand how frustrating\n        it is to edit a style sheet and be unable to view the change because\n        a cached version of the file is being used.']),
  p(['In the past, I\'ve adopted an unscientific approach to working\n        around this problem: I\'ve done forced refreshes, relaunched browsers,\n        emptied caches, and even disabled caching entirely using Firefox\'s\n        Web Developer extension.']),
  p(['Each of these workarounds is problematic in some way: browsers do\n        not agree on exactly what a page refresh should do; quitting and\n        relaunching a browser is time-consuming (particularly with Firefox\n        on OS X); emptying the cache gobbles up bandwidth; and disabling\n        caching slows down the testing process by forcing a bunch of static\n        files to be retrieved from the server every time the page is loaded.']),
  p([
    'While the problem of cached style sheets is largely an annoyance\n        confined to the development environment, it occasionally causes\n        problems at other times. For example, let\'s say that you\'ve made\n        a minor change to a site\'s source code \u2013 you\'ve changed ',
    code('<div id="wrapper">'),
    ' to ',
    code('<div id="wrap">'),
    '. You\'ve also done a find and replace on the style sheet, and\n        rolled both changes live. A new visitor to the site will have\n        no problems, but a returning visitor may see the site through\n        the lens of an out-of-date style sheet. Yikes!'
  ]),
  p([
    'I decided that it was time to find a reliable solution\n        to the above problems. I came across an article on ',
    a('http://css-tricks.com/can-we-prevent-css-caching/')('timestamping CSS'),
    '\n        which suggests appending a unique string to a style sheet\'s\n        href when linking to it in a page\'s ',
    code('<head>'),
    '.'
  ]),
  p(['After reading the replies to the above post, and taking on board\n        several good suggestions, here is the PHP code I have decided upon:']),
  _code$002Dblock(Symbol.for('php'))('\n     href="path/to/style.css?<?php echo date(\'Y-m-d-H-i-s\', filectime(\'path/to/style.css\')); ?>"\n     '),
  p(['The above generates something like this:']),
  _code$002Dblock(Symbol.for('html'))('\n     href="path/to/style.css?2008-12-16-20-02-53"\n     '),
  p([
    'The nice thing about using ',
    a('http://php.net/manual/en/function.filectime.php')('PHP\'s filectime function'),
    '\n        is that the timestamp is dependent on the time at which the CSS file\n        was last modified. This means that the cached style sheet is used when\n        it is ',
    strong('up to date'),
    ', but the file is retrieved from the\n        server when it has been ',
    strong('changed in any way'),
    '.'
  ])
];
export default {
  [Symbol.for('id')]: 4,
  [Symbol.for('slug')]: 'intelligent-css-caching',
  [Symbol.for('title')]: 'Intelligent CSS caching',
  [Symbol.for('datetime')]: datetime('2008-12-18')('14:50:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'css',
    'php'
  ],
  [Symbol.for('body')]: body
};