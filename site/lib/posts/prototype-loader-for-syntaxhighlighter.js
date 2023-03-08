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
  _code$002Dblock,
  update
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  p([
    'Skip to ',
    a('#setup')('setup'),
    ' or ',
    a('#usage')('usage')
  ]),
  excerpt([
    p([
      a('http://alexgorbatchev.com/wiki/SyntaxHighlighter')('SyntaxHighlighter'),
      ' is a fully functional self-contained\n             code syntax highlighter developed in JavaScript (as stated on\n             its wiki). One of its deficiencies is that it retrieves all\n             its brushes each time a page is loaded, despite the fact that\n             in many cases only one or two (or none) are required.'
    ]),
    p([
      'Currently, ',
      a('http://prototypejs.org/')('Prototype'),
      ' is\n             my JavaScript framework of choice (although I\'m really looking\n             forward to trying ',
      a('http://jquery.com/')('jQuery'),
      ').\n             I have used Prototype to create a ',
      strong('brush loader for\n             SyntaxHighlighter'),
      ', which retrieves brushes on demand to\n             reduce page loading times (in certain circumstances).'
    ])
  ]),
  update(datetime('2009-06-27')('06:21:00')(Symbol.for('Pacific/Auckland')))([p(['I have completely rewritten the code so that it no longer\n             requires empty functions inside the brush files to act as\n             indicators of readiness. Instead, the required brushes are\n             retrieved in a daisy chain. This is both more elegant and\n             more reliable. Additionally, style sheets are now also\n             retrieved on demand.'])]),
  _h3$0027({ [Symbol.for('id')]: 'setup' })('Setup'),
  p([strong('Requires Prototype!')]),
  p([
    'If you are not already using Prototype on your site,\n        I recommend using SyntaxHighlighter in the conventional\n        manner, since there is significant overhead associated\n        with loading ',
    code('prototype.js'),
    '.'
  ]),
  p([
    'If you ',
    em('are'),
    ' using Prototype, follow these steps\n        to have brushes retrieved dynamically:'
  ]),
  ol([
    li([p([
        'Download ',
        a('/downloads/loader.js')('loader.js'),
        ' or the ',
        a('/downloads/loader.min.js.gz')('minified and gzipped version'),
        '\n                  and upload it to your SyntaxHighlighter ',
        strong('scripts'),
        '\n                  directory.'
      ])]),
    li([
      p(['Replace:']),
      _code$002Dblock(Symbol.for('html'))('\n               <script src="/path/to/scripts/shCore.js"></script>\n               <script src="/path/to/scripts/shBrushAS3.js"></script>\n               <script src="/path/to/scripts/shBrushBash.js"></script>\n               .\n               .\n               .\n               <script src="/path/to/scripts/shBrushVb.js"></script>\n               <script src="/path/to/scripts/shBrushXml.js"></script>\n\n               <script>SyntaxHighlighter.all()</script>\n               '),
      p(['with:']),
      _code$002Dblock(Symbol.for('html'))('\n               <script>\n                   function Brush(name, filename, aliases)\n                   {\n                       this.name = name;\n                       this.filename = filename;\n                       this.aliases = aliases;\n                   }\n                   var settings = {\n                       selector: \'head\',\n                       path: \'http://example.com/sh/\',\n                       stylesheets: [\'shThemeDefault\'],\n                       brushes: [],\n                       extensions: { stylesheet: \'css\', brush: \'js\' },\n                       defaults: {}\n                   };\n               </script>\n               <script src="/path/to/scripts/loader.js"></script>\n               ')
    ]),
    li([p([
        'Replace both instances of ',
        code('http://example.com/sh/'),
        '\n                  in the above snippet with the path to your ',
        strong('SyntaxHighlighter'),
        ' directory.'
      ])])
  ]),
  _h3$0027({ [Symbol.for('id')]: 'usage' })('Usage'),
  p([
    'The ',
    code('settings'),
    ' object provides flexibility by allowing\n        various things to be modified or included.'
  ]),
  p([
    strong('Selector.'),
    ' By default, ',
    code('settings.selector'),
    '\n        is set to \'head\', which means that script elements will be inserted\n        into the head element. This can be replaced with any CSS selector to\n        have script elements inserted into a different element.'
  ]),
  p([
    strong('Style sheets.'),
    ' By default, ',
    code('settings.stylesheets'),
    '\n        is an array containing just the default style sheet. This can easily be\n        modified:'
  ]),
  _code$002Dblock(Symbol.for('javascript'))('\n     stylesheets: [\'shThemeCoda\', \'shThemeAppleScript\'],\n     '),
  p([
    strong('Brushes.'),
    ' By default, ',
    code('settings.brushes'),
    '\n        is an empty array. All the bundled brushes are handled automatically,\n        but additional brushes can be included by adding them to this array:'
  ]),
  _code$002Dblock(Symbol.for('javascript'))('\n     brushes: [\n         new Brush(\'AppleScript\', \'shBrushAppleScript\', [\'applescript\'])\n     ],\n     '),
  p([
    'When creating a ',
    code('Brush'),
    ' object, provide the constructor\n        with the brush\'s name, its file name (sans extension), and an array\n        of aliases.'
  ]),
  p([
    strong('Extensions.'),
    ' By default, ',
    code('settings.extensions'),
    '\n        has \'css\' set against ',
    code('stylesheet'),
    ' and \'js\' set against ',
    code('brush'),
    '. It is useful to be able to change these values if,\n        for example, gzipped versions of the brushes are to be used.'
  ]),
  p([
    strong('Defaults.'),
    ' SyntaxHighlighter defaults can be set by\n        modifying ',
    code('settings.defaults'),
    ':'
  ]),
  _code$002Dblock(Symbol.for('javascript'))('\n     defaults: {\n         \'auto-links\': false,\n         \'html-script\': true\n     }\n     '),
  p([
    'Many thanks to Dan Breslau for letting me know about ',
    code('SyntaxHighlighter.highlight()'),
    ' and for his thorough\n        testing of each of the early iterations of this code. Dan\'s ',
    a('http://www.outofwhatbox.com/blog/2009/06/syntaxhighlighter-revised-again-works-on-its-own-once-again/')('SyntaxHighlighter improvements'),
    ' are well worth a look!'
  ]),
  update(datetime('2009-06-27')('06:21:00')(Symbol.for('Pacific/Auckland')))([p([
      'Thanks also to Bob Matsuoka for sharing his ',
      a('http://ajaxian.com/archives/a-technique-for-lazy-script-loading')('technique for lazy script loading'),
      ' which provides\n             workarounds for browsers that do not support the onload\n             event when applied to script elements.'
    ])]),
  update(datetime('2009-08-16')('01:24:00')(Symbol.for('Pacific/Auckland')))([
    p(['I\'ve updated the script to ensure that the XML brush is always\n             loaded when at least one of the following conditions is true:']),
    ol([
      li([
        code('settings.defaults[\'html-script\']'),
        ' is set to ',
        code('true')
      ]),
      li([
        'a pre element to be highlighted has ',
        code('html-script: true'),
        ' in its class name'
      ])
    ])
  ])
];
export default {
  [Symbol.for('id')]: 18,
  [Symbol.for('slug')]: 'prototype-loader-for-syntaxhighlighter',
  [Symbol.for('title')]: 'Prototype loader for SyntaxHighlighter',
  [Symbol.for('datetime')]: datetime('2009-06-22')('01:04:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'javascript',
    'optimization',
    'prototype',
    'syntaxhighlighter'
  ],
  [Symbol.for('body')]: body
};
