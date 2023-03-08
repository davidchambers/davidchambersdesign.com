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
import datetime from '../datetime.js';
const body = [
  excerpt([p(['I\'ve been using OS X almost exclusively for the last three\n             or four years, but it was only recently that I discovered the\n             system-wide method for changing keyboard shortcuts. I think\n             the reason that this feature eluded me for so long is that so\n             many of the hours I\'ve spent on OS X have involved the use of\n             the Adobe applications Photoshop, Illustrator, and InDesign,\n             which provide their own means of changing keyboard shortcuts.\n             I assumed that since application developers sometimes provide\n             their own interfaces for changing keyboard shortcuts, the\n             operating system must lack this functionality. I was wrong.'])]),
  p([
    'I stumbled upon this useful information while reading ',
    a('http://caminobrowser.org/documentation/faq/#cust_change')('Camino\'s FAQ'),
    '. I have reproduced its step-by-step instructions\n        below, since they are right on the money.'
  ]),
  ul([
    li(['First, quit \xABapplication\xBB; if it is running.']),
    li([
      'Open ',
      strong('System Preferences'),
      '.'
    ]),
    li([
      'Choose the ',
      strong('"Keyboard & Mouse"'),
      ' pane.'
    ]),
    li(['Select the "Keyboard Shortcuts" tab.']),
    li(['Press the "+" button at the bottom of that tab.']),
    li([
      'In the ',
      strong('Application'),
      ' pop-up menu, choose ',
      strong('<application>'),
      '.'
    ]),
    li(['In the "Menu Title" field, type the exact name of the menu\n              item you want to change, and in the "Keyboard Shortcut" field,\n              type the new shortcut you want that menu item to have. Press the\n              "OK" button to save the new shortcut.']),
    li(['You may now relaunch <application>.'])
  ])
];
export default {
  [Symbol.for('id')]: 9,
  [Symbol.for('slug')]: 'changing-keyboard-shortcuts-in-mac-os-x',
  [Symbol.for('title')]: 'Changing keyboard shortcuts in Mac OS X',
  [Symbol.for('datetime')]: datetime('2009-03-25')('16:36:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'keyboard-shortcuts',
    'mac-os-x'
  ],
  [Symbol.for('body')]: body
};
