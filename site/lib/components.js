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
const caption = function caption(caption) {
  return _p$0027({ [Symbol.for('class')]: 'caption' })(caption);
};
const _captioned$002Dimage = function _captioned$002Dimage(src) {
  return alt => caption => dl([
    dt(img({
      [Symbol.for('alt')]: alt,
      [Symbol.for('src')]: src
    })),
    dd(caption)
  ]);
};
const _captioned$002Dimages = function _captioned$002Dimages(images) {
  return dl(s[Symbol.for('chain')](image => [
    dt(img({
      [Symbol.for('alt')]: image[1],
      [Symbol.for('src')]: image[0]
    })),
    dd(image[2])
  ])(images));
};
const _code$002Dblock = function _code$002Dblock(language) {
  return _source$002Dcode => (() => {
    const lines = s[Symbol.for('from-maybe')]([])(s[Symbol.for('chain')](s[Symbol.for('init')])(s[Symbol.for('tail')](s[Symbol.for('lines')](_source$002Dcode))));
    const _trim$002Dleading$002Dspaces = function _trim$002Dleading$002Dspaces(line) {
      return s[Symbol.for('from-maybe')](line)(s[Symbol.for('chain')]($1 => s[Symbol.for('strip-prefix')]($1)(line))(s[Symbol.for('map')](x => x['match'])(s[Symbol.for('chain')](s[Symbol.for('match')](new RegExp('^[ ]*', '')))(s[Symbol.for('head')](lines)))));
    };
    return pre(code(text(s[Symbol.for('unlines')](s[Symbol.for('map')](_trim$002Dleading$002Dspaces)(lines)))));
  })();
};
const _decorative$002Dimage = function _decorative$002Dimage(src) {
  return p(img({
    [Symbol.for('alt')]: '',
    [Symbol.for('src')]: src
  }));
};
const _interview$002Dlist = function _interview$002Dlist(interviewer) {
  return interviewee => exchange => ol(s[Symbol.for('snd')](s[Symbol.for('reduce')](s[Symbol.for('pair')](name => items => quotation => name === interviewer ? s[Symbol.for('Pair')](interviewee)([
    ...items,
    _li$0027({ [Symbol.for('class')]: 'interviewer' })([
      strong(interviewer + ':'),
      ' ',
      ...quotation
    ])
  ]) : s[Symbol.for('Pair')](interviewer)([
    ...items,
    _li$0027({})([
      strong(interviewee + ':'),
      ' ',
      ...quotation
    ])
  ])))(s[Symbol.for('Pair')](interviewer)([]))(s[Symbol.for('map')](_canonicalize$002Dchildren)(exchange))));
};
const _pros$002Dand$002Dcons$002Dlist = function _pros$002Dand$002Dcons$002Dlist(f) {
  return ul(f(_li$0027({ [Symbol.for('class')]: 'pro' }))(_li$0027({ [Symbol.for('class')]: 'con' })));
};
const _uncaptioned$002Dimage = function _uncaptioned$002Dimage(src) {
  return alt => p(img({
    [Symbol.for('alt')]: alt,
    [Symbol.for('src')]: src
  }));
};
const update = function update(datetime) {
  return body => div({ [Symbol.for('class')]: 'update' })(s[Symbol.for('prepend')](h4([
    'Update \u2014 ',
    time({ [Symbol.for('datetime')]: datetime['toISO']() })(datetime['toFormat']('d MMMM y'))
  ]))(_canonicalize$002Dchildren(body)));
};
export {
  caption,
  _captioned$002Dimage,
  _captioned$002Dimages,
  _code$002Dblock,
  _decorative$002Dimage,
  _interview$002Dlist,
  _pros$002Dand$002Dcons$002Dlist,
  _uncaptioned$002Dimage,
  update
};
