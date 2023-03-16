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
import {
  captioned$002Dimage,
  code$002Dblock,
  $2014
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p([strong('This post has been a long time coming.')]),
    captioned$002Dimage('/images/posts/74/email-message-screenshot.png')('Reminder message')('Reminder message, dated 18 January 2010'),
    p([
      strong('It\'s unacceptable for any website or web application\n      to output dates and times using an arbitrary time zone.'),
      '\n      Displaying dates and times in UTC/GMT is only slightly better:\n      dates cannot be relied upon, and users must perform mental\n      gymnastics in order to localize date\u2013time combos.'
    ])
  ]),
  captioned$002Dimage('/images/posts/74/gmt-ftl.png')('Bitbucket status message')('The link to a time zone converter highlights the need for localization'),
  p([
    'Implementing client-side localization of dates and times is not\n    terribly difficult',
    $2014,
    'I first managed it with only a superficial\n    understanding of JavaScript',
    $2014,
    'but it\'s a challenge to do so in\n    a simple, reusable manner.'
  ]),
  h3('HTML5'),
  p([
    'For localization to be possible date, time, and time zone\n    information must be stored somewhere. In the past we\'d\n    have been forced to misappropriate ',
    code('title'),
    ' or ',
    code('rel'),
    ', or use an unsupported attribute and accept\n    invalid markup. We can now have our cake and eat it too:\n    HTML5 sanctions arbitrary attribute names, prefixed with ',
    code('data-'),
    '.'
  ]),
  p([
    'As it turns out, though, HTML5 provides the perfect hook for\n    date and time localization: the ',
    code('time'),
    ' element,\n    whose ',
    code('datetime'),
    ' attribute provides the canonical\n    representation of a point in time.'
  ]),
  code$002Dblock(Symbol.for('html'))(`<time datetime="1984-04-26">26 April 1984</time>
`),
  p([
    'Simply by using the ',
    code('time'),
    ' element correctly our scripts\n    gain access to date, time, and even time zone information.'
  ]),
  h3('jQuery'),
  p([
    'I was not quick to embrace ',
    a('http://jquery.com/')('jQuery'),
    '.\n    Soon after I discovered DOM scripting and the incompatible DOM\n    APIs provided by the various browsers, I understood the need for\n    a JavaScript library. Soon after that I ',
    del('decided'),
    ' ',
    ins('stumbled'),
    ' upon ',
    a('http://prototypejs.org/')('Prototype'),
    '.\n    More recently I became an advocate of ',
    a('http://mootools.net/')('MooTools'),
    ' which',
    $2014,
    'like Prototype',
    $2014,
    'fixes deficiencies in the JavaScript language itself, in addition\n    to fixing the DOM.'
  ]),
  p([
    'While reading John Resig\'s ',
    i('Secrets of the JavaScript Ninja'),
    '\n    I began at last to appreciate the beauty of jQuery\'s design.\n    Having embraced jQuery I set out to encapsulate the site-specific\n    localization code I\'d been writing again and again in an elagant,\n    reusable package.'
  ]),
  h3('jQuery.localize'),
  p([
    'At ',
    a('http://www.atlassian.com/')('Atlassian'),
    ' we\'re lucky enough\n    to have "20 percent time". A couple of weeks ago I spent the day\n    working on ',
    a('http://bitbucket.org/davidchambers/jquery.localize')('jQuery.localize'),
    ', my first jQuery plugin. I\'ve spent much of the\n    last two weekends making the plugin more flexible and documenting its\n    relatively simple API.'
  ]),
  p([
    'Assume that a page contains the following ',
    code('time'),
    ' element.'
  ]),
  code$002Dblock(Symbol.for('html'))(`<time datetime="2010-11-27T13:30-00:00">27 November 2010</time>
`),
  p([
    'We could localize this element (along with any other ',
    code('time'),
    '\n    elements on the page) with a simple call to ',
    code('localize'),
    '.'
  ]),
  code$002Dblock(Symbol.for('html'))(`$('time').localize();
`),
  p([
    'This updates both the visible text and the value of the ',
    code('datetime'),
    ' attribute.'
  ]),
  code$002Dblock(Symbol.for('html'))(`<time datetime="2010-11-28T00:30+11:00">28 November 2010</time>
`),
  (() => {
    const url = 'http://bitbucket.org/davidchambers/jquery.localize';
    const link = path => {
      return a(url + path);
    };
    return p([
      'Date and time formats are fully customizable via ',
      link('/src#directives')('directives'),
      ', and there is\n      support for ',
      link('/src#i18n')('internationalization'),
      '.\n      I won\'t go into the details here; there\'s extensive ',
      link('/src#wiki')('documentation'),
      ' at the project\'s\n      home on Bitbucket.'
    ]);
  })()
];
export default {
  ['id']: 74,
  ['slug']: 'javascript-date-and-time-localization',
  ['title']: 'JavaScript date and time localization',
  ['datetime']: datetime('2010-11-28')('01:45:00')(Symbol.for('Australia/Sydney')),
  ['tags']: [
    'html5',
    'i18n',
    'javascript',
    'jquery',
    'localization',
    'meaningful-markup'
  ],
  ['body']: body
};
