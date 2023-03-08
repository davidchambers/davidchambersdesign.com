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
  _decorative$002Dimage,
  _interview$002Dlist
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    _decorative$002Dimage('/images/posts/decorative/left/adobe-illustrator-cs3-icon.png'),
    p(['Not so long ago I was talking to my brother online as he\n             worked on a poster for a presentation. He is an engineer;\n             using Illustrator was a new experience for him. He generally\n             picks up new things easily, but as you may appreciate,\n             Illustrator is often far from logical. We reached a point\n             where he asked me about scaling rounded rectangles \u2013 this\n             is where things started to get hairy.']),
    _interview$002Dlist('him')('me')([
      'if I have a rounded rectangle and resize it, it there a\n             way to stop it from changing the rounding of the corners\n             (which I want constant for all my rectangles)?',
      'you can work out how large you want it to be and then\n             double-click with the rectangle tool and you\'ll be able\n             to enter all the correct values',
      'is there a way to change how curved they are after placing them?',
      'InDesign has a much better was of dealing with this issue than\n             does Illustrator... in InDesign, the rectangle is treated as an\n             object, and its corner radius is treated as a property in just\n             the same way as its width, height, and position... this means\n             that you can change the corner radius at any time...',
      'that\'s how it should be'
    ])
  ]),
  p(['Hmm. Since InDesign deals with rounded rectangles effortlessly,\n        why does Illustrator make them such a pain? I did a quick Google\n        search and found out how to create a rounded rectangle which can\n        be scaled without affecting the corners. As with many simple tasks,\n        Illustrator requires the user to carry out several steps:']),
  ol([
    li(['draw a rectangle of any size']),
    li([
      'select it and go to ',
      strong('Effect'),
      ' > ',
      strong('Convert to Shape'),
      ' > ',
      strong('Rounded Rectangle...')
    ]),
    li([
      'in the ',
      strong('Shape Options'),
      ' dialogue, check the ',
      strong('Relative'),
      ' radio button, and set ',
      strong('Extra Width'),
      ' and ',
      strong('Extra Height'),
      ' to 0'
    ]),
    li(['enter your desired corner radius, and off you go!'])
  ]),
  _captioned$002Dimage('/images/posts/windows/illustrator-shape-options-dialog.png')('Illustrator\'s Shape Options dialog')([
    'Illustrator\'s ',
    strong('Shape Options'),
    ' dialog,\n        set up to enable rounded rectangles which scale correctly'
  ]),
  p([
    'Now that the shape has been converted to a rounded rectangle, the ',
    strong('Shape Options'),
    ' dialog can be accessed by double-clicking on ',
    strong('Rounded Rectangle'),
    ' in the ',
    strong('Appearance'),
    ' palette.'
  ])
];
export default {
  [Symbol.for('id')]: 3,
  [Symbol.for('slug')]: 'rounded-rectangles-in-adobe-illustrator-cs3',
  [Symbol.for('title')]: 'Rounded rectangles in Adobe Illustrator CS3',
  [Symbol.for('datetime')]: datetime('2008-12-03')('12:49:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'adobe',
    'cs3',
    'illustrator'
  ],
  [Symbol.for('body')]: body
};
