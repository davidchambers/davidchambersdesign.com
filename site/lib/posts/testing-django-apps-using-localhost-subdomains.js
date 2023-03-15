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
  uncaptioned$002Dimage
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  p(['This turned out to be quite a bit easier than I\'d imagined.\n    Here are the things I did:']),
  ol([
    li([
      p([
        'I saved ',
        a('http://thingsilearned.com/2009/01/05/using-subdomains-in-django/')('Dave Fowler\'s subdomain middleware'),
        '\n        as ',
        code('middleware.py'),
        ' in my project directory:'
      ]),
      code$002Dblock(Symbol.for('python'))(`
        class SubdomainMiddleware:
            def process_request(self, request):
                '''Parse out the subdomain from the request'''
                request.subdomain = None
                host = request.META.get('HTTP_HOST', '')
                host_s = host.replace('www.', '').split('.')
                if len(host_s) > 2:
                    request.subdomain = ''.join(host_s[:-2])
      `)
    ]),
    li([
      p([
        'I added this to my project\'s ',
        code('MIDDLEWARE_CLASSES'),
        ':'
      ]),
      code$002Dblock(Symbol.for('python'))(`
        MIDDLEWARE_CLASSES = (
            ...,
            'middleware.SubdomainMiddleware',
        )
      `)
    ]),
    li([
      p([
        'I edited my ',
        code('/etc/hosts'),
        ' file as per Dave\'s suggestion:'
      ]),
      code$002Dblock(Symbol.for('plain-text'))(`
        127.0.0.1 test.com
        127.0.0.1 blog.test.com
        127.0.0.1 search.test.com
      `),
      p([
        'Initially I replaced ',
        code('test.com'),
        ' with the\n        site\'s domain name, but I decided that it\'s useful to\n        be able to access both the live site and the test site\n        without editing the ',
        code('/etc/hosts'),
        ' file.'
      ]),
      p(['At this point I expected everything to work as advertised.\n        Instead, I got this:']),
      uncaptioned$002Dimage('/images/posts/windows/it-works!.png')('It works!'),
      p(['That would depend on one\'s definition of "works".\n        I wanted my Django site to appear, which required a\n        very simple tweak...'])
    ]),
    li([
      p(['I added the port number to the address:']),
      code$002Dblock(Symbol.for('plain-text'))(`
        http://test.com:8000/
      `),
      p([
        'This ',
        em('actually'),
        ' worked. :)'
      ])
    ])
  ])
];
export default {
  ['id']: 56,
  ['slug']: 'testing-django-apps-using-localhost-subdomains',
  ['title']: 'Testing Django apps using localhost subdomains',
  ['datetime']: datetime('2010-07-04')('08:23:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    'django',
    'mac-os-x'
  ],
  ['body']: body
};
