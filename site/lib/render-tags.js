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
const _render$002Dtags = function _render$002Dtags(posts) {
  return (() => {
    const counts = s[Symbol.for('reduce')](counts => tag => ({
      ...counts,
      [tag]: counts[tag] + 1
    }))(s[Symbol.for('map')](x => 0)(tags))(s[Symbol.for('chain')](post => post[Symbol.for('tags')])(posts));
    return [
      h1('Tags'),
      _ol$0027({ [Symbol.for('id')]: 'tags' })(s[Symbol.for('map')](tag => _li$0027({ [Symbol.for('data-count')]: counts[tag] })(a('/tag/' + tag + '/')(tags[tag])))(Object['keys'](tags))),
      div({ [Symbol.for('class')]: 'clearfix' })([])
    ];
  })();
};
export default _render$002Dtags;
