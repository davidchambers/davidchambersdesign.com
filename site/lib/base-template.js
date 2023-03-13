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
  body,
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
} from './elements.js';
const base$002Dtemplate = function base$002Dtemplate(document$002Dtitle) {
  return main => html([
    head([
      meta({ [Symbol.for('charset')]: 'utf-8' }),
      title(canonicalize$002Dchildren(document$002Dtitle).flatMap(child => child[Symbol.for('text')])),
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
      div({ [Symbol.for('id')]: 'skip' })(a$0027({ [Symbol.for('href')]: '#main' })('Skip to main content')),
      div({ [Symbol.for('id')]: 'wrap' })([
        div({ [Symbol.for('id')]: 'header' })(header([
          a$0027({
            [Symbol.for('id')]: 'title',
            [Symbol.for('href')]: '/'
          })('David Chambers Design'),
          hr,
          p('It\'s where I share interesting info with other web geeks'),
          nav$0027({ [Symbol.for('id')]: 'nav' })(ul([
            li(a$0027({ [Symbol.for('href')]: '/about/' })(span({})([
              strong('About.'),
              text(' Who I am and what I do.')
            ]))),
            li(a$0027({ [Symbol.for('href')]: '/contact/' })(span({})([
              strong('Contact.'),
              text(' Just in case you want to get in touch.')
            ]))),
            li(a$0027({ [Symbol.for('href')]: '/archives/' })(span({})([
              strong('Archives.'),
              text(' Old posts, recent posts, they\'re all here.')
            ]))),
            li(a$0027({ [Symbol.for('href')]: '/tags/' })(span({})([
              strong('Tags.'),
              text(' Helpful if you\'re after posts on a particular topic.')
            ]))),
            li(a$0027({ [Symbol.for('href')]: 'https://bitbucket.org/davidchambers' })(span({})([
              strong('Bitbucket.'),
              text(' Home to most of my open-source projects.')
            ]))),
            li(a$0027({ [Symbol.for('href')]: '/twitter/' })(span({})([
              strong('Twitter.'),
              text(' It\'s where I chirrup\u2026 or chirp\u2026 or something.')
            ])))
          ]))
        ])),
        div({ [Symbol.for('id')]: 'main' })(main)
      ]),
      footer([p([
          text('Powered by '),
          a$0027({
            [Symbol.for('href')]: 'http://mango.io/wtf?',
            [Symbol.for('data-version')]: '0.9dev'
          })('Mango'),
          text('. Hosted on '),
          a$0027({ [Symbol.for('href')]: 'http://www.linode.com/?r=ce523c9eeda64e4bceaf7011dc9e8558b909711d' })('Linode'),
          text('. Original content '),
          a$0027({ [Symbol.for('href')]: '/copying/' })('WTFPL-licensed'),
          text('.')
        ])])
    ])
  ]);
};
export default base$002Dtemplate;
