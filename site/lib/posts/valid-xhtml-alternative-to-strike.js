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
const body = [
  p([
    'Today I noticed that a page on this site failed validation. ',
    a({ href: 'http://validator.w3.org/' })(['W3C\'s markup validation service']),
    '\n    gave the following error:'
  ]),
  code$002Dblock('plain-text')(`element "strike" undefined
`),
  p([
    code(['<strike>']),
    ' is not valid XHTML; I\'d forgotten the correct\n    XHTML markup for this purpose:'
  ]),
  code$002Dblock('html')(`my favourite colour is <del>red</del> <ins>white</ins>
`),
  p([
    'The above gives:\n    my favourite colour is ',
    del(['red']),
    ' ',
    ins(['white'])
  ]),
  p(['It\'s a good idea to explicitly define the appearance of deleted\n    and inserted text in your style sheet:']),
  code$002Dblock('css')(`del { text-decoration: line-through; }
ins { text-decoration: underline; }
`)
];
export default {
  id: 8,
  slug: 'valid-xhtml-alternative-to-strike',
  title: [
    'Valid XHTML alternative to ',
    code(['<strike>'])
  ],
  datetime: datetime('2009-03-17')('21:53:00')('Pacific/Auckland'),
  tags: [
    'css',
    'html'
  ],
  body
};
