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
import {
  _code$002Dblock,
  _decorative$002Dimage
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    _decorative$002Dimage('/images/posts/decorative/right/at-sign-in-speech-bubble.png'),
    p(['Regular expressions are powerful, useful, and -- in my opinion\n             -- lots of fun! Thanks to the prevalence of Twitter, every web\n             developer will be exposed to regex sooner or later: before\n             outputting tweets in HTML, Twitter names and hyperlinks must\n             be wrapped in anchor tags.']),
    h3('Matching @names'),
    p(['Here\'s the gist: a match will begin with "@" and the\n             at sign must be followed by one or more word (letter\u2009/\n             number\u2009/ underscore) characters. The @name must either\n             appear at the beginning of the tweet or be preceded by a\n             space. This prevents the regular expression from matching\n             "@example" in "me@example.com".'])
  ]),
  h4('JavaScript implementation'),
  _code$002Dblock(Symbol.for('javascript'))('\n     tweet.replace(/(^|\\s)(@\\w+)/gm, \'$1<a href="http://twitter.com/$2">$2</a>\');\n     '),
  p(['It would of course be nicer to write:']),
  _code$002Dblock(Symbol.for('javascript'))('\n     tweet.replace(/(?<=(?:^|\\s))(@\\w+)/gm, \'<a href="http://twitter.com/$1">$1</a>\');\n     '),
  p(['Unfortunately, JavaScript does not support lookbehinds in\n        regular expressions, so one\'s forced to capture the preceding\n        space character (if in fact there is one) and spit it out in\n        the replacement string.']),
  h4('PHP implementation'),
  _code$002Dblock(Symbol.for('php'))('\n     preg_replace(\'/(^|\\s)(@\\w+)/m\', \'$1<a href="http://twitter.com/$2">$2</a>\', $tweet);\n     '),
  h4('Python implementation'),
  p([
    'Python ',
    em('does'),
    ' support lookbehinds, but only ',
    em('fixed-width'),
    ' lookbehinds, so it won\'t allow ',
    code('(?<=^|\\s)'),
    '. No matter.'
  ]),
  _code$002Dblock(Symbol.for('python'))('\n     import re\n     re.sub(r\'(?m)(^|\\s)(@\\w+)\',\n             lambda m: m.group(1) + \'<a href="http://twitter.com/\' + m.group(2) + \'">\' + m.group(2) + \'</a>\',\n             tweet)\n     '),
  p(['For once, Python\'s syntax is the least elegant!']),
  p(['Interestingly, while testing these snippets I found I did not\n        need to specify multi-line mode. Perhaps multi-line mode is\n        assumed? I\'d like to know the answer.']),
  h3('Matching hyperlinks'),
  p([
    'The regular expression involved in matching\n        hyperlinks is more complex. I\'ll point you to John Gruber\'s ',
    a('http://daringfireball.net/2009/11/liberal_regex_for_matching_urls')('liberal regex for matching URLs'),
    ' as he\'s clearly put a great\n        deal of thought into what is essentially a single line of code!'
  ])
];
export default {
  [Symbol.for('id')]: 48,
  [Symbol.for('slug')]: 'linkify-tweets-with-regex',
  [Symbol.for('title')]: 'Linkify tweets with regex',
  [Symbol.for('datetime')]: datetime('2010-04-10')('03:22:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'javascript',
    'php',
    'python',
    'regex',
    'regular-expressions'
  ],
  [Symbol.for('body')]: body
};