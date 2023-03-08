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
  body,
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
} from './elements.js';
export default _document$002Dtitle => main => html([
  head([
    meta({ [Symbol.for('charset')]: 'utf-8' }),
    title(_canonicalize$002Dchildren(_document$002Dtitle)['flatMap'](child => child[Symbol.for('text')])),
    link({
      [Symbol.for('rel')]: 'alternate',
      [Symbol.for('type')]: 'application/atom+xml',
      [Symbol.for('href')]: '/feed/'
    }),
    link({
      [Symbol.for('rel')]: 'stylesheet',
      [Symbol.for('href')]: '/css/reset.css',
      [Symbol.for('media')]: 'all'
    }),
    link({
      [Symbol.for('rel')]: 'stylesheet',
      [Symbol.for('href')]: '/css/print.css',
      [Symbol.for('media')]: 'print'
    }),
    link({
      [Symbol.for('rel')]: 'stylesheet',
      [Symbol.for('href')]: '/css/screen.css',
      [Symbol.for('media')]: 'screen'
    }),
    link({
      [Symbol.for('rel')]: 'shortcut icon',
      [Symbol.for('type')]: 'image/x-icon',
      [Symbol.for('href')]: 'http://static.davidchambersdesign.com/favicon.ico'
    }),
    script({ [Symbol.for('src')]: 'http://use.typekit.com/jhk0ogh.js' })([]),
    script({})('try{Typekit.load();}catch(e){}')
  ]),
  body([
    div({ [Symbol.for('id')]: 'skip' })(_a$0027({ [Symbol.for('href')]: '#main' })('Skip to main content')),
    div({ [Symbol.for('id')]: 'wrap' })([
      div({ [Symbol.for('id')]: 'header' })(header([
        _a$0027({
          [Symbol.for('id')]: 'title',
          [Symbol.for('href')]: '/'
        })('David Chambers Design'),
        hr,
        p('It\'s where I share interesting info with other web geeks'),
        _nav$0027({ [Symbol.for('id')]: 'nav' })(ul([
          li(_a$0027({ [Symbol.for('href')]: '/about/' })(span({})([
            strong('About.'),
            text(' Who I am and what I do.')
          ]))),
          li(_a$0027({ [Symbol.for('href')]: '/contact/' })(span({})([
            strong('Contact.'),
            text(' Just in case you want to get in touch.')
          ]))),
          li(_a$0027({ [Symbol.for('href')]: '/archives/' })(span({})([
            strong('Archives.'),
            text(' Old posts, recent posts, they\'re all here.')
          ]))),
          li(_a$0027({ [Symbol.for('href')]: '/tags/' })(span({})([
            strong('Tags.'),
            text(' Helpful if you\'re after posts on a particular topic.')
          ]))),
          li(_a$0027({ [Symbol.for('href')]: 'https://bitbucket.org/davidchambers' })(span({})([
            strong('Bitbucket.'),
            text(' Home to most of my open-source projects.')
          ]))),
          li(_a$0027({ [Symbol.for('href')]: '/twitter/' })(span({})([
            strong('Twitter.'),
            text(' It\'s where I chirrup\u2026 or chirp\u2026 or something.')
          ])))
        ]))
      ])),
      div({ [Symbol.for('id')]: 'main' })(main)
    ]),
    footer([p([
        text('Powered by '),
        _a$0027({
          [Symbol.for('href')]: 'http://mango.io/wtf?',
          [Symbol.for('data-version')]: '0.9dev'
        })('Mango'),
        text('. Hosted on '),
        _a$0027({ [Symbol.for('href')]: 'http://www.linode.com/?r=ce523c9eeda64e4bceaf7011dc9e8558b909711d' })('Linode'),
        text('. Original content '),
        _a$0027({ [Symbol.for('href')]: '/copying/' })('WTFPL-licensed'),
        text('.')
      ])])
  ])
]);
