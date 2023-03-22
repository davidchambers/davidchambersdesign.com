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
import {
  code$002Dblock,
  $2014
} from '../components.js';
import datetime from '../datetime.js';
const Prelude = { map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f) };
const body = [
  p([
    'Recently I listened to ',
    a({ href: 'http://blog.extracheese.org/2010/02/python-vs-ruby-a-battle-to-the-death.html' })(['Gary Bernhardt comparing Python and Ruby']),
    '. In the talk Gary\n    states that he finds Ruby code ugly and Python code beautiful.\n    He then goes on to say that the things which reduce Ruby\'s\n    aesthetic appeal are the very things which allow Ruby to do\n    beautiful things impossible in Python.'
  ]),
  p(['Gary provides several examples of equivalent code in Python and\n    Ruby to highlight situations in which one language reads better\n    than the other, such as the following.']),
  p(['Python:']),
  code$002Dblock('python')(`'\\n'.join(obj.name
    for obj in (
        repository.retrieve(id)
        for id in ids)
    if obj)
`),
  p(['Ruby:']),
  code$002Dblock('ruby')(`ids.map do |id|
  repository.retrieve(id)
end.compact.map do |obj|
  obj.name
end.join('\\n')
`),
  p([
    'The Ruby code (the one beginning with ',
    code(['ids.map']),
    ') reads top\n    to bottom and is easy to follow. The Python code is equally succinct but\n    takes a bit of effort to decipher.'
  ]),
  p(['I\'ve been greatly enjoying the act of writing JavaScript lately,\n    so simply for pleasure I worked out the JavaScript equivalent.']),
  p([
    'My first attempt used the ',
    code(['filter']),
    ' array method.'
  ]),
  code$002Dblock('javascript')(`ids.filter(function (id) {
    var obj = repository.retrieve(id);
    return obj && obj.name;
}).join('\\n');
`),
  p([
    a({ href: 'https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Filter' })([code(['filter'])]),
    ', though, just removes from an array the\n    items which fail the provided "test". So the code above is\n    on the right track, but fails to produce a list of names.'
  ]),
  p([
    a({ href: 'https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Reduce' })([code(['reduce'])]),
    ' is the correct method for the job. ',
    code(['reduce']),
    ' "reduces" an array to a single value, which\n    could be a string, an object, another array',
    $2014,
    'whatever!'
  ]),
  p([
    'Note the empty array (',
    code(['[]']),
    ') on line 5 \u2013 that\'s our\n    "accumulator".'
  ]),
  code$002Dblock('javascript')(`ids.reduce(function (ids, id) {
    var obj = repository.retrieve(id);
    if (obj && obj.name) ids.push(obj.name);
    return ids;
}, []).join('\\n');
`),
  p(['Not bad. It\'s not as elegant as the Ruby code, but it\'s not\n    "inside out" the way the Python code is.'])
];
export default {
  id: 69,
  slug: 'filtering-lists-in-python-ruby-and-javascript',
  title: ['Filtering lists in Python, Ruby, and JavaScript'],
  datetime: datetime('2010-09-09')('04:21:00')('Pacific/Auckland'),
  tags: [
    'javascript',
    'programming',
    'python',
    'ruby'
  ],
  body: body
};
