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
import {
  _uncaptioned$002Dimage,
  update
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p([
      'It\'s not uncommon to start watching a video online and discover\n             that its audio is quite quiet. This is not a problem in and of\n             itself, as one can simply crank up the output volume. What ',
      em('is'),
      ' a problem, however, is a message then arriving in\n             one\'s inbox and waking the neighbours!'
    ]),
    p([
      'This situation could be avoided if it were possible adjust the\n             browser\'s output volume without affecting the rest of the system.\n             As it is, though, one is forced to increase the volume of ',
      em('everything'),
      '. Not ideal.'
    ]),
    h3('System Preferences > Sound > Application Volumes'),
    _uncaptioned$002Dimage('/images/posts/windows/application-volumes.png')('Possible interface for application-specific volume settings\n           in Mac OS X'),
    p([
      'Wouldn\'t this be nice? Many months ago I did some Googling\n             to find out whether it\'s possible to control volume on an\n             application-by-application basis in OS X. The closest thing\n             to a solution was an X11 (read: ugly) app that ',
      em('kinda'),
      '\n             worked.'
    ])
  ]),
  p([
    'Apple, I don\'t bug you often, but here I will. ',
    strong('Please\n        build this into the OS and keep the neighbours happy.'),
    ' It\'d be\n        particularly sexy if applications such as iTunes which ',
    em('do'),
    '\n        currently grant the user control of the application\'s volume\n        synchronized their volume settings with the ones in System\n        Preferences. That is, adjusting the volume in iTunes would adjust\n        the iTunes volume setting in System Preferences, and vice versa.'
  ]),
  p(['+1 in the comments if you\'d like to see this feature implemented.\n        :)']),
  update(datetime('2010-04-15')('14:36:00')(Symbol.for('Pacific/Auckland')))([
    p([
      a('http://www.joesoft.com/products/hear.php')('Hear'),
      '\n             offers this functionality, but isn\'t cheap. I hope Hear\'s\n             developers decide to release a preference pane that provides\n             the functionality of Hear\'s mixer pane and nothing more\n             (I\'m about to make this request).'
    ]),
    _uncaptioned$002Dimage('/images/posts/windows/hear-mixer-pane.png')('Hear\'s mixer pane')
  ]),
  h4('Bonus titbit'),
  p(['While faking the drop shadow on the Sound window above I discovered\n        a combination of drop shadow values which pretty much perfectly match\n        those of an active window in OS X:']),
  _uncaptioned$002Dimage('/images/posts/47/drop-shadow-settings.png')('Photoshop\'s drop shadow dialog'),
  dl([
    _dt$0027({ [Symbol.for('class')]: 'textual' })('shadow color'),
    dd('#000000 (black)'),
    dt('opacity'),
    dd('45%'),
    dt('angle'),
    dd('90\xB0'),
    dt('distance'),
    dd('16px'),
    dt('spread'),
    dd('0%'),
    dt('size'),
    dd('32px')
  ])
];
export default {
  [Symbol.for('id')]: 47,
  [Symbol.for('slug')]: 'application-specific-volume-control-in-mac-os-x',
  [Symbol.for('title')]: 'Application-specific volume control in Mac OS X?',
  [Symbol.for('datetime')]: datetime('2010-04-07')('02:04:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'mac-os-x',
    'ux'
  ],
  [Symbol.for('body')]: body
};
