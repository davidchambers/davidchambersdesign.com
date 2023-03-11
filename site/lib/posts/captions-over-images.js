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
  excerpt([
    p([
      'This is my response to Chris Coyier\'s screencast titled ',
      a('http://css-tricks.com/video-screencasts/67-jquery-part-3-image-title-plugin/')('jQuery Part 3 \u2013 Image Title Plugin'),
      ' which I watched\n             a couple of days ago. Something didn\'t sit right with me\n             at the time, and I\'ve now worked out what it was: ',
      strong('JavaScript is not required!')
    ]),
    p([
      'I\'ll present a JavaScript-free approach for displaying captions\n             over images that uses ',
      em('truly'),
      ' meaningful markup.'
    ])
  ]),
  p([
    'So what ',
    em('is'),
    ' meaningful markup for images and image captions?\n        This is a debated issue, but I believe the definition list to be the\n        most appropriate element at our disposal. While an image is clearly\n        not a "term", a caption does ',
    em('describe'),
    ' an image, just as\n        a definition ',
    em('describes'),
    ' a term. Meaningful markup for an\n        image and its caption should look something like the following:'
  ]),
  _code$002Dblock(Symbol.for('html'))('\n     <dl>\n         <dt><img src="images/paris.jpg" alt="View from Notre Dame de Paris" /></dt>\n         <dd>View from Notre Dame de Paris</dd>\n     </dl>\n     '),
  p(['Ideally, images appearing one after the other should belong to the\n        same definition list.']),
  p([
    'My aim was to achieve a result similar to Chris\'s ',
    a('http://css-tricks.com/examples/TypeOverImagePlugin/')('image title plugin demo'),
    '\n        simply by styling a definition list containing images and their\n        captions. In the end, I was forced to abandon the ideal of using a\n        single definition list for multiple images and captions: the nature\n        of CSS positioning dictates that each image\u2013caption pair reside in\n        its own element. The final markup, however, is still quite clean:'
  ]),
  _code$002Dblock(Symbol.for('html'))('\n     <dl class="captioned-image">\n         <dt><img src="images/paris.jpg" alt="View from Notre Dame de Paris" /></dt>\n         <dd><span>View from Notre Dame de Paris</span></dd>\n     </dl>\n     '),
  p(['Additional markup required:']),
  ul([
    li([
      'Each definition list must have a class name of ',
      strong('captioned-image'),
      ' applied'
    ]),
    li(['Each caption must be wrapped in a span element (captions to\n             appear on multiple lines require multiple span elements)'])
  ]),
  p([
    'Check out the ',
    a('/examples/captions-over-images/')('captions over images demo'),
    '\n        to see the approach in action. The CSS responsible for the\n        appearance of the captions is as follows:'
  ]),
  _code$002Dblock(Symbol.for('css'))('\n     dl.captioned-image         { position: relative; margin: 1em 0; }\n     dl.captioned-image dt img  { display: block; }\n     dl.captioned-image dd      { position: absolute; left: 0; bottom: 1.25em;\n                                  font: bold 2em/1.25em Helvetica, sans-serif; }\n     dl.captioned-image.top dd  { top: 1.25em; }\n     dl.captioned-image dd span { display: block; float: left; clear: both;\n                                  background: #000; background: rgba(0, 0, 0, 0.7);\n                                  padding: 0.25em 0.5em; color: #fff; }\n     '),
  p([
    'I set out to display captions over images without the use\n        of JavaScript while keeping meaningless markup to a minimum. ',
    strong('Have I succeeded, do you think?')
  ])
];
export default {
  [Symbol.for('id')]: 24,
  [Symbol.for('slug')]: 'captions-over-images',
  [Symbol.for('title')]: 'Captions over images',
  [Symbol.for('datetime')]: datetime('2009-08-31')('03:36:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'best-practice',
    'css',
    'html',
    'javascript',
    'jquery',
    'meaningful-markup'
  ],
  [Symbol.for('body')]: body
};