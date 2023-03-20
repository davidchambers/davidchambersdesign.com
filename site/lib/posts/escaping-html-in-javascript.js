import {
  text,
  a,
  a$0027,
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
const body = [
  p([
    'I recently came across an interesting article at ',
    a('http://wonko.com/')(['wonko.com']),
    ' on ',
    a('http://wonko.com/post/html-escaping')(['HTML escaping']),
    ',\n    which provoked me to rewrite Bitbucket\'s escape function\n    (invoked from within Underscore templates):'
  ]),
  code$002Dblock('javascript')(`function makeSafe(text) {
  return text.replace(/[&<>"'\`]/g, function (chr) {
    return '&#' + chr.charCodeAt(0) + ';';
  });
};
`),
  p(['This ensures that inserted content cannot escape the confines of a\n    quoted attribute value. Unquoted attributes are more problematic:']),
  blockquote([p(['Unquoted attribute values are one of the single biggest XSS vectors\n      there is. If you don\u2019t quote your attribute values, you\u2019re essentially\n      leaving the door wide open for naughty people to inject naughty things\n      into your HTML. Very few escaper implementations cover all the edge\n      cases necessary to prevent unquoted attribute values from becoming\n      XSS vectors.'])]),
  p(['To accommodate unquoted attribute values, the following function could\n    be used instead:']),
  code$002Dblock('javascript')(`function makeSafe(text) {
  return text.replace(/\\W/g, function (chr) {
    return '&#' + chr.charCodeAt(0) + ';';
  });
};
`),
  p([
    'I created a ',
    a('http://jsperf.com/html-escaping-perf')(['jsPerf test case']),
    '\n    which confirms that there\'s a performance hit associated with using\n    this more liberal regular expression. Keep in mind, though, that if\n    \u201CA\u201D takes 1ms to execute and \u201CB\u201D takes ten times as long, \u201CB\u201D still\n    only takes 10ms. Quite often a significant ',
    em(['comparative']),
    '\n    speed difference is insignificant in absolute terms; I\'d argue that\n    this is the case here.'
  ])
];
export default {
  id: 88,
  slug: 'escaping-html-in-javascript',
  title: ['Escaping HTML in JavaScript'],
  datetime: datetime('2011-05-30')('15:00:00')('America/Los_Angeles'),
  tags: [
    'best-practice',
    'javascript',
    'security'
  ],
  body: body
};
