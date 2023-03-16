import S from 'sanctuary';
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
const caption = caption => {
  return p$0027({ [Symbol.for('class')]: 'caption' })(caption);
};
const captioned$002Dimage = src => {
  return alt => caption => dl([
    dt(img({
      [Symbol.for('alt')]: alt,
      [Symbol.for('src')]: src
    })),
    dd(caption)
  ]);
};
const captioned$002Dimages = images => {
  return dl(S.chain(image => [
    dt(img({
      [Symbol.for('alt')]: image[1],
      [Symbol.for('src')]: image[0]
    })),
    dd(image[2])
  ])(images));
};
const code$002Dblock = language => {
  return source$002Dcode => pre(code(text(source$002Dcode)));
};
const decorative$002Dimage = src => {
  return p(img({
    [Symbol.for('alt')]: '',
    [Symbol.for('src')]: src
  }));
};
const pros$002Dand$002Dcons$002Dlist = f => {
  return ul(f(li$0027({ [Symbol.for('class')]: 'pro' }))(li$0027({ [Symbol.for('class')]: 'con' })));
};
const uncaptioned$002Dimage = src => {
  return alt => p(img({
    [Symbol.for('alt')]: alt,
    [Symbol.for('src')]: src
  }));
};
const update = datetime => {
  return body => div({ [Symbol.for('class')]: 'update' })(S.prepend(h4([
    'Update \u2014 ',
    time({ [Symbol.for('datetime')]: datetime.toISO() })(datetime.toFormat('d MMMM y'))
  ]))(canonicalize$002Dchildren(body)));
};
const $2014 = text('\u2009\u2014\u2009');
export {
  caption,
  captioned$002Dimage,
  captioned$002Dimages,
  code$002Dblock,
  decorative$002Dimage,
  pros$002Dand$002Dcons$002Dlist,
  uncaptioned$002Dimage,
  update,
  $2014
};
