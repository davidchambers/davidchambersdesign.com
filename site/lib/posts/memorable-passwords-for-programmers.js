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
  p(['Those of us running Mac OS X are spoilt by Keychain Access.\n    It\'s no help, of course, to have a password stored in your Mac\'s\n    keychain if you\'re at an Internet café unable to access it.\n    Thus, memorable passwords are still useful.']),
  p(['Those of us who write code can create passwords riddled with\n    spaces and punctuation without resorting to the use of random\n    strings of characters. Here\'s a "JavaScript" password,\n    for example:']),
  code$002Dblock('javascript')(`var favourites = { book: 'Collapse', game: 'Agricola', site: 'ted.com' };
`),
  p(['Carefully written passwords wrapping personal information\n    in programming syntax should be both strong and memorable.\n    I\'m sure Perl programmers could write some concise, cryptic\n    passwords using this approach. ;)'])
];
export default {
  id: 28,
  slug: 'memorable-passwords-for-programmers',
  title: ['Memorable passwords for programmers'],
  datetime: datetime('2009-10-21')('00:42:00')('Pacific/Auckland'),
  tags: ['security'],
  body
};
