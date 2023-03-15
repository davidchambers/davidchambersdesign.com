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
  caption,
  captioned$002Dimages,
  code$002Dblock,
  update
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  p([a('#setup')('Skip to setup instructions')]),
  excerpt([
    p([
      'I\'ve been using Alex Gorbatchev\'s ',
      a('http://alexgorbatchev.com/wiki/SyntaxHighlighter')('SyntaxHighlighter'),
      '\n      to syntactically display code of various languages for several\n      months now. When I decided to post an AppleScript snippet, however,\n      I realised that I was out of luck. SyntaxHighlighter does not\n      include an AppleScript "brush", and a quick flick through the ',
      a('http://alexgorbatchev.com/forums/')('SyntaxHighlighter forums'),
      '\n      did not bring me any joy.'
    ]),
    p([
      strong('How hard could it be to write a brush for AppleScript?'),
      ',\n      I wondered. The handy guide to ',
      a('http://alexgorbatchev.com/wiki/SyntaxHighlighter:Brushes:Custom')('developing a custom brush'),
      ' got me started, and I was soon\n      busy trying to encapsulate AppleScript\'s syntax -- along with its\n      keywords and countless words and phrases with special meanings --\n      into a handful of regular expressions.'
    ])
  ]),
  p([
    'Having created the brush (that\'s SyntaxHighlighter lingo for\n    the JavaScript file containing the language-specific regular\n    expressions), I proceeded to create a style sheet that would\n    display AppleScript snippets on the Web as they appear on OS X.\n    You can judge my success by comparing the three snippets below:\n    the first is a screenshot of Script Editor\'s rendering; the\n    second is a screenshot of the same snippet as it appears in my\n    browser; and the final snippet is text rendered by ',
    em('your'),
    '\n    browser.'
  ]),
  captioned$002Dimages([
    [
      '/images/posts/15/script-editor-syntax-highlighting.png',
      '',
      'Screenshot of Script Editor\'s rendering of an AppleScript snippet'
    ],
    [
      '/images/posts/15/syntaxhighlighter-applescript-theme.png',
      '',
      'Screenshot of snippet styled by AppleScript theme for SyntaxHighlighter'
    ]
  ]),
  code$002Dblock(Symbol.for('applescript'))('\n    #!/usr/bin/osascript\n\n    (*\n        This handler determines whether someone is happy.\n        It\'s actually just a good way to showcase AppleScript syntax highlighting using Alex Gorbatchev\'s SyntaxHighlighter.\n        (* Hey, nested comments. Woot! *)\n    *)\n\n    on user_is_happy()\n        -- determine which application is currently frontmost\n        tell application "System Events" to set app_list to the name of application processes whose frontmost is true\n        set front_app to the first item of app_list\n        tell application "Finder"\n            activate\n            display dialog \xAC\n                "Enter your name" default answer "" buttons {"Cancel", "OK"} \xAC\n                default button 2 with icon note\n            set user_name to the text returned of the result\n            (* The word "return" in the line below should not be in bold. The regex does its best to determine whether the word is being used in a return statement or as a line return. *)\n            display dialog "Hello, " & user_name & "!" & return & return & \xAC\n                "Are you happy?" buttons {"Yes", "No"} with icon note\n            set is_happy to the button returned of the result\n        end tell\n        -- activate the application that was frontmost initially\n        tell application front_app to activate\n        return is_happy = "Yes" -- this time the word "return" should be in bold\n    end user_is_happy\n\n    if user_is_happy() then\n        say "Woohoo!" using "Alex"\n    else\n        repeat 3 times\n            beep\n            delay 0.5\n        end repeat\n    end if\n  '),
  caption(['Live rendering of AppleScript snippet']),
  h3$0027({ [Symbol.for('id')]: 'setup' })('Setup'),
  p(['To add AppleScript syntax highlighting to your own site or blog,\n    do the following:']),
  ol([
    li([p([
        'Download ',
        a('http://alexgorbatchev.com/wiki/SyntaxHighlighter')('SyntaxHighlighter'),
        ', and follow the setup instructions.'
      ])]),
    li([p([
        'Download ',
        a('https://bitbucket.org/davidchambers/applescript-theme/raw/default/shBrushAppleScript.js')('AppleScript brush'),
        ',\n        and upload it to your SyntaxHighlighter ',
        strong('scripts'),
        '\n        directory.'
      ])]),
    li([p([
        'Download ',
        a('https://bitbucket.org/davidchambers/applescript-theme/raw/default/shThemeAppleScript.css')('AppleScript theme'),
        ',\n        and upload it to your SyntaxHighlighter ',
        strong('styles'),
        '\n        directory.'
      ])]),
    li([
      p(['Include the brush like so:']),
      code$002Dblock(Symbol.for('html'))('\n        <script src="/path/to/scripts/shCore.js"></script>\n        <script src="/path/to/scripts/shBrushAppleScript.js"></script>\n        <script>SyntaxHighlighter.all()</script>\n      ')
    ])
  ]),
  h3$0027({ [Symbol.for('id')]: 'usage' })('Usage'),
  p([
    'To have SyntaxHighlighter parse a block of AppleScript,\n    wrap the code in ',
    code('pre'),
    ' tags like so:'
  ]),
  code$002Dblock(Symbol.for('html'))('\n    <pre class="brush: applescript; class-name: applescript;"></pre>\n  '),
  p([
    code('brush: applescript;'),
    ' tells SyntaxHighlighter to\n    use the AppleScript brush for the text within the pre tag. ',
    code('class-name: applescript;'),
    ' tells SyntaxHighlighter\n    to add the class name "applescript" to the container div\n    that is inserted into the page. (Hopefully I\'m able to\n    convince Alex that the brush name should be added as a\n    class name automatically, which would remove the need to\n    include ',
    code('class-name: applescript;'),
    ' each time.)'
  ]),
  update(datetime('2012-02-22')('23:11:00')(Symbol.for('America/Los_Angeles')))([
    p([
      'Providing a ',
      code('class-name'),
      ' in the, ahem, class name is\n      no longer necessary (apparently I made a convincing argument).\n      This is now sufficient:'
    ]),
    code$002Dblock(Symbol.for('html'))('\n      <pre class="brush:applescript"></pre>\n    ')
  ]),
  p([
    'Note that including ',
    code('ruler: true;'),
    ' will have no effect.\n    Since AppleScript is displayed in a variable-width font, the ruler\n    serves no purpose. The ruler is still inserted into the page\n    (unless ',
    code('ruler: false;'),
    ' is included), but is hidden\n    by the style sheet.'
  ])
];
export default {
  ['id']: 15,
  ['slug']: 'applescript-syntax-highlighting',
  ['title']: 'AppleScript syntax highlighting',
  ['datetime']: datetime('2009-06-04')('03:12:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    'applescript',
    'javascript',
    'mac-os-x',
    'syntaxhighlighter'
  ],
  ['body']: body
};
