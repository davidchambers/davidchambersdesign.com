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
const captioned$002Dimages = images => {
  return dl(images.flatMap(image => [
    dt(img({
      ['alt']: image.alt,
      ['src']: image.src
    })),
    dd(image.caption)
  ]));
};
const code$002Dblock = language => {
  return source$002Dcode => pre(code(text(source$002Dcode)));
};
const update = datetime => {
  return body => div({ ['class']: 'update' })([
    h4([
      'Update \u2014 ',
      time({ ['datetime']: datetime.toISO() })([datetime.toFormat('d MMMM y')])
    ]),
    ...canonicalize$002Dchildren(body)
  ]);
};
const $2014 = text('\u2009\u2014\u2009');
export {
  captioned$002Dimages,
  code$002Dblock,
  update,
  $2014
};
