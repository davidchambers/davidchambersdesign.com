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
import {
  captioned$002Dimages,
  code$002Dblock,
  update,
  $2014
} from '../components.js';
import datetime from '../datetime.js';
const excerpt = [
  p([
    'I\'ve been using Alex Gorbatchev\'s ',
    a({ href: 'http://alexgorbatchev.com/wiki/SyntaxHighlighter' })(['SyntaxHighlighter']),
    '\n    to syntactically display code of various languages for several\n    months now. When I decided to post an AppleScript snippet, however,\n    I realised that I was out of luck. SyntaxHighlighter does not\n    include an AppleScript "brush", and a quick flick through the ',
    a({ href: 'http://alexgorbatchev.com/forums/' })(['SyntaxHighlighter forums']),
    ' did not bring me any joy.'
  ]),
  p([
    strong(['How hard could it be to write a brush for AppleScript?']),
    ',\n    I wondered. The handy guide to ',
    a({ href: 'http://alexgorbatchev.com/wiki/SyntaxHighlighter:Brushes:Custom' })(['developing a custom brush']),
    ' got me started, and I was soon\n    busy trying to encapsulate AppleScript\'s syntax',
    $2014,
    'along with its\n    keywords and countless words and phrases with special meanings',
    $2014,
    'into a handful of regular expressions.'
  ])
];
const body = [
  p([a({ href: '#setup' })(['Skip to setup instructions'])]),
  ...excerpt,
  p([
    'Having created the brush (that\'s SyntaxHighlighter lingo for\n    the JavaScript file containing the language-specific regular\n    expressions), I proceeded to create a style sheet that would\n    display AppleScript snippets on the Web as they appear on OS X.\n    You can judge my success by comparing the three snippets below:\n    the first is a screenshot of Script Editor\'s rendering; the\n    second is a screenshot of the same snippet as it appears in my\n    browser; and the final snippet is text rendered by ',
    em(['your']),
    '\n    browser.'
  ]),
  captioned$002Dimages([
    {
      alt: '',
      src: '/images/posts/15/script-editor-syntax-highlighting.png',
      caption: ['Screenshot of Script Editor\'s rendering of an AppleScript snippet']
    },
    {
      alt: '',
      src: '/images/posts/15/syntaxhighlighter-applescript-theme.png',
      caption: ['Screenshot of snippet styled by AppleScript theme for SyntaxHighlighter']
    }
  ]),
  code$002Dblock('applescript')(`#!/usr/bin/osascript

(*
    This handler determines whether someone is happy.
    It's actually just a good way to showcase AppleScript syntax highlighting using Alex Gorbatchev's SyntaxHighlighter.
    (* Hey, nested comments. Woot! *)
*)

on user_is_happy()
    -- determine which application is currently frontmost
    tell application "System Events" to set app_list to the name of application processes whose frontmost is true
    set front_app to the first item of app_list
    tell application "Finder"
        activate
        display dialog ¬
            "Enter your name" default answer "" buttons {"Cancel", "OK"} ¬
            default button 2 with icon note
        set user_name to the text returned of the result
        (* The word "return" in the line below should not be in bold. The regex does its best to determine whether the word is being used in a return statement or as a line return. *)
        display dialog "Hello, " & user_name & "!" & return & return & ¬
            "Are you happy?" buttons {"Yes", "No"} with icon note
        set is_happy to the button returned of the result
    end tell
    -- activate the application that was frontmost initially
    tell application front_app to activate
    return is_happy = "Yes" -- this time the word "return" should be in bold
end user_is_happy

if user_is_happy() then
    say "Woohoo!" using "Alex"
else
    repeat 3 times
        beep
        delay 0.5
    end repeat
end if
`),
  p$0027({ class: 'caption' })(['Live rendering of AppleScript snippet']),
  h3$0027({ id: 'setup' })(['Setup']),
  p(['To add AppleScript syntax highlighting to your own site or blog,\n    do the following:']),
  ol([
    li([p([
        'Download ',
        a({ href: 'http://alexgorbatchev.com/wiki/SyntaxHighlighter' })(['SyntaxHighlighter']),
        ', and follow the setup instructions.'
      ])]),
    li([p([
        'Download ',
        a({ href: 'https://bitbucket.org/davidchambers/applescript-theme/raw/default/shBrushAppleScript.js' })(['AppleScript brush']),
        ',\n        and upload it to your SyntaxHighlighter ',
        strong(['scripts']),
        '\n        directory.'
      ])]),
    li([p([
        'Download ',
        a({ href: 'https://bitbucket.org/davidchambers/applescript-theme/raw/default/shThemeAppleScript.css' })(['AppleScript theme']),
        ',\n        and upload it to your SyntaxHighlighter ',
        strong(['styles']),
        '\n        directory.'
      ])]),
    li([
      p(['Include the brush like so:']),
      code$002Dblock('html')(`<script src="/path/to/scripts/shCore.js"></script>
<script src="/path/to/scripts/shBrushAppleScript.js"></script>
<script>SyntaxHighlighter.all()</script>
`)
    ])
  ]),
  h3$0027({ id: 'usage' })(['Usage']),
  p([
    'To have SyntaxHighlighter parse a block of AppleScript,\n    wrap the code in ',
    code(['pre']),
    ' tags like so:'
  ]),
  code$002Dblock('html')(`<pre class="brush: applescript; class-name: applescript;"></pre>
`),
  p([
    code(['brush: applescript;']),
    ' tells SyntaxHighlighter to\n    use the AppleScript brush for the text within the pre tag. ',
    code(['class-name: applescript;']),
    ' tells SyntaxHighlighter\n    to add the class name "applescript" to the container div\n    that is inserted into the page. (Hopefully I\'m able to\n    convince Alex that the brush name should be added as a\n    class name automatically, which would remove the need to\n    include ',
    code(['class-name: applescript;']),
    ' each time.)'
  ]),
  update(datetime('2012-02-22')('23:11:00')('America/Los_Angeles'))([
    p([
      'Providing a ',
      code(['class-name']),
      ' in the, ahem, class name\n      is no longer necessary (apparently I made a convincing argument).\n      This is now sufficient:'
    ]),
    code$002Dblock('html')(`<pre class="brush:applescript"></pre>
`)
  ]),
  p([
    'Note that including ',
    code(['ruler: true;']),
    ' will have no effect.\n    Since AppleScript is displayed in a variable-width font, the ruler\n    serves no purpose. The ruler is still inserted into the page\n    (unless ',
    code(['ruler: false;']),
    ' is included), but is hidden\n    by the style sheet.'
  ])
];
export default {
  id: 15,
  slug: 'applescript-syntax-highlighting',
  title: ['AppleScript syntax highlighting'],
  datetime: datetime('2009-06-04')('03:12:00')('Pacific/Auckland'),
  tags: [
    'applescript',
    'javascript',
    'mac-os-x',
    'syntaxhighlighter'
  ],
  body: body
};
