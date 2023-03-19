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
import { code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const excerpt = [
  p([
    'This is my response to Chris Coyier\'s screencast titled ',
    a('http://css-tricks.com/video-screencasts/67-jquery-part-3-image-title-plugin/')('jQuery Part 3 \u2013 Image Title Plugin'),
    ' which I watched\n    a couple of days ago. Something didn\'t sit right with me\n    at the time, and I\'ve now worked out what it was: ',
    strong('JavaScript is not required!')
  ]),
  p([
    'I\'ll present a JavaScript-free approach for displaying captions\n    over images that uses ',
    em('truly'),
    ' meaningful markup.'
  ])
];
const body = [
  ...excerpt,
  p([
    'So what ',
    em('is'),
    ' meaningful markup for images and image captions?\n    This is a debated issue, but I believe the definition list to be the\n    most appropriate element at our disposal. While an image is clearly\n    not a "term", a caption does ',
    em('describe'),
    ' an image, just as\n    a definition ',
    em('describes'),
    ' a term. Meaningful markup for an\n    image and its caption should look something like the following:'
  ]),
  code$002Dblock('html')(`<dl>
    <dt><img src="images/paris.jpg" alt="View from Notre Dame de Paris" /></dt>
    <dd>View from Notre Dame de Paris</dd>
</dl>
`),
  p(['Ideally, images appearing one after the other should belong to the\n    same definition list.']),
  p([
    'My aim was to achieve a result similar to Chris\'s ',
    a('http://css-tricks.com/examples/TypeOverImagePlugin/')('image title plugin demo'),
    '\n    simply by styling a definition list containing images and their\n    captions. In the end, I was forced to abandon the ideal of using a\n    single definition list for multiple images and captions: the nature\n    of CSS positioning dictates that each image\u2013caption pair reside in\n    its own element. The final markup, however, is still quite clean:'
  ]),
  code$002Dblock('html')(`<dl class="captioned-image">
    <dt><img src="images/paris.jpg" alt="View from Notre Dame de Paris" /></dt>
    <dd><span>View from Notre Dame de Paris</span></dd>
</dl>
`),
  p(['Additional markup required:']),
  ul([
    li([
      'Each definition list must have a class name of ',
      strong('captioned-image'),
      ' applied'
    ]),
    li(['Each caption must be wrapped in a span element (captions to\n      appear on multiple lines require multiple span elements)'])
  ]),
  p([
    'Check out the ',
    a('/examples/captions-over-images/')('captions over images demo'),
    '\n    to see the approach in action. The CSS responsible for the\n    appearance of the captions is as follows:'
  ]),
  code$002Dblock('css')(`dl.captioned-image         { position: relative; margin: 1em 0; }
dl.captioned-image dt img  { display: block; }
dl.captioned-image dd      { position: absolute; left: 0; bottom: 1.25em;
                             font: bold 2em/1.25em Helvetica, sans-serif; }
dl.captioned-image.top dd  { top: 1.25em; }
dl.captioned-image dd span { display: block; float: left; clear: both;
                             background: #000; background: rgba(0, 0, 0, 0.7);
                             padding: 0.25em 0.5em; color: #fff; }
`),
  p([
    'I set out to display captions over images without the use\n    of JavaScript while keeping meaningless markup to a minimum. ',
    strong('Have I succeeded, do you think?')
  ])
];
export default {
  id: 24,
  slug: 'captions-over-images',
  title: 'Captions over images',
  datetime: datetime('2009-08-31')('03:36:00')('Pacific/Auckland'),
  tags: [
    'best-practice',
    'css',
    'html',
    'javascript',
    'jquery',
    'meaningful-markup'
  ],
  body: body
};
