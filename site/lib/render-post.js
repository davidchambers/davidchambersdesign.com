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
import s from './sanctuary.js';
import tags from './tags.js';
const _render$002Dpost = function _render$002Dpost(post) {
  return _related$002Dposts => [_article$0027(s[Symbol.for('maybe')]({})(s[Symbol.for('singleton')](Symbol.for('id')))(s[Symbol.for('value')](Symbol.for('article-id'))(post)))(s[Symbol.for('join')]([
      [header([
          h1(post[Symbol.for('title')]),
          time({
            [Symbol.for('datetime')]: post[Symbol.for('datetime')]['toFormat']('yyyy-MM-dd\'T\'HH:mm:ssZZ'),
            [Symbol.for('pubdate')]: 'pubdate'
          })(post[Symbol.for('datetime')]['toFormat']('d MMMM y'))
        ])],
      post[Symbol.for('body')],
      [_footer$0027({ [Symbol.for('class')]: 'metadata' })(s[Symbol.for('join')]([
          [ul(_li$0027({ [Symbol.for('class')]: 'shorturl' })(a((() => {
              return 'http://dċd.ws/' + post[Symbol.for('id')] + '/';
            })())('Short URL')))],
          s[Symbol.for('array')]([])(head => tail => [
            h4('This post has the following tags:'),
            ol(s[Symbol.for('map')](tag => li(a((() => {
              return '/tag/' + tag + '/';
            })())(tags[tag])))(s[Symbol.for('prepend')](head)(tail)))
          ])(post[Symbol.for('tags')])
        ]))],
      s[Symbol.for('array')]([])(_$005F => _$005F => [
        _h3$0027({ [Symbol.for('id')]: 'related' })('Possibly related posts'),
        ul(s[Symbol.for('map')](_related$002Dpost => li(a((() => {
          return '/' + _related$002Dpost[Symbol.for('slug')] + '/';
        })())(_related$002Dpost[Symbol.for('title')])))(_related$002Dposts))
      ])(_related$002Dposts)
    ]))];
};
export default _render$002Dpost;
