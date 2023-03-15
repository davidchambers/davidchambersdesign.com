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
import { captioned$002Dimage } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p(['This site\'s search field has been virtually unusable in Chrome\n    and Safari on Windows for several months. Fixing it was not high\n    on my priority list, but I finally got to it this evening.']),
  captioned$002Dimage('/images/posts/58/-webkit-box-sizing=border-box.png')('-webkit-box-sizing: border-box')('Before'),
  p(['I did my best to get these browsers to respect the padding values\n    that I\'d assigned in my style sheet, getting aggressive in the Web\n    Inspector. No joy.']),
  p([
    'I then noticed a curious property, ',
    code('-webkit-box-sizing'),
    '.\n    Sure enough, this was the culprit. Safari and Chrome both use ',
    code('border-box'),
    ' as the default value, which means that padding\n    does not add to an element\'s dimensions the way it does in the\n    standard box model.'
  ]),
  p([
    'Specifying ',
    code('content-box'),
    ' fixed the problem.'
  ]),
  captioned$002Dimage('/images/posts/58/-webkit-box-sizing=content-box.png')('-webkit-box-sizing: content-box')('After'),
  p(['This is an extremely satisfying solution as it neatly targets\n    the source of the problem.']),
  p([
    'The question remains as to why these browsers default to ',
    code('border-box'),
    ' as the ',
    code('box-sizing'),
    ' for ',
    code('input'),
    ' elements with ',
    code('type="search"'),
    '.\n    I don\'t know whether default styles are specified at the\n    rendering engine level or at the browser level, but either\n    way I would say that it\'s the result of Apple fiddling with\n    the controls to make search inputs look sexy on Mac OS X\n    (where they\'re rendered very differently).'
  ])
];
export default {
  ['id']: 58,
  ['slug']: '-webkit-box-sizing',
  ['title']: '-webkit-box-sizing',
  ['datetime']: datetime('2010-07-18')('21:30:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    'css',
    'webkit'
  ],
  ['body']: body
};
