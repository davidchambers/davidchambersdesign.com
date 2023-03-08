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
  _uncaptioned$002Dimage
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  p(['This turned out to be quite a bit easier than I\'d imagined.\n        Here are the things I did:']),
  ol([
    li([
      p([
        'I saved ',
        a('http://thingsilearned.com/2009/01/05/using-subdomains-in-django/')('Dave Fowler\'s subdomain middleware'),
        '\n                  as ',
        code('middleware.py'),
        ' in my project directory:'
      ]),
      _code$002Dblock(Symbol.for('python'))('\n               class SubdomainMiddleware:\n                   def process_request(self, request):\n                       \'\'\'Parse out the subdomain from the request\'\'\'\n                       request.subdomain = None\n                       host = request.META.get(\'HTTP_HOST\', \'\')\n                       host_s = host.replace(\'www.\', \'\').split(\'.\')\n                       if len(host_s) > 2:\n                           request.subdomain = \'\'.join(host_s[:-2])\n               ')
    ]),
    li([
      p([
        'I added this to my project\'s ',
        code('MIDDLEWARE_CLASSES'),
        ':'
      ]),
      _code$002Dblock(Symbol.for('python'))('\n               MIDDLEWARE_CLASSES = (\n                   ...,\n                   \'middleware.SubdomainMiddleware\',\n               )\n               ')
    ]),
    li([
      p([
        'I edited my ',
        code('/etc/hosts'),
        '\n                  file as per Dave\'s suggestion:'
      ]),
      _code$002Dblock(Symbol.for('plain-text'))('\n               127.0.0.1 test.com\n               127.0.0.1 blog.test.com\n               127.0.0.1 search.test.com\n               '),
      p([
        'Initially I replaced ',
        code('test.com'),
        ' with the\n                  site\'s domain name, but I decided that it\'s useful to\n                  be able to access both the live site and the test site\n                  without editing the ',
        code('/etc/hosts'),
        ' file.'
      ]),
      p(['At this point I expected everything to work as advertised.\n                  Instead, I got this:']),
      _uncaptioned$002Dimage('/images/posts/windows/it-works!.png')('It works!'),
      p(['That would depend on one\'s definition of "works".\n                  I wanted my Django site to appear, which required a\n                  very simple tweak...'])
    ]),
    li([
      p(['I added the port number to the address:']),
      _code$002Dblock(Symbol.for('plain-text'))('\n               http://test.com:8000/\n               '),
      p([
        'This ',
        em('actually'),
        ' worked. :)'
      ])
    ])
  ])
];
export default {
  [Symbol.for('id')]: 56,
  [Symbol.for('slug')]: 'testing-django-apps-using-localhost-subdomains',
  [Symbol.for('title')]: 'Testing Django apps using localhost subdomains',
  [Symbol.for('datetime')]: datetime('2010-07-04')('08:23:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'django',
    'mac-os-x'
  ],
  [Symbol.for('body')]: body
};
