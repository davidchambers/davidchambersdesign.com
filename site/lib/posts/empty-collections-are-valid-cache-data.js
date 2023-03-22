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
const Prelude = { map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f) };
const {map} = Prelude;
const body = [
  p([
    'When using Django\'s cache, ensure that empty collections\n    (',
    code(['[]']),
    ', ',
    code(['()']),
    ', ',
    code(['{}']),
    ')\n    are treated as valid cache data.'
  ]),
  code$002Dblock('python')(`cached = cache.get(cache_key)
if cached:
    return cached

# perform expensive operation
`),
  p([
    'In the above snippet, if the call to ',
    code(['get']),
    '\n    returns an empty collection the cached result is ignored\n    and the value is recalculated unnecessarily.'
  ]),
  p([
    'Avoid this by explicitly comparing the return value to ',
    code(['None']),
    ':'
  ]),
  code$002Dblock('python')(`cached = cache.get(cache_key)
if cached is not None: # much better!
    return cached
`),
  p([
    'Django\'s documentation wisely advises against caching the literal value ',
    code(['None']),
    ', and the above snippet makes it clear why this is good\n    advice \u2013 the ',
    code(['get']),
    ' method returns ',
    code(['None']),
    ' when\n    the cache does not contain an entry for the supplied key.'
  ])
];
export default {
  id: 57,
  slug: 'empty-collections-are-valid-cache-data',
  title: ['Empty collections are valid cache data'],
  datetime: datetime('2010-07-06')('09:34:00')('Pacific/Auckland'),
  tags: ['django'],
  body
};
