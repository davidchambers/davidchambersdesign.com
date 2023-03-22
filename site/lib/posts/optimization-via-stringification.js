import {
  text,
  a,
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
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain['fantasy-land/chain'](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f)
};
const {chain, map} = Prelude;
const excerpt = [p(['One way to reduce the number of HTTP requests a page requires\n    is to group (non-content) images into sprites. An even better\n    way is to remove these images from the server altogether;\n    instead include them as encoded strings in your style sheet.'])];
const body = [
  ...excerpt,
  p(['Instead of...']),
  code$002Dblock('css')(`a[href="/contact/"] {
    background: url(/images/sprite.png) no-repeat 0 -30px;
}
`),
  p(['use something like...']),
  code$002Dblock('css')(`a[href="/contact/"] {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALJJREFUeNrs1eEJgzAQBWATHKkjZAZHiCtkhKxgRnAGR+gMWSVypflRQfOeSgvlDgTxjvuSC0RTSul+EUZhhRX+bziNj0ur8tPT7OV6qEGMFJhCaNZYBA3DAKNSiyzUIs3iPEO41EgtEhbdSQtnUAo+wlmUhiWccx+4vMs3NnqmeEmpc96/norXndbc7fC28Xa0kmNwewbdPYY3fgvMjhDFm6POOUM3kf6dFFZY4a/FKsAADsZ+Lb8VFH4AAAAASUVORK5CYII=) no-repeat;
}
`),
  p(['I threw together a Python script which converts images to encoded\n    strings.']),
  code$002Dblock('python')(`#stringify.py
import base64
import sys

f = open(sys.argv[1], 'rb')
s = f.read()
f.close()

try:
    altchars = sys.argv[2]
except IndexError:
    altchars = None

print base64.b64encode(s, altchars)
`),
  h4(['Usage']),
  code$002Dblock('console')(`$ python stringify.py /path/to/image.png
`)
];
export default {
  id: 51,
  slug: 'optimization-via-stringification',
  title: ['Optimization via stringification'],
  datetime: datetime('2010-06-03')('14:28:00')('Pacific/Auckland'),
  tags: [
    'css',
    'optimization',
    'python'
  ],
  body
};
