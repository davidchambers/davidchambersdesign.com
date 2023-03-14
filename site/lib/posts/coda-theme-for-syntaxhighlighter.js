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
  code$002Dblock,
  update
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  p([a('#setup')('Skip to setup instructions')]),
  excerpt([
    p([
      'It\'s no secret \u2013 I love ',
      a('http://www.panic.com/coda/')('Coda'),
      '!\n             It\'s a pleasure to use. ',
      strong('It looks so damn good.'),
      ' When I\n             started using ',
      a('http://alexgorbatchev.com/wiki/SyntaxHighlighter')('SyntaxHighlighter'),
      ' I set out to create a Coda theme. Thankfully,\n             the good folks at Panic had done the ground work for me. All I had\n             to do was create a style sheet that would make my code snippets look\n             as sexy online as they do in my text editor.'
    ]),
    p(['Or so I thought.'])
  ]),
  p(['As I delved deeper, it became apparent that realising my goal would\n        require plenty of effort. In order for SyntaxHighlighter to work its\n        magic it requires at least one brush and at least one theme. A brush\n        is a JavaScript file that contains regular expressions to match the\n        syntactical features of a particular language. A theme, as you might\n        expect, is a CSS file which controls the way SyntaxHighlighter\'s\n        output is displayed. At first glance, brushes and themes appear to\n        be loosely coupled, allowing programmers to create language-specific\n        brushes, and designers to create themes that can work with any number\n        of brushes.']),
  p([
    'It soon became apparent that brushes and themes are not so loosely\n        coupled after all. For example, the bundled HTML brush does not\n        include the angled brackets when highlighting a tag. Coda does. ',
    strong('So, the theme itself is accompanied by a number of customized\n        brushes.')
  ]),
  h3('Supported languages'),
  p([
    'The theme currently supports a handful of languages: CSS, HTML/XML,\n        JavaScript, PHP, and Python. These are the languages with which I\'m\n        familiar. ',
    strong('If you\'d like to see another language supported,\n        please let me know.')
  ]),
  h4('CSS'),
  code$002Dblock(Symbol.for('css'))('\n     p.error.message   { border: 1px solid #c00; background-color: #fcc; }\n     p.info.message    { border: 1px solid #fc3; background-color: #ffc; }\n     p.success.message { border: 1px solid #0b0; background-color: #cfc; }\n     '),
  h4('HTML'),
  code$002Dblock(Symbol.for('html'))('\n     <form id="searchform" action="http://davidchambersdesign.com/" method="get">\n         <div>\n             <label for="s" class="structural">search davidchambersdesign.com</label>\n             <input type="text" id="s" name="s" value="" class="text" />\n             <input type="submit" id="searchsubmit" value="Search" />\n         </div>\n     </form><!--/searchform-->\n     '),
  h4('JavaScript'),
  code$002Dblock(Symbol.for('javascript'))('\n     // simulate textarea:focus\n     document.observe(\'dom:loaded\', function () {\n         $$(\'textarea\').each(function (e) {\n             Event.observe(e, \'focus\', function (event) {\n                 $(e.parentNode).addClassName(\'focus\')\n             });\n             Event.observe(e, \'blur\', function (event) {\n                 $(e.parentNode).removeClassName(\'focus\')\n             });\n         });\n     });\n     '),
  h4('PHP'),
  code$002Dblock(Symbol.for('php'))('\n     /**\n      * echoes nicely formatted filesize\n      * @param string $filename\n      * @param string $before\n      * @param string $after\n      */\n     function print_filesize($filename, $before = \' <span class="filesize">(\', $after = \')</span>\')\n     {\n         if (file_exists($filename))\n         {\n             $size = filesize($filename);\n             $unit = \'B\';\n\n             if (intval($size/(1024*1024*1024)))\n             {\n                 $size = number_format(($size/(1024*1024*1024)), 1);\n                 $unit = \'GB\';\n             }\n             elseif (intval($size/(1024*1024)))\n             {\n                 $size = number_format(($size/(1024*1024)), 1);\n                 $unit = \'MB\';\n             }\n             elseif (intval($size/1024))\n             {\n                 $size = number_format(($size/1024), 1);\n                 $unit = \'KB\';\n             }\n\n             $approx = $unit == \'B\' ? \'\' : \'\u2248\' ;\n\n             echo "{$before}{$approx}{$size} {$unit}{$after}";\n         }\n     }\n     '),
  p(['Note that the variable names in the double-quoted string above are\n        a different colour from the rest of the string. Nice!']),
  h4('Python'),
  code$002Dblock(Symbol.for('python'))('\n     # function accepts any number of arguments since *all_sales is a tuple\n     def daily_sales_total(*all_sales):\n         total = 0.0\n         for each_sale in all_sales:\n             total += float(each_sale)\n         return total\n     '),
  h3('Including non-HTML code in HTML snippets'),
  p(['The Coda theme, like Coda itself, can handle non-HTML code inside\n        HTML snippets.']),
  h4$0027({ [Symbol.for('id')]: 'css-inside-html' })('CSS inside HTML'),
  p([
    'For HTML snippets that contain some CSS, use ',
    code('<pre class="brush: css; html-script: true;"></pre>'),
    '.'
  ]),
  code$002Dblock(Symbol.for('html'))('\n     <head>\n         <title>Coda theme for SyntaxHighlighter</title>\n         <style type="text/css">\n             p {\n                 margin: 0.75em 0;\n                 font: 1.0em/1.5em "Lucida Grande", Helvetica, Arial, sans-serif;\n                 padding: 0.75em;\n             }\n             p.js-off {\n                 border: 1px solid #c00; /* red */\n                 background-color: #fcc;\n             }\n             p.js-on {\n                 border: 1px solid #0b0; /* green */\n                 background-color: #cfc;\n             }\n         </style>\n     </head>\n     '),
  h4$0027({ [Symbol.for('id')]: 'javascript-inside-html' })('JavaScript inside HTML'),
  p([
    'For HTML snippets that contain some JavaScript, use ',
    code('<pre class="brush: javascript; html-script: true;"></pre>'),
    '.'
  ]),
  code$002Dblock(Symbol.for('html'))('\n     <body>\n         <p class="js-off">\n             JavaScript is currently <strong>disabled</strong>.\n         </p>\n         <p class="js-on" style="display:none">\n             JavaScript is currently <strong>enabled</strong>.\n         </p>\n         <script type="text/javascript">\n             google.load(\'prototype\', \'1.6\');\n         </script>\n         <script type="text/javascript">\n             document.observe(\'dom:loaded\', function () {\n                 $$(\'.js-off\').invoke(\'hide\');\n                 $$(\'.js-on\').invoke(\'show\');\n             });\n         </script>\n     </body>\n     '),
  h4$0027({ [Symbol.for('id')]: 'php-inside-html' })('PHP inside HTML'),
  p([
    'For HTML snippets that contain some PHP, use ',
    code('<pre class="brush: php; html-script: true;"></pre>'),
    '.'
  ]),
  code$002Dblock(Symbol.for('php'))('\n     <ul>\n     <?php foreach ($names as $name): ?>\n         <li><?php echo $name; ?></li>\n     <?php endforeach; ?>\n     </ul>\n     '),
  h3('Limitations and known issues'),
  p(['Unfortunately, the Coda brush does not perform quite as well as the\n        text editor from which it gets its name. The failings are as follows:']),
  ul([
    li([p([
        'It is not possible to mix more than one additional language\n                  with HTML. While it ',
        em('is'),
        ' possible to mix CSS with\n                  HTML, or JavaScript with HTML, it is not possible to mix\n                  both CSS ',
        em('and'),
        ' JavaScript with HTML. This is a\n                  limitation of SyntaxHighlighter itself.'
      ])]),
    li([p(['When mixing CSS or JavaScript with HTML, the style/script\n                  opening tags are given the class \'script\' rather than being\n                  processed in the same manner as the rest of the HTML code.\n                  As a result these tags appear in red, the colour used for\n                  PHP tags. (If no workaround exists I\'m going to suggest that\n                  Alex make the necessary changes to ensure that style/script\n                  opening tags are treated normally.)'])]),
    li([
      p([
        'In order to correctly colour all HTML tags, each ',
        code('<'),
        '\n                  that is not part of a string is considered to be part of a tag.\n                  This causes incorrect highlighting, as can be seen in this\n                  example:'
      ]),
      code$002Dblock(Symbol.for('html'))('\n               <script type="text/javascript">\n                   function isLarger(x, y) {\n                       return (x > y);\n                   }\n               </script>\n               ')
    ])
  ]),
  h3$0027({ [Symbol.for('id')]: 'setup' })('Setup'),
  ol([
    li([
      'Download and unzip ',
      a('/downloads/coda-theme-for-syntaxhighlighter.zip')('coda-theme-for-syntaxhighlighter.zip'),
      '.'
    ]),
    li([
      'Open ',
      strong('example.html'),
      ' to confirm that everything\n             is working correctly.'
    ]),
    li([
      'Upload ',
      strong('styles/shThemeCoda.css'),
      ' to your\n             SyntaxHighlighter ',
      strong('styles'),
      ' directory.'
    ]),
    li([
      'Upload ',
      strong('styles/bg.png'),
      ' to your SyntaxHighlighter ',
      strong('styles'),
      ' directory.'
    ]),
    li([
      'Upload the brushes in ',
      strong('scripts/'),
      ' to your\n             SyntaxHighlighter ',
      strong('scripts'),
      ' directory, replacing\n             the existing CSS, JavaScript, PHP, Python, and XML brushes.\n             Three versions of each brush are included: ',
      strong('.js'),
      ', ',
      strong('.min.js'),
      ' (minified), and ',
      strong('.min.js.gz'),
      '\n             (minified and gzipped). Use whichever version suits you best.'
    ]),
    li(['Add a link to the Coda theme wherever you link to shCore.css.\n             If you\'re using the standard setup, this will be in the head\n             section of the document.'])
  ]),
  update(datetime('2009-08-24')('22:51:00')(Symbol.for('Pacific/Auckland')))([p(['Coda theme has been updated so that comments are now italicized\n             (as they are in Coda). XML brush for Coda theme now applies the\n             correct class name ("xml-comment") to HTML comments.'])])
];
export default {
  ['id']: 22,
  ['slug']: 'coda-theme-for-syntaxhighlighter',
  ['title']: 'Coda theme for SyntaxHighlighter',
  ['datetime']: datetime('2009-08-16')('08:53:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    'coda',
    'css',
    'javascript',
    'prototype',
    'syntaxhighlighter'
  ],
  ['body']: body
};
