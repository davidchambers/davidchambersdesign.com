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
const excerpt = [
  p([strong(['Sticky footers should be ubiquitous. They are not.'])]),
  p(['This leads me to believe that many developers are unaware\n    of how to prevent footers from floating up on pages without\n    much content.'])
];
const body = [
  ...excerpt,
  p(['I\'ll explain how it\'s done. The markup must look something like\n    the following:']),
  code$002Dblock('html')(`<body>
    <div id="wrap">
        <div id="main">
        </div>
    </div>
    <div id="footer">
    </div>
</body>
`),
  p(['The required CSS is also straightforward. First, set the heights\n    of the html and body elements to the height of the viewport:']),
  code$002Dblock('css')(`html    { height: 100%; }
body    { height: 100%; }
`),
  p([
    'This makes it possible to set the ',
    em(['minimum']),
    ' height of\n    the wrapper div to the height of the viewport:'
  ]),
  code$002Dblock('css')(`#wrap   { min-height: 100%; }
`),
  p(['Next, pull up the footer so that it\'s visible without scrolling\n    on pages without a lot of content:']),
  code$002Dblock('css')(`#footer { margin-top: -5em; height: 5em; }
`),
  p(['Finally, apply bottom padding to the main content div to ensure\n    that nothing is covered by the footer:']),
  code$002Dblock('css')(`#main   { padding-bottom: 5em; }
`),
  p(['Putting it all together gives the following:']),
  code$002Dblock('css')(`html    { height: 100%; }
body    { height: 100%; }
#wrap   { min-height: 100%; }
#main   { padding-bottom: 5em; }
#footer { margin-top: -5em; height: 5em; }
`),
  p([
    'This CSS works in all modern browsers. If you need to support\n    antiquated browsers, you should have a look at the hacks suggested\n    at ',
    a({ href: 'http://www.cssstickyfooter.com/' })(['CSS Sticky Footer']),
    '.'
  ]),
  p([strong([
      'Check out the ',
      a({ href: '/examples/sticky-footers/' })(['sticky footer demo']),
      '\n      to see all this theory in action.'
    ])])
];
export default {
  id: 27,
  slug: 'sticky-footers',
  title: ['Sticky footers'],
  datetime: datetime('2009-09-20')('01:08:00')('Pacific/Auckland'),
  tags: [
    'css',
    'html'
  ],
  body
};
