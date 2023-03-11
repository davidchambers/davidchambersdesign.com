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
  excerpt([
    p([
      'Over the past few months I\'ve reached a startling realization: ',
      strong('JavaScript is a tremendously capable language.')
    ]),
    p(['The reason that it took me so long to discover this is that\n             the playing field has never been fair. On the one hand I\'ve been\n             writing application code for the server, a stable, predictable\n             environment. On the other hand I\'ve been adding interactivity\n             on the client\'s side, dealing with inconsistencies on multiple\n             fronts, not least of which is the DOM API.']),
    p([
      'Comparing Python and JavaScript, for example, by using the\n             former to quickly put together a website using the excellent\n             Django framework while using the latter to add drag and drop\n             functionality is to compare apples and oranges. ',
      strong('Actually, it\'s more like comparing apples to root canals.')
    ])
  ]),
  p([
    'Had I been writing application code in JavaScript (without\n        touching the DOM), I\'d have been in a much better position\n        to weigh each on its merits. Thanks to some terrifically\n        exciting developments in the JS world, it is now possible to\n        write application code ',
    em('entirely'),
    ' in JavaScript.'
  ]),
  p(['When I was first exposed to the idea of having JavaScript on\n        the server, the thing that appealed to me was the potential to\n        share code between server and client. This seemed preferable\n        to the situation that is currently prevalent, whereby objects\n        are created on the server (probably using an ORM such as that\n        provided by Rails or Django) and are then sent down the wire\n        as JSON (or XML for the masochists) at which point they are\n        parsed to create JS objects.']),
  p([
    a('http://www.sproutcore.com/')('SproutCore'),
    ' rewrites the\n        client\u2013server relationship by moving ',
    em('all'),
    ' programming\n        logic to the client. This new approach was motivated by a desire\n        to improve performance, but has two consequential benefits. No\n        longer do objects need to be represented on both sides of the\n        wire (in violation of the DRY principle). This brings another\n        benefit, which is the separation of concerns: the server is\n        freed to focus on serving, and the decoupling of service and\n        application code allow the service to be used (simultaneously)\n        by other applications.'
  ]),
  p(['SproutCore is server-agnostic, which allows it to connect to\n        existing services, and allows new services to be created using\n        the most appropriate server-side technologies.']),
  dl([
    dt(embed({
      [Symbol.for('type')]: 'application/x-shockwave-flash',
      [Symbol.for('src')]: 'http://blip.tv/play/g_MngZaxYQI',
      [Symbol.for('width')]: 480,
      [Symbol.for('height')]: 300,
      [Symbol.for('allowscriptaccess')]: Symbol.for('always'),
      [Symbol.for('allowfullscreen')]: true
    })),
    dd(['Mike Subelsky introducing SproutCore at JSConf Washington,\n             April 2009'])
  ]),
  p([
    'Exciting JavaScript-related developments are not limited to the\n        client-side, however. There are several options available if you\'re\n        interested in running JavaScript on the server, but the one that\'s\n        caught my attention is ',
    a('http://nodejs.org/')('Node.js'),
    '.'
  ]),
  dl([
    dt(embed({
      [Symbol.for('type')]: 'application/x-shockwave-flash',
      [Symbol.for('src')]: 'http://blip.tv/play/AYGylE4C',
      [Symbol.for('width')]: 480,
      [Symbol.for('height')]: 300,
      [Symbol.for('allowscriptaccess')]: Symbol.for('always'),
      [Symbol.for('allowfullscreen')]: true
    })),
    dd(['Ryan Dahl introducing Node.js at JSConf Berlin, November 2009'])
  ]),
  p([
    'The idea of using an event loop on the ',
    em('server'),
    '-side\n        is surprising at first, but obvious in hindsight. JavaScript\n        is extremely well suited to event-driven programming, and the\n        performance gains that can be made with non-blocking request\n        handling are significant.'
  ]),
  p(['JavaScript is at last recieving the attention and respect it\n        has long deserved. I\'m greatly looking forward to building an\n        application using non-blocking, event-driven JavaScript on both\n        sides of the wire.'])
];
export default {
  [Symbol.for('id')]: 61,
  [Symbol.for('slug')]: 'javascript-everywhere',
  [Symbol.for('title')]: 'JavaScript, JavaScript, everywhere',
  [Symbol.for('datetime')]: datetime('2010-07-20')('19:05:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'javascript',
    'node.js',
    'sproutcore'
  ],
  [Symbol.for('body')]: body
};