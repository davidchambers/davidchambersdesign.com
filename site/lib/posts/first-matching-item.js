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
    'When writing code one often needs to grab the first item in\n    a collection that has certain characteristics. For example,\n    one may have a list of ',
    code(['Student']),
    ' objects and\n    need to fetch the one with a certain id.'
  ]),
  p(['The task is trivial: loop through the list and compare each\n    student\'s id until a match is found or all the students in\n    the list have been inspected, whichever comes first.']),
  p(['In the past, I\'ve tended to take advantage of return statements\n    to exit the loop as soon as a match is found. The examples here\n    are in Python, but the same patterns apply to other languages.']),
  code$002Dblock('python')(`def student_by_id(students, id):
    for student in students:
        if student.id == id:
            return student
    return None
`),
  p(['This appoach strikes me as inelegant when the function is called\n    in one place only. Today a different approached occurred to me.']),
  code$002Dblock('python')(`student = None
for student in students:
    if student.id == id:
        break
    student = None
`),
  p([
    'Here, we break out of the loop as soon as a match\n    is found, preserving the student of interest in the\n    variable ',
    code(['student']),
    '. Each time through the\n    loop ',
    code(['student']),
    ' is cleared to ensure that ',
    code(['student']),
    ' is empty once we\'ve finished looping\n    if there are no matches.'
  ]),
  p(['The first line is required to handle empty lists.']),
  p(['I think I\'ll use this approach from time to time.\n    Let me know if you\'re aware of another option.'])
];
export default {
  id: 54,
  slug: 'first-matching-item',
  title: ['First matching item'],
  datetime: datetime('2010-06-17')('23:17:00')('Pacific/Auckland'),
  tags: ['programming'],
  body
};
