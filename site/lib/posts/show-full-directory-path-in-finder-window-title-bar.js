import {
  canonicalize$002Dchildren,
  text,
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
  captioned$002Dimages,
  code$002Dblock
} from '../components.js';
import datetime from '../datetime.js';
const excerpt = [p([
    'If you have ever found yourself command-clicking the\n    title of a Finder window to find out where you are (',
    strong('/Library/Fonts'),
    ' or ',
    strong('~/Library/Fonts'),
    '\n    is one I\'ve double-checked many times), you\'ll understand how\n    pleased I was to discover that there is a command which can be\n    entered in Terminal to ',
    a('http://osxdaily.com/2007/12/02/show-full-directory-path-in-finder-window-title-bars/')('show full directory paths in Finder window title bars'),
    '.'
  ])];
const body = [
  ...excerpt,
  captioned$002Dimages([{
      alt: 'Finder windows without paths',
      src: '/images/posts/2/finder-windows-without-paths.png',
      caption: [
        strong('Before:'),
        '\n      Finder windows with directory name only in title bar'
      ]
    }]),
  p(['In the screenshot above, it is clear that the two Finder windows are\n    displaying different Fonts folders, but it is unclear which is which.']),
  p([
    'To display the full path, copy and paste the following into Terminal\n    and hit ',
    strong('return'),
    '.'
  ]),
  code$002Dblock(Symbol.for('console'))(`defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES
`),
  p(['For the changes to take effect, you will need to restart Finder:']),
  code$002Dblock(Symbol.for('console'))(`killall Finder
`),
  captioned$002Dimages([{
      alt: 'Finder windows with paths',
      src: '/images/posts/2/finder-windows-with-paths.png',
      caption: [
        strong('After:'),
        '\n      Finder windows with full directory path in title bar'
      ]
    }]),
  p([
    'Confusion resolved! Please note that this is ',
    strong('only applicable for OS X 10.5'),
    ' users.'
  ]),
  p(['To revert to the default title bar treatment, simply enter:']),
  code$002Dblock(Symbol.for('console'))(`defaults write com.apple.finder _FXShowPosixPathInTitle -bool NO
`),
  p(['Then, restart Finder once again:']),
  code$002Dblock(Symbol.for('console'))(`killall Finder
`)
];
export default {
  id: 2,
  slug: 'show-full-directory-path-in-finder-window-title-bar',
  title: 'Show full directory path in Finder window title bar',
  datetime: datetime('2008-11-29')('19:07:00')(Symbol.for('Pacific/Auckland')),
  tags: ['mac-os-x'],
  body: body
};
