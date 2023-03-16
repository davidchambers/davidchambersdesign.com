import {
  canonicalize$002Dchildren,
  text,
  excerpt,
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
import {
  code$002Dblock,
  $2014
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p([
      'URL shortening is something that\'s been\n      at the back of my mind since listening to ',
      a('http://www.sitepoint.com/blogs/2009/08/22/podcast-24-those-frames-are-ironic/')('SitePoint Podcast #24'),
      '\n      which discussed the near closure of ',
      a('http://tr.im/')('tr.im'),
      '.'
    ]),
    p([
      strong([
        em('Why are short URLs required?'),
        ' Twitter.'
      ]),
      '\n      Tweets are limited to 140 characters, and URLs often seem\n      recklessly long in this context. Of course, Twitter could\n      simply allow us to apply short, meaningful labels to our\n      links as we\'ve been doing in HTML for years. Instead, each\n      time one includes a link in a tweet one must either:'
    ]),
    ul([
      li(['spend a large number of characters on the full URL; or']),
      li([
        'use a short URL generated by a service such as ',
        a('http://bit.ly/')('bit.ly')
      ])
    ])
  ]),
  p([
    'I\'m opposed to short URLs for several reasons. First,\n    I believe that every reference to a resource should use that\n    resource\'s Uniform Resource Identifier (if it has one) in its\n    normalized form. In other words, we should ',
    em('not'),
    ' use ',
    strong('http://www.wikipedia.org/'),
    ' to refer to ',
    strong('http://wikipedia.org/'),
    ', and we should ',
    em('certainly not'),
    ' use ',
    strong('http://bit.ly/8RTk'),
    '.\n    Having multiple URLs for a resource is a maintenance nightmare\n    (unless one is willing to accept URLs being temporal).'
  ]),
  p([
    'Secondly, I have a simple rule: ',
    strong('meaningful > meaningless'),
    '.\n    Meaningful markup is wonderful, and meaningful URLs offer\n    similar benefits (to both people and search engines).'
  ]),
  p([
    'Finally',
    $2014,
    'and this point relates to URL shortening services\n    rather than to short URLs themselves',
    $2014,
    'there\'s no guarantee\n    that sites which ',
    em('currently'),
    ' provide a service will\n    continue to do so indefinitely.'
  ]),
  h3('Enter John Gruber'),
  p([
    'I noticed one day that ',
    a('http://daringfireball.net/')('Daring Fireball'),
    ' now has its own ',
    a('http://sites.google.com/a/snaplog.com/wiki/short_url')('shorturl'),
    's,\n    using the incredibly cool domain name \u272Adf.ws. This got me thinking that\n    perhaps I should procure a short domain name and do something similar.\n    Well, last week I did.'
  ]),
  p([
    'With dċd.ws safely registered in my name I began looking for an\n    open source URL shortener to run on that domain. I then struck\n    upon a ',
    strong('simple, elegant solution'),
    ' which took all\n    of ten minutes to implement.'
  ]),
  code$002Dblock(Symbol.for('TK'))(`RewriteEngine On
RewriteRule ^(.*)$ http://davidchambersdesign.com/$1 [R=301,L]
`),
  p([
    'The code above forms the entirety of the ',
    strong('.htaccess'),
    '\n    file on the dċd.ws server. All it does is redirect every request\n    to the corresponding davidchambersdesign.com URL. The key word\n    being ',
    em('every'),
    '. As a result, existing pages on this site\n    gained short',
    em('er'),
    ' (though not necessarily short) URLs\n    automatically, and new pages gain a short URL the instant they\n    are published. ',
    strong('No maintenance, no fuss. Nice!')
  ]),
  p([
    'So, for example, ',
    strong('http://dċd.ws/twitter/'),
    ' \u2192 ',
    strong('http://davidchambersdesign.com/twitter/'),
    '\n    (a 17 character saving).'
  ]),
  p([
    'If you\'re interested in acquiring your own short domain name,\n    I suggest trying .ws as it\'s one of the few top level domains\n    to allow virtually any Unicode character in its domain names.\n    As a result, there are plenty of short .ws domain names available.\n    I don\'t suggest this approach for normal use, however, as browsers\n    will display something like ',
    strong('http://xn--dd-7la.ws/'),
    '\n    in their address bars.'
  ])
];
export default {
  ['id']: 36,
  ['slug']: 'shockingly-simple-url-shortening',
  ['title']: 'Shockingly simple URL shortening',
  ['datetime']: datetime('2010-01-26')('03:34:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    '.htaccess',
    'twitter'
  ],
  ['body']: body
};
