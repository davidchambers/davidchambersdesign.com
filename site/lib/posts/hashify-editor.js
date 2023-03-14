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
import { captioned$002Dimages } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p(['On 19 April 2011, at around noon Pacific time, I published\n       a short tweet.']),
  blockquote([p([
      'Hashify is officially live as of now! ',
      a('http://bit.ly/dXYxGU')('bit.ly/dXYxGU')
    ])]),
  p([
    'Quite to my surprise word of the release spread\n       incredibly quickly, thanks in large part to the ',
    a('http://news.ycombinator.com/item?id=2464213')('Hacker News thread'),
    ' that sprang up and\n       received a great deal of attention.'
  ]),
  p(['The vast majority of the ensuing discussion focused on the\n       implications of stuffing documents into URLs, and of using bit.ly\n       as a document store. While there was much debate as to whether this\n       "cool hack" will turn out to have practical application, the one\n       undoubtedly useful component was overlooked.']),
  h3('Markdown editing for the masses'),
  p([
    'Before dropping off the face of the earth, John Fraser created ',
    a('https://bitbucket.org/davidchambers/showdown.js')('Showdown'),
    '\n       and ',
    a('http://code.google.com/p/wmd/')('wmd'),
    '.\n       The latter is a WYSIWYM Markdown editor, popularized by ',
    a('http://stackoverflow.com/')('Stack Overflow'),
    '. I\'ve long been\n       supportive of wmd\'s goals, but I\'ve never liked its implementation.'
  ]),
  p(['Several drawbacks of wmd encouraged me to write my own Markdown\n       editor:']),
  ul([
    li('Its use of inline styles makes it difficult to customize the\n           toolbar\'s appearance.'),
    li('Many HTTP requests are required to retrieve the toolbar icons.'),
    li('Lack of modularity: Showdown is a dependency.'),
    li('Unnatural keyboard shortcuts.')
  ]),
  p([
    a('https://bitbucket.org/davidchambers/hashify-editor')('Hashify Editor'),
    ' addresses these concerns. Styles are applied\n       via a style sheet, and selector specificity has been kept low to\n       make overriding default styling simple. Selectors are prefixed\n       with ',
    code('hashify-editor'),
    ' to prevent erroneous matches.\n       Additionally, the images have been sprited, optimized, Base64\n       encoded, and included in the style sheet as a data URI.'
  ]),
  p([
    'Hashify Editor does not require Showdown, as its focus is on\n       turning the humble ',
    code('textarea'),
    ' into a useful Markdown\n       editor. TextMate-style keyboard shortcuts make it a joy to work\n       with metacharacters and text selections.'
  ]),
  p([
    'Best of all is the preview option: one is able to view -- and of\n       course, edit -- the text at ',
    a('http://hashify.me/')('hashify.me'),
    '\n       with a single click.'
  ]),
  captioned$002Dimages([
    [
      '/images/posts/85/hashify-editor-at-david-chambers-design.png',
      'Hashify Editor at David Chambers Design',
      'Hashify Editor at David Chambers Design'
    ],
    [
      '/images/posts/85/comment-preview-at-hashify.me.png',
      'Comment preview at hashify.me',
      'Comment preview at hashify.me'
    ]
  ]),
  h3('Adoption'),
  p([
    'I love sites which support Markdown commenting. Unfortunately many of\n       those that do -- even ',
    a('http://forrst.com/')('Forrst'),
    ' -- don\'t\n       provide previews. As a result, each time I\'m about to submit a lengthy\n       comment I select all, copy, open a new tab, go to hashify.me, tab into\n       the editor, and paste in my comment. Were Forrst to integrate Hashify\n       Editor, six of these steps could be replaced by a single mouse click.\n       :D'
  ])
];
export default {
  ['id']: 85,
  ['slug']: 'hashify-editor',
  ['title']: 'Hashify Editor',
  ['datetime']: datetime('2011-04-24')('06:15:00')(Symbol.for('America/Los_Angeles')),
  ['tags']: [
    'hashify',
    'markdown',
    'showdown',
    'ux'
  ],
  ['body']: body
};
