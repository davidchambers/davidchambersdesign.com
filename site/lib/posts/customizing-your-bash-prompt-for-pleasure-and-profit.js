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
  _captioned$002Dimage,
  _code$002Dblock,
  update
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p(['Mac OS X\'s default bash prompt is dull and uninformative.']),
    _captioned$002Dimage('/images/posts/80/windows/default-os-x-bash-prompt.png')('Mac OS X\'s default bash prompt')('Mac OS X\'s default bash prompt'),
    p([
      'Since only the current directory name is visible, I find\n             myself running ',
      code('pwd'),
      ' more often than is healthy.\n             Also, I find the uneven prompt length jarring.'
    ])
  ]),
  p([
    'My solution to both of these problems is to include the full\n        path ',
    em('on its own line'),
    ' (with a preceding ',
    code('\\n'),
    '\n        providing much-needed breathing room).'
  ]),
  _captioned$002Dimage('/images/posts/80/windows/custom-bash-prompt.png')('Custom bash prompt which displays the full path')('Custom bash prompt which displays the full path'),
  h3('Configuring the bash prompt'),
  p([
    'Add something like the following to your ',
    strong('~/.bashrc'),
    '.'
  ]),
  _code$002Dblock(Symbol.for('bash'))('\n     PS1="\\n\\[\\e[1;36m\\]\\w\\n\\[\\e[1;32m\\]> \\[\\e[0m\\]"\n     '),
  h4('What the heck does all this mean?'),
  p([
    code('PS1'),
    ' refers to the bash prompt. ',
    code('PS2'),
    ', ',
    code('PS3'),
    ', and ',
    code('PS4'),
    ' relate to similar things.'
  ]),
  p([
    code('\\n'),
    ' is a newline.'
  ]),
  p([
    code('\\['),
    ' begins a sequence of non-printing characters.'
  ]),
  p([
    code('\\e[1;36m'),
    ' is the code for "light cyan".'
  ]),
  p([
    code('\\]'),
    ' ends the sequence of non-printing characters.'
  ]),
  p([
    code('\\w'),
    ' is the current working directory\n        (with a tilde used in place of ',
    code('$HOME'),
    ').'
  ]),
  p([
    code('\\n'),
    ' is another newline.'
  ]),
  p([
    code('\\[\\e[1;32m\\]'),
    ' is a sequence of non-printing\n        characters containing the code for "light green".'
  ]),
  p([
    code('> '),
    ' is simply a ">" followed by a space.'
  ]),
  p([
    code('\\[\\e[0m\\]'),
    ' puts an end to the colouring,\n        preventing it from "spilling out".'
  ]),
  update(datetime('2011-04-03')('21:00:00')(Symbol.for('America/Los_Angeles')))([p([
      'When first this post was published colour codes were not\n             preceded by ',
      code('\\['),
      '. The colour codes themselves\n             were thus considered when calculating the prompt\'s length,\n             meaning that the first several characters of a command\n             would sometimes remain visible when arrowing up and down.\n             >.<'
    ])]),
  update(datetime('2012-04-20')('01:15:00')(Symbol.for('America/Los_Angeles')))([
    p([
      'I\'ve recently taken up Vim. In Vim, one can enter ',
      code(':shell'),
      ' while in command mode to open a shell.\n             The first time I did so I noticed that the colour codes\n             appeared in the prompt. Feature detection can be used to\n             ensure that colour codes are only provided to "smart"\n             terminals:'
    ]),
    _code$002Dblock(Symbol.for('bash'))('\n          [[ "$TERM" == dumb ]] && PS1="\\n\\w\\n> "\n          [[ "$TERM" != dumb ]] && PS1="\\n\\[\\e[1;36m\\]\\w\\n\\[\\e[1;32m\\]> \\[\\e[0m\\]"\n          ')
  ]),
  h4('Note for Mac OS X users'),
  p([
    'Terminal loads your ',
    strong('~/.bash_profile'),
    '\n        but not your ',
    strong('~/.bashrc'),
    '. As a result,\n        your ',
    strong('~/.bash_profile'),
    ' should contain\n        the following snippet.'
  ]),
  _code$002Dblock(Symbol.for('bash'))('\n     if [ -f ~/.bashrc ]; then\n       source ~/.bashrc\n     fi\n     ')
];
export default {
  [Symbol.for('id')]: 80,
  [Symbol.for('slug')]: 'customizing-your-bash-prompt-for-pleasure-and-profit',
  [Symbol.for('title')]: 'Customizing your bash prompt for pleasure and profit',
  [Symbol.for('datetime')]: datetime('2011-02-13')('01:30:00')(Symbol.for('America/Los_Angeles')),
  [Symbol.for('tags')]: [
    'mac-os-x',
    'productivity',
    'terminal.app'
  ],
  [Symbol.for('body')]: body
};
