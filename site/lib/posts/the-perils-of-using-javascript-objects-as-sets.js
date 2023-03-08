import {
  _canonicalize$002Dchildren,
  text,
  excerpt,
  a,
  _a$0027,
  article,
  _article$0027,
  aside,
  _aside$0027,
  b,
  blockquote,
  _blockquote$0027,
  _body$0027,
  code,
  _code$0027,
  dd,
  _dd$0027,
  del,
  _del$0027,
  div,
  dl,
  _dl$0027,
  dt,
  _dt$0027,
  em,
  _em$0027,
  embed,
  footer,
  _footer$0027,
  h1,
  _h1$0027,
  h2,
  _h2$0027,
  h3,
  _h3$0027,
  h4,
  _h4$0027,
  h5,
  _h5$0027,
  h6,
  _h6$0027,
  head,
  _head$0027,
  header,
  _header$0027,
  hr,
  _hr$0027,
  html,
  _html$0027,
  i,
  _i$0027,
  img,
  ins,
  _ins$0027,
  li,
  _li$0027,
  linearGradient,
  link,
  mask,
  meta,
  nav,
  _nav$0027,
  object,
  ol,
  _ol$0027,
  p,
  _p$0027,
  param,
  path,
  pre,
  _pre$0027,
  rect,
  script,
  span,
  stop,
  strong,
  _strong$0027,
  svg,
  time,
  title,
  _title$0027,
  ul,
  _ul$0027,
  _var,
  _var$0027,
  video
} from '../elements.js';
import { _code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([p(['One question I\'m fond of asking in interviews is how to create\n             a set of strings to which values may be added in an efficient\n             manner. Furthermore, membership checks must be reliable and as\n             fast as possible. This post can be considered the model answer.\n             ;)'])]),
  hr,
  p(['JavaScript is a small language. So small, in fact, that\n        several useful constructs are entirely absent. Just two\n        types of collection are provided: arrays and objects\n        (and even these are less different than they appear).\n        Sets (collections of unique values) and dictionaries\n        (collections which map unique values to other values)\n        are the most glaring omissions.']),
  h3('How does Python do it?'),
  p([
    'Python has literal syntax for sets, and supports\n        membership checks via the ',
    code('in'),
    ' keyword:'
  ]),
  _code$002Dblock(Symbol.for('python'))('\n     >>> usernames = {\'brodie\', \'jespern\', \'nvenegas\'}\n     >>> \'brodie\' in usernames\n     True\n     >>> \'davidchambers\' in usernames\n     False\n     '),
  p(['Incidentally, since sets are essentially dictionaries\n        without values, it\'s unsurprising that the same form\n        can be used to determine whether a value is among a\n        dictionary\'s keys:']),
  _code$002Dblock(Symbol.for('python'))('\n     >>> settings = {\'lines\': 50, \'number\': False, \'spell\': True}\n     >>> \'number\' in settings\n     True\n     >>> \'wrap\' in settings\n     False\n     '),
  h3('Fashioning a poor man\u2019s set from the limited materials\n       JavaScript provides'),
  p([
    'How might one create a set of strings in JavaScript given the\n        limited, ahem, ',
    em('set'),
    ' of data structures at our disposal?\n        One could use a string:'
  ]),
  _code$002Dblock(Symbol.for('javascript'))('\n     > usernames = \',brodie,jespern,nvenegas,\'\n     > /,brodie,/.test(usernames)\n     true\n     > /,davidchambers,/.test(username)\n     false\n     '),
  p(['This approach is problematic for several reasons: it assumes\n        that "," won\'t appear in a username, membership checks are\n        inefficient, inserting an existing member will cause the\n        string to grow unless an expensive membership check is\n        performed, and the separators make things awkward.']),
  p(['An array is clearly a better choice:']),
  _code$002Dblock(Symbol.for('javascript'))('\n     > usernames = [\'brodie\', \'jespern\', \'nvenegas\']\n     > usernames.indexOf(\'brodie\') >= 0\n     true\n     > usernames.indexOf(\'davidchambers\') >= 0\n     false\n     '),
  p(['Though this is an improvement, membership checks are still\n        inefficient, and each insert still requires a member check if\n        we\'re to avoid having the array grow needlessly. If we kept the\n        array ordered we could use binary search, but inserts would be\n        even slower as each member would need to be inserted in the\n        correct position.']),
  p([
    'An object, then, is the ',
    em('best'),
    ' choice:'
  ]),
  _code$002Dblock(Symbol.for('javascript'))('\n     > usernames = {\'brodie\': 1, \'jespern\': 1, \'nvenegas\': 1}\n     > \'brodie\' in usernames\n     true\n     > \'davidchambers\' in usernames\n     false\n     '),
  p([
    'This addresses the outstanding problems, and the ',
    code('in'),
    '\n        keyword makes the intent of these expressions clear.'
  ]),
  p(['But it also introduces a subtle bug:']),
  _code$002Dblock(Symbol.for('javascript'))('\n     > \'constructor\' in usernames\n     true\n     > \'toString\' in usernames\n     true\n     > \'valueOf\' in usernames\n     true\n     '),
  p([
    'The ',
    code('in'),
    ' check tells us whether the property exists on\n        the object ',
    em('or anywhere in its prototype chain'),
    '. Ugh.'
  ]),
  p([
    code('in'),
    ' is out, then, but there is a way to ask whether a\n        property exists on the object itself:'
  ]),
  _code$002Dblock(Symbol.for('javascript'))('\n     > usernames.hasOwnProperty(\'brodie\')\n     true\n     > usernames.hasOwnProperty(\'davidchambers\')\n     false\n     '),
  p(['This fixes the unwanted inheritance problem, but introduces\n        another subtle error:']),
  _code$002Dblock(Symbol.for('javascript'))('\n     > usernames[\'davidchambers\'] = 1 // add "davidchambers" to set\n     1\n     > usernames[\'hasOwnProperty\'] = 1 // add "hasOwnProperty" to set\n     1\n     > usernames.hasOwnProperty(\'davidchambers\')\n     TypeError: Property \'hasOwnProperty\' of object #<Object> is not a function\n     '),
  p([
    'If we rely on ',
    code('usernames.hasOwnProperty'),
    ' we lose\n        the ability to perform membership checks as soon as we add\n        "hasOwnProperty" as a member. The solution is to grab the\n        function from a reliable source (',
    code('Object.prototype'),
    '):'
  ]),
  _code$002Dblock(Symbol.for('javascript'))('\n     > Object.prototype.hasOwnProperty.call(usernames, \'davidchambers\')\n     true\n     '),
  p(['What a mouthful! This is, though, the correct way to maintain\n        a collection of unique strings in JavaScript. It\'s efficient,\n        and avoids the pitfalls of the aforementioned approaches.']),
  h3('Bonus section'),
  p(['In working through this question with a candidate I realized\n        there\'s another solution, though I can\'t think of a compelling\n        reason to favour it:']),
  _code$002Dblock(Symbol.for('javascript'))('\n     > sentinel = {}\n     > usernames = {\'brodie\': sentinel, \'jespern\': sentinel, \'nvenegas\': sentinel}\n     > usernames[\'brodie\'] === sentinel\n     true\n     > usernames[\'davidchambers\'] === sentinel\n     false\n     > usernames[\'constructor\'] === sentinel\n     false\n     ')
];
export default {
  [Symbol.for('id')]: 94,
  [Symbol.for('slug')]: 'the-perils-of-using-javascript-objects-as-sets',
  [Symbol.for('title')]: 'The perils of using JavaScript objects as sets',
  [Symbol.for('datetime')]: datetime('2012-09-03')('20:00:00')(Symbol.for('America/Los_Angeles')),
  [Symbol.for('tags')]: [
    'best-practice',
    'data-structures',
    'javascript',
    'programming',
    'python'
  ],
  [Symbol.for('body')]: body
};
