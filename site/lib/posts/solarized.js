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
import { captioned$002Dimages } from '../components.js';
import datetime from '../datetime.js';
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain['fantasy-land/chain'](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f)
};
const {chain, map} = Prelude;
const body = [
  p([
    'Earlier this week I discovered ',
    a({ href: 'http://ethanschoonover.com/solarized' })(['Solarized']),
    ',\n    "a sixteen color palette [...] designed for use with\n    terminal and gui applications".'
  ]),
  p([
    'Bundles are available for all the popular editors;\n    I went ahead and cloned the ',
    a({ href: 'https://github.com/bobthecow/solarized-seestyle' })(['Coda bundle']),
    '.\n    While the code on my screen immediately looked very nice, a few of\n    Justin\'s colour choices didn\'t sit well with me.* I spent an hour\n    or two trying a large number of different combinations until my\n    JavaScript file was harmoniously highlighted.'
  ]),
  captioned$002Dimages([{
      alt: 'Solarized code snippet',
      src: '/images/posts/84/solarized-code-snippet.png',
      caption: ['Solarized code snippet']
    }]),
  p(['I wanted an even intensity, but didn\'t allow myself to deviate\n    from Ethan\'s prescribed colours. I\'m happy with the result: the\n    soft highlighting makes the code easier to understand without\n    being a distraction. Only regular expression literals leap\n    forward, but these tend to occur infrequently.']),
  p([
    'Coda users may be surprised to see method invocations\n    highlighted. That\'s one of the minor enhancements I\'ve made\n    to the default mode. If you\'re interested, have a look at ',
    a({ href: 'https://bitbucket.org/davidchambers/javascript.mode' })(['Javascript.mode']),
    ' on Bitbucket.'
  ]),
  p(['* Blue escape sequences within red regular expression literals\n    are too striking for my liking!'])
];
export default {
  id: 84,
  slug: 'solarized',
  title: ['Solarized'],
  datetime: datetime('2011-04-23')('02:20:00')('America/Los_Angeles'),
  tags: [
    'coda',
    'design',
    'programming',
    'solarized'
  ],
  body
};
