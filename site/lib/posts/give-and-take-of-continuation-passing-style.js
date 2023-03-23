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
  var$,
  var$0027,
  video
} from '../elements.js';
import {
  code$002Dblock,
  $2014
} from '../components.js';
import datetime from '../datetime.js';
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain['fantasy-land/chain'](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f)
};
const {chain, map} = Prelude;
const body = [
  p([
    'I have been experimenting with ',
    a({ href: 'https://en.wikipedia.org/wiki/Continuation-passing_style' })(['continuation-passing style']),
    ' recently. Writing code in\n    this style feels strange but exciting! I recently discovered\n    that one can use functions in place of objects.'
  ]),
  p([
    'Local mutation and reassignment are acceptable, but I avoid them\n    whenever practical. As a result I use ',
    code(['reduce']),
    ' ',
    em(['a lot']),
    '.'
  ]),
  code$002Dblock('javascript')(`//    reduce :: (b -> a -> b) -> b -> Array a -> b
const reduce = f => b => as => as.reduce ((b, a) => f (b) (a), b);

//    append :: a -> Array a -> Array a
const append = a => as => [...as, a];

//    blah :: Integer -> String -> { id :: Integer, name :: String }
const blah = id => name => ({id, name});

> reduce (({id, blahs}) => name => ({id: id + 1, blahs: append (blah (id) (name)) (blahs)}))
.        ({id: 1, blahs: []})
.        (['foo', 'bar', 'baz'])
. .blahs
[{id: 1, name: 'foo'}, {id: 2, name: 'bar'}, {id: 3, name: 'baz'}]
`),
  p([
    '\u261D️ This has been my approach for the past several years. The accumulator\n    contains all necessary state, and at the end of the reduction I access\n    whichever fields are relevant (in this case just ',
    code(['blahs']),
    ').'
  ]),
  code$002Dblock('javascript')(`> reduce (cont => name => id => append (blah (id) (name)) (cont (id + 1)))
.        (id => [])
.        (['foo', 'bar', 'baz'])
.        (1)
[{id: 3, name: 'foo'}, {id: 2, name: 'bar'}, {id: 1, name: 'baz'}]
`),
  p([
    '\u261D️ This was my first attempt at using continuations. The problem is\n    that function wrapping happens from left to right, so the ',
    code(['id']),
    '\n    is threaded from right to left, giving the wrong result.'
  ]),
  code$002Dblock('javascript')(`> reduce (cont => name => id => blahs => cont (id + 1) (append (blah (id) (name)) (blahs)))
.        (id => blahs => blahs)
.        (['foo', 'bar', 'baz'])
.        (1)
.        ([])
[{id: 1, name: 'baz'}, {id: 2, name: 'bar'}, {id: 3, name: 'baz'}]
`),
  p([
    '\u261D️ This was my second attempt. The order is reversed, but the ',
    code(['id']),
    ' and ',
    code(['name']),
    ' values are still mismatched.'
  ]),
  p([
    'I needed more control. What if the initial accumulator were ',
    code(['give => give (1) ([])']),
    '? In the base case, this would mean\n    using ',
    code(['(give => give (1) ([])) (id => blahs => blahs)']),
    '\n    to get ',
    code(['[]']),
    ', the empty list of blahs. What is the type of ',
    code(['give => give (1) ([])']),
    '? I will refer to this function as ',
    code(['take']),
    '.'
  ]),
  code$002Dblock('javascript')(`//    take :: (Integer -> Array String -> a) -> a
const take = give => give (1) ([]);
`),
  p([
    code(['a']),
    ' is a type variable. We have no idea what ',
    code(['give']),
    ', the continuation provided to ',
    code(['take']),
    ',\n    will return. ',
    code(['take']),
    ' returns whatever give returns,\n    though, so the return type of ',
    code(['take']),
    ' matches the\n    return type of ',
    code(['give']),
    '.'
  ]),
  p([
    'Having established that the type of the accumulator is ',
    code(['(Integer -> Array String -> a) -> a']),
    ', we need to\n    have the reducing function return a function of that type.'
  ]),
  code$002Dblock('javascript')(`> reduce (take => name => give => give (1) ([blah (1) (name)]))
.        (give => give (1) ([]))
.        (['foo', 'bar', 'baz'])
.        (id => blahs => blahs)
[{id: 1, name: 'baz'}]
`),
  p([
    '\u261D️ The answer is wrong',
    $2014,
    'we lost ',
    code(['\'foo\'']),
    ' and ',
    code(['\'bar\'']),
    ', and ',
    code(['\'baz\'']),
    ' has the wrong ',
    code(['id']),
    $2014,
    'but the types align.'
  ]),
  code$002Dblock('javascript')(`> reduce (take => name => take (id => blahs => give => give (id + 1) (append (blah (id) (name)) (blahs))))
.        (give => give (1) ([]))
.        (['foo', 'bar', 'baz'])
.        (id => blahs => blahs)
[{id: 1, name: 'foo'}, {id: 2, name: 'bar'}, {id: 3, name: 'baz'}]
`),
  p([
    '\u261D️ Success! We receive a continuation we refer to as ',
    code(['take']),
    '.\n    We apply ',
    code(['take']),
    ' to gain access to ',
    code(['id']),
    ' and ',
    code(['blahs']),
    ', and we then return a new continuation, ',
    code(['give => give (id + 1) (append (blah (id) (name)) (blahs))']),
    ',\n    which is the ',
    code(['take']),
    ' function for the next iteration.'
  ]),
  p([
    'This approach extends to an arbitrary number of state variables\n    (e.g. ',
    code(['give => give (0) (\'\') ([]) ({})']),
    '). I find the\n    names ',
    code(['give']),
    ' and ',
    code(['take']),
    ' helpful for\n    remembering which continuation is which. :)'
  ])
];
export default {
  id: 95,
  slug: 'give-and-take-of-continuation-passing-style',
  title: [
    'The ',
    code(['give']),
    ' and ',
    code(['take']),
    '\n    of continuation-passing style'
  ],
  datetime: datetime('2020-10-08')('10:41:26')('Europe/Berlin'),
  tags: [
    'continuation-passing-style',
    'javascript',
    'programming'
  ],
  body
};
