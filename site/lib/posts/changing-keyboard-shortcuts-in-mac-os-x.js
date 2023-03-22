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
import datetime from '../datetime.js';
const Prelude = { map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f) };
const excerpt = [p(['I\'ve been using OS X almost exclusively for the last three\n    or four years, but it was only recently that I discovered the\n    system-wide method for changing keyboard shortcuts. I think\n    the reason that this feature eluded me for so long is that so\n    many of the hours I\'ve spent on OS X have involved the use of\n    the Adobe applications Photoshop, Illustrator, and InDesign,\n    which provide their own means of changing keyboard shortcuts.\n    I assumed that since application developers sometimes provide\n    their own interfaces for changing keyboard shortcuts, the\n    operating system must lack this functionality. I was wrong.'])];
const body = [
  ...excerpt,
  p([
    'I stumbled upon this useful information while reading ',
    a({ href: 'http://caminobrowser.org/documentation/faq/#cust_change' })(['Camino\'s FAQ']),
    '. I have reproduced its step-by-step instructions\n    below, since they are right on the money.'
  ]),
  ul([
    li(['First, quit \xABapplication\xBB; if it is running.']),
    li([
      'Open ',
      strong(['System Preferences']),
      '.'
    ]),
    li([
      'Choose the ',
      strong([`"Keyboard & Mouse"`]),
      ' pane.'
    ]),
    li([`Select the "Keyboard Shortcuts" tab.`]),
    li([`Press the "+" button at the bottom of that tab.`]),
    li([
      'In the ',
      strong(['Application']),
      ' pop-up menu, choose ',
      strong(['<application>']),
      '.'
    ]),
    li([`In the "Menu Title" field, type the exact name of the menu
      item you want to change, and in the "Keyboard Shortcut" field,
      type the new shortcut you want that menu item to have. Press
      the "OK" button to save the new shortcut.`]),
    li(['You may now relaunch <application>.'])
  ])
];
export default {
  id: 9,
  slug: 'changing-keyboard-shortcuts-in-mac-os-x',
  title: ['Changing keyboard shortcuts in Mac OS X'],
  datetime: datetime('2009-03-25')('16:36:00')('Pacific/Auckland'),
  tags: [
    'keyboard-shortcuts',
    'mac-os-x'
  ],
  body: body
};
