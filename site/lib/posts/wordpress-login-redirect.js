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
} from '../elements.js';
import { _code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p([
    'Sometimes we require users to log in to a WordPress site in order\n        to access ',
    em('front-end'),
    ' functionality hidden from guests.\n        In such instances, we can simply provide a standard login link:'
  ]),
  _code$002Dblock(Symbol.for('php'))('\n     <a href="<?php bloginfo(\'url\'); ?>/wp-login.php">log in</a>\n     '),
  p([
    'While this gets the job done, it takes users to the dashboard after\n        they have logged in: they must then click on a link to return to the\n        front-end, at which point an additional click may be required to get\n        them back to the page they were viewing. Since WordPress 2.6.2 it has\n        been possible to circumvent this round trip from ',
    strong('origin'),
    '\n        to ',
    strong('wp-login.php'),
    ' to ',
    strong('wp-admin/'),
    ' to ',
    strong('/'),
    ' and finally back to ',
    strong('origin'),
    ' by including\n        a value for ',
    code('redirect_to'),
    ' in the href:'
  ]),
  _code$002Dblock(Symbol.for('php'))('\n     <a href="<?php bloginfo(\'url\'); ?>/wp-login.php?redirect_to=<?php echo urlencode($_SERVER[\'REQUEST_URI\']); ?>">log in</a>\n     '),
  p(['The above returns users to their starting point after they\'ve\n        logged in.'])
];
export default {
  [Symbol.for('id')]: 7,
  [Symbol.for('slug')]: 'wordpress-login-redirect',
  [Symbol.for('title')]: 'WordPress login redirect',
  [Symbol.for('datetime')]: datetime('2009-03-01')('03:01:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'php',
    'wordpress'
  ],
  [Symbol.for('body')]: body
};
