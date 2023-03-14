import {
  canonicalize$002Dchildren,
  text,
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
  captioned$002Dimages,
  code$002Dblock,
  decorative$002Dimage
} from '../components.js';
import datetime from '../datetime.js';
const excerpt = [
  p(['Modern browsers can display exciting visual effects such\n        as drop shadows (without the use of background images).\n        CSS3 makes it possible to turn submit inputs and even links\n        into rich, Aqua-like buttons in these browsers (alternative\n        style rules can be provided for older browsers).']),
  decorative$002Dimage('/images/posts/39/start-game-hyperlink-and-button.png')
];
const body = [
  p([
    'The two cornerstones of the Web as an interactive medium are the ',
    a('http://en.wikipedia.org/wiki/Form_(web)')('form'),
    ',\n        which facilitates the submission and retrieval of data, and the ',
    a('http://en.wikipedia.org/wiki/Hyperlink')('hyperlink'),
    ',\n        which facilitates navigation.'
  ]),
  p([
    'Since form submission buttons and hyperlinks ',
    em('do'),
    '\n        different things, it makes sense that browsers display them\n        differently (by default).'
  ]),
  captioned$002Dimage('/images/posts/39/unstyled-button-and-hyperlink.png')('Unstyled button and hyperlink')('Default appearance of buttons and hyperlinks in Safari on Mac OS X'),
  p([
    'Web applications, however, sometimes blur the line between\n        doing things and going places; visually distinguishing\n        links from buttons, therefore, is not always appropriate.\n        As Stephen Anderson explains in his article ',
    a('http://www.alistapart.com/articles/indefenseofeyecandy')('In Defense of Eye Candy'),
    ' on ',
    a('http://www.alistapart.com/')('A List Apart'),
    ', an element\'s\n        appearance should suggest appropriate modes of interaction.'
  ]),
  captioned$002Dimage('/images/posts/39/wordpress-publish-pane.png')('WordPress Publish pane')([
    'In WordPress\'s ',
    strong('Publish'),
    ' pane "Save Draft" is a\n        submit input, "Preview" is a link; both are styled as buttons'
  ]),
  h3('Styling links to look like buttons'),
  p([em([
      strong('Beware!'),
      ' There\'s quite a bit involved in styling\n             form elements \u2013 be sure that there\'s a compelling reason to\n             override default browser styling before doing so.'
    ])]),
  p(['An unstyled submit input and an unstyled hyperlink are displayed\n        below. One must declare a number of rules in order to have the two\n        elements rendered in the same way.']),
  captioned$002Dimages([
    [
      '/images/posts/39/start-game-button-and-hyperlink-unstyled.png',
      'Unstyled button and hyperlink',
      'Unstyled submit input and hyperlink'
    ],
    [
      '/images/posts/39/start-game-button-and-hyperlink-border.png',
      'Button and hyperlink with border',
      code('border: 1px solid #850; color: #850;')
    ],
    [
      '/images/posts/39/start-game-button-and-hyperlink-background-color.png',
      'Button and hyperlink with background colour',
      code('background: #fc6; text-decoration: none;')
    ],
    [
      '/images/posts/39/start-game-button-and-hyperlink-padding-font.png',
      'Button and hyperlink with consistent padding and font properties',
      code('padding: 0.25em 0.5em;\n                font: bold 12px/15px\n                      "Lucida Grande",\n                      "Lucida Sans Unicode",\n                      sans-serif;')
    ]
  ]),
  h4('Progressive enhancement'),
  p([
    'The submit input and the link now look the same, and ',
    em('somewhat'),
    ' button-like. Even antiquated browsers\n        such as Internet Explorer 6 understand the rules defined\n        thus far. The next step is to make the elements more\n        appealing and more button-like in modern browsers.'
  ]),
  code$002Dblock(Symbol.for('css'))('\n     -webkit-border-radius: 1em;\n     -moz-border-radius: 1em;\n     border-radius: 1em;\n     '),
  captioned$002Dimage('/images/posts/39/start-game-button-and-hyperlink-border-radius.png')('Button and hyperlink with rounded corners')('Rounded corners'),
  code$002Dblock(Symbol.for('css'))('\n     background: -webkit-gradient(linear, left top, left bottom,\n         from(#fc6), to(#fc6),\n         color-stop(0.1, #fff), color-stop(0.2, #fc6),\n         color-stop(0.5, #fc6), color-stop(0.5, #fa2));\n     background: -moz-linear-gradient(-90deg,\n         #fc6 5%, #fff 15%, #fc6 25%, #fc6 50%, #fa2 50%, #fc6);\n     '),
  captioned$002Dimage('/images/posts/39/start-game-button-and-hyperlink-background-gradient.png')('Button and hyperlink with background gradient')('Linear gradient with colour stops creates a sense of depth'),
  h3('Styling different states'),
  p([
    'It is important to consider the different states a button may have.\n        Apple\'s ',
    a('http://en.wikipedia.org/wiki/Aqua_(user_interface)')('Aqua'),
    '\n        GUI provides three different effects, any or all of which may be\n        applied to a button: a pulsating blue background indicates that ',
    strong('return'),
    ' activates the button; a button with an outer glow\n        can be activated via the space bar; and a static blue background is\n        used for a button\'s "active" state (which occurs while the button\n        is being clicked).'
  ]),
  captioned$002Dimage('/images/posts/39/textedit-save-dialog.png')('TextEdit dialog featuring two different button states')([
    'In Aqua, ',
    strong('return'),
    ' activates the blue button; ',
    strong('space bar'),
    ' activates the button with the outer glow'
  ]),
  p(['On the web, submit inputs and hyperlinks have several possible\n        states, the most important of which are hover, focus, and active.\n        When creating style rules for each of these states it\'s important\n        to bear in mind that more than one state may apply at one time.']),
  captioned$002Dimage('/images/posts/windows/transmission-up-to-date.png')('Transmission dialog featuring a button with two states')('Here the OK button exhibits both a pulsating blue background and an outer glow'),
  h4('Hover'),
  code$002Dblock(Symbol.for('css'))('\n     .aqua:hover {\n         border-color: #740;\n         background: #fb4;\n         background: -webkit-gradient(linear, left top, left bottom,\n             from(#fb4), to(#fb4),\n             color-stop(0.1, #fea), color-stop(0.2, #fb4),\n             color-stop(0.5, #fb4), color-stop(0.5, #f90));\n         background: -moz-linear-gradient(-90deg,\n             #fb4 5%, #fea 15%, #fb4 25%, #fb4 50%, #f90 50%, #fb4);\n         color: #740;\n         cursor: pointer;\n     }\n     '),
  captioned$002Dimage('/images/posts/39/start-game-button-and-hyperlink-hover.png')('Hover state')('Hover state (right) alongside default state'),
  h4('Focus'),
  code$002Dblock(Symbol.for('css'))('\n     .aqua:focus {\n         -webkit-box-shadow: #740 0 1px 0.75em;\n         -moz-box-shadow: #740 0 1px 0.75em;\n         color: #740;\n         outline: none;\n     }\n     '),
  captioned$002Dimages([
    [
      '/images/posts/39/start-game-button-and-hyperlink-focus.png',
      'Focus state',
      'Focus state (right) alongside default state'
    ],
    [
      '/images/posts/39/start-game-button-and-hyperlink-focus-hover.png',
      'Focus+hover state',
      'The focus and hover states play nicely together'
    ]
  ]),
  h4('Active'),
  code$002Dblock(Symbol.for('css'))('\n     .aqua:active {\n         border-color: #630;\n         background: #f90;\n         background: -webkit-gradient(linear, left top, left bottom,\n             from(#f90), to(#f90),\n             color-stop(0.1, #fd8), color-stop(0.3, #fb4),\n             color-stop(0.5, #fb4), color-stop(0.5, #f90));\n         background: -moz-linear-gradient(-90deg,\n             #f90 5%, #fd8 15%, #fb4 35%, #fb4 50%, #f90 50%, #f90);\n         color: #630;\n     }\n     '),
  captioned$002Dimage('/images/posts/39/start-game-button-and-hyperlink-active.png')('Active state')('Active state (right) alongside default state'),
  h3('Demo'),
  p([
    'Interact with the finished styled button on the ',
    a('/examples/hyperlinks-as-buttons/')('Hyperlinks as buttons'),
    '\n        demo page.'
  ])
];
export default {
  ['id']: 39,
  ['slug']: 'gorgeous-css3-buttons-inspired-by-aqua',
  ['title']: 'Gorgeous CSS3 buttons inspired by Aqua',
  ['datetime']: datetime('2010-03-08')('12:39:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    'css',
    'css3',
    'html',
    'mac-os-x'
  ],
  ['excerpt']: excerpt,
  ['body']: body
};
