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
const Prelude = { map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f) };
const base$002Dtemplate = document$002Dtitle => main => html([
  head([
    meta({ charset: 'utf-8' }),
    title(Prelude.map(String)(document$002Dtitle)),
    link({
      rel: 'alternate',
      type: 'application/atom+xml',
      href: '/feed/'
    }),
    link({
      rel: 'stylesheet',
      href: '/css/reset.css',
      media: 'all'
    }),
    link({
      rel: 'stylesheet',
      href: '/css/print.css',
      media: 'print'
    }),
    link({
      rel: 'stylesheet',
      href: '/css/screen.css',
      media: 'screen'
    }),
    link({
      rel: 'shortcut icon',
      type: 'image/x-icon',
      href: 'http://static.davidchambersdesign.com/favicon.ico'
    }),
    script({ src: 'http://use.typekit.com/jhk0ogh.js' })([]),
    script({})([text('try{Typekit.load();}catch(e){}')])
  ]),
  body([
    div({ id: 'skip' })([a({ href: '#main' })(['Skip to main content'])]),
    div({ id: 'wrap' })([
      div({ id: 'header' })([header([
          a({
            id: 'title',
            href: '/'
          })(['David Chambers Design']),
          hr,
          p(['It\'s where I share interesting info with other web geeks']),
          nav$0027({ id: 'nav' })([ul([
              li([a({ href: '/about/' })([span({})([
                    strong(['About.']),
                    '\n                      Who I am and what I do.'
                  ])])]),
              li([a({ href: '/contact/' })([span({})([
                    strong(['Contact.']),
                    '\n                      Just in case you want to get in touch.'
                  ])])]),
              li([a({ href: '/archives/' })([span({})([
                    strong(['Archives.']),
                    '\n                      Old posts, recent posts, they\'re all here.'
                  ])])]),
              li([a({ href: '/tags/' })([span({})([
                    strong(['Tags.']),
                    '\n                      Helpful if you\'re after posts on a particular topic.'
                  ])])]),
              li([a({ href: 'https://bitbucket.org/davidchambers' })([span({})([
                    strong(['Bitbucket.']),
                    '\n                      Home to most of my open-source projects.'
                  ])])]),
              li([a({ href: '/twitter/' })([span({})([
                    strong(['Twitter.']),
                    '\n                      It\'s where I chirrup\u2026 or chirp\u2026 or something.'
                  ])])])
            ])])
        ])]),
      div({ id: 'main' })(main)
    ]),
    footer([p([
        'Powered by ',
        a({
          href: 'http://mango.io/wtf?',
          ['data-version']: '0.9dev'
        })(['Mango']),
        '. Hosted on ',
        a({ href: 'http://www.linode.com/?r=ce523c9eeda64e4bceaf7011dc9e8558b909711d' })(['Linode']),
        '. Original content ',
        a({ href: '/copying/' })(['WTFPL-licensed']),
        '.'
      ])])
  ])
]);
export default base$002Dtemplate;
