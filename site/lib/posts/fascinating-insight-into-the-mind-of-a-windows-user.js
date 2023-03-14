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
  captioned$002Dimage,
  decorative$002Dimage,
  interview$002Dlist
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  decorative$002Dimage('/images/posts/decorative/right/no-apple.png'),
  p(['The following conversation took place a couple of days ago in\n       my apartment. Matt\'s my flatmate, Doug\'s one of Matt\'s friends.\n       I was in the room at the time.']),
  interview$002Dlist('Matt')('Doug')([
    'So, Doug, do you think you could go the way of Mac?',
    'I already have, really, but I\'d never buy one.',
    'Why\'s that?',
    'Well -- no offense, David -- if I were to buy one I\'d be getting\n       something a retard could use, and I\'m not a retard.'
  ]),
  p([
    'I found this exchange both entertaining and enlightening. Never had\n       I considered the possibility that certain individuals use Windows ',
    em('because'),
    ' it\'s poorly designed and difficult to use!'
  ]),
  p(['There\'s certainly some sound reasoning behind Doug\'s stance: Doug\n       is proficient in Windows; gaining proficiency in Windows requires\n       a certain level of intelligence; Doug\'s proficiency in Windows is\n       therefore indicative of his intelligence.']),
  p(['Why, then, does Doug say that he\'s switched camps? He\'s using one\n       of these at school:']),
  captioned$002Dimage('/images/posts/44/27-inch-imac.jpg')('27-inch iMac')('27-inch iMac'),
  p(['Talk about having one\'s cake and eating it, too.'])
];
export default {
  ['id']: 44,
  ['slug']: 'fascinating-insight-into-the-mind-of-a-windows-user',
  ['title']: 'Fascinating insight into the mind of a Windows user',
  ['datetime']: datetime('2010-03-25')('15:06:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    'mac-os-x',
    'windows'
  ],
  ['body']: body
};
