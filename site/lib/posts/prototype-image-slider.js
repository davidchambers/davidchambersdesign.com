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
  code$002Dblock,
  update
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p([
      'In my post titled ',
      a('/captions-over-images/')('Captions over images'),
      '\n             I advocate the use of definition lists for captioning images.\n             Earlier today I was asked whether this meaningful markup could\n             be used in conjunction with an "image slider" such as ',
      a('http://cssglobe.com/post/4004/easy-slider-15-the-easiest-jquery-plugin-for-sliding')('Easy Slider 1.5'),
      '.'
    ]),
    p(['I had a look at the Easy Slider source code and decided to\n             write my own image slider using Prototype rather than hacking\n             someone else\'s code to pieces. It\'s a proof of concept rather\n             than a full-blown "plugin", but it demonstrates that such\n             functionality is achievable using elegant, meaningful markup.']),
    p([
      'Check out the ',
      a('/examples/prototype-image-slider/')('Prototype image slider demo'),
      '\n             to see the code in action.'
    ])
  ]),
  update(datetime('2009-09-17')('01:17:00')(Symbol.for('Pacific/Auckland')))([
    p(['I noticed that the script was failing miserably in Safari,\n             which didn\'t like the following line:']),
    code$002Dblock(Symbol.for('javascript'))('\n          li: new Element(\'li\', { class: \'prev\' }),\n          '),
    p([
      'Wrapping the word "class" in quotes as per this ',
      a('http://www.prototypejs.org/2007/5/12/dom-builder#comment-15777')('recommendation by Tobie Langel'),
      ' did the trick!'
    ])
  ]),
  h3$0027({ [Symbol.for('id')]: 'usage' })('Usage'),
  p([
    'First, you\'ll need to save a copy of ',
    a('/examples/prototype-image-slider/prototype-image-slider.js')('prototype-image-slider.js'),
    '.'
  ]),
  p([
    'To create a new ',
    code('Slider'),
    ' simply call the constructor.\n        The constructor requires one argument, either a DOM node or a string\n        that references a node\'s ID.'
  ]),
  code$002Dblock(Symbol.for('javascript'))('\n     new Slider(\'slider\');\n     '),
  p([
    'There\'s nothing to prevent multiple image sliders from appearing\n        on a page. The following code turns each div with class of \'slider\'\n        into a ',
    code('Slider'),
    ' object.'
  ]),
  code$002Dblock(Symbol.for('javascript'))('\n     $$(\'div.slider\').each(function (e) {\n         new Slider(e);\n     })\n     '),
  p(['Of course, it\'s a good idea to wait until the page is ready to be\n        manipulated before... er... manipulating the page.']),
  code$002Dblock(Symbol.for('javascript'))('\n     document.observe(\'dom:loaded\', function () {\n         $$(\'div.slider\').each(function (e) {\n             new Slider(e);\n         });\n     });\n     '),
  p(['To provide a small degree of flexibility, the constructor accepts\n        two optional arguments: a float specifying the duration of each\n        transition, and an integer specifying the number of the slide to\n        be displayed first. The default values are 1.0 and 0 (slides are\n        numbered from zero).']),
  code$002Dblock(Symbol.for('javascript'))('\n     new Slider(\'slider\', 0.5);     // faster transitions\n     new Slider(\'slider\', 1.0, 3);  // fourth slide displayed first\n     new Slider(\'slider\', 1.0, -1); // last slide displayed first\n     new Slider(\'slider\', 1.5, -1); // slower transitions; last slide displayed first\n     '),
  p(['If you find this code useful and would like me to flesh it out,\n        let me know.']),
  update(datetime('2009-09-21')('11:53:00')(Symbol.for('Pacific/Auckland')))([p([
      'I neglected to mention that this code also requires ',
      a('http://script.aculo.us/')('script.aculo.us'),
      '.'
    ])])
];
export default {
  [Symbol.for('id')]: 26,
  [Symbol.for('slug')]: 'prototype-image-slider',
  [Symbol.for('title')]: 'Prototype image slider',
  [Symbol.for('datetime')]: datetime('2009-09-16')('23:43:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'css',
    'html',
    'javascript',
    'meaningful-markup',
    'prototype'
  ],
  [Symbol.for('body')]: body
};
