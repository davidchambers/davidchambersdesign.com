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
import { code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p([
    strong('Nothing new here.'),
    ' I\'ve combined ',
    a('http://prototypejs.org/2009/9/1/prototype-1-6-1-released')('Prototype 1.6.1'),
    ' and the various files that make up ',
    a('http://script.aculo.us/downloads')('script.aculo.us 1.8.3'),
    '\n        (except unittest.js) into one file, which I\'ve minified using the ',
    a('http://developer.yahoo.com/yui/compressor/')('YUI Compressor'),
    '.\n        Further compression has been achieved by gzipping the minified file.\n        All three versions are available for download:'
  ]),
  ul([
    li([a('http://static.davidchambersdesign.com/scripts/prototype+scriptaculous.js?p=1.6.1&s=1.8.3')('prototype+scriptaculous.js')]),
    li([a('http://static.davidchambersdesign.com/scripts/prototype+scriptaculous.min.js?p=1.6.1&s=1.8.3')('prototype+scriptaculous.min.js')]),
    li([a('http://static.davidchambersdesign.com/scripts/prototype+scriptaculous.min.js.gz?p=1.6.1&s=1.8.3')('prototype+scriptaculous.min.js.gz')])
  ]),
  p([
    'I suggest including the Prototype and script.aculo.us version\n        numbers in the ',
    code('src'),
    ':'
  ]),
  code$002Dblock(Symbol.for('html'))('\n     <script src="/scripts/prototype+scriptaculous.min.js?p=1.6.1&amp;s=1.8.3"></script>\n     '),
  p(['This prevents caching issues that might otherwise arise\n        upon updating to a newer version of prototype+scriptaculous\n        (I\'ll update the three files -- and this post -- each time\n        a new version of Prototype is released).'])
];
export default {
  ['id']: 32,
  ['slug']: 'prototype-and-scriptaculous-combined-and-compressed',
  ['title']: 'Prototype and script.aculo.us, combined and compressed',
  ['datetime']: datetime('2009-11-09')('23:14:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    'javascript',
    'optimization',
    'prototype',
    'script.aculo.us'
  ],
  ['body']: body
};
