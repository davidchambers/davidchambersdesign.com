import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock, update} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b,
  reject: predicate => Prelude.filter(x => !predicate(x))
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, map, not, reject} = Prelude;
const excerpt = [p(["It's no secret – I love ", a({
  href: "http://www.panic.com/coda/"
})(["Coda"]), "! It's a pleasure\n    to use. ", strong(["It looks so damn good."]), " When I started using ", a({
  href: "http://alexgorbatchev.com/wiki/SyntaxHighlighter"
})(["SyntaxHighlighter"]), " I set out to create a Coda theme. Thankfully,\n    the good folks at Panic had done the ground work for me. All I had to\n    do was create a style sheet that would make my code snippets look as\n    sexy online as they do in my text editor."]), p(["Or so I thought."])];
const body = [p([a({
  href: "#setup"
})(["Skip to setup instructions"])]), ...excerpt, p(["As I delved deeper, it became apparent that realising my goal would\n    require plenty of effort. In order for SyntaxHighlighter to work its\n    magic it requires at least one brush and at least one theme. A brush\n    is a JavaScript file that contains regular expressions to match the\n    syntactical features of a particular language. A theme, as you might\n    expect, is a CSS file which controls the way SyntaxHighlighter's\n    output is displayed. At first glance, brushes and themes appear to\n    be loosely coupled, allowing programmers to create language-specific\n    brushes, and designers to create themes that can work with any number\n    of brushes."]), p(["It soon became apparent that brushes and themes are not so loosely\n    coupled after all. For example, the bundled HTML brush does not\n    include the angled brackets when highlighting a tag. Coda does. ", strong(["So, the theme itself is accompanied by a number of customized\n    brushes."])]), h3(["Supported languages"]), p(["The theme currently supports a handful of languages: CSS, HTML/XML,\n    JavaScript, PHP, and Python. These are the languages with which I'm\n    familiar. ", strong(["If you'd like to see another language supported,\n    please let me know."])]), h4(["CSS"]), code$002Dblock("css")(`p.error.message   { border: 1px solid #c00; background-color: #fcc; }
p.info.message    { border: 1px solid #fc3; background-color: #ffc; }
p.success.message { border: 1px solid #0b0; background-color: #cfc; }
`), h4(["HTML"]), code$002Dblock("html")(`<form id="searchform" action="http://davidchambersdesign.com/" method="get">
    <div>
        <label for="s" class="structural">search davidchambersdesign.com</label>
        <input type="text" id="s" name="s" value="" class="text" />
        <input type="submit" id="searchsubmit" value="Search" />
    </div>
</form><!--/searchform-->
`), h4(["JavaScript"]), code$002Dblock("javascript")(`// simulate textarea:focus
document.observe('dom:loaded', function () {
    $$('textarea').each(function (e) {
        Event.observe(e, 'focus', function (event) {
            $(e.parentNode).addClassName('focus')
        });
        Event.observe(e, 'blur', function (event) {
            $(e.parentNode).removeClassName('focus')
        });
    });
});
`), h4(["PHP"]), code$002Dblock("php")(`/**
 * echoes nicely formatted filesize
 * @param string $filename
 * @param string $before
 * @param string $after
 */
function print_filesize($filename, $before = ' <span class="filesize">(', $after = ')</span>')
{
    if (file_exists($filename))
    {
        $size = filesize($filename);
        $unit = 'B';

        if (intval($size/(1024*1024*1024)))
        {
            $size = number_format(($size/(1024*1024*1024)), 1);
            $unit = 'GB';
        }
        elseif (intval($size/(1024*1024)))
        {
            $size = number_format(($size/(1024*1024)), 1);
            $unit = 'MB';
        }
        elseif (intval($size/1024))
        {
            $size = number_format(($size/1024), 1);
            $unit = 'KB';
        }

        $approx = $unit == 'B' ? '' : '≈' ;

        echo "{$before}{$approx}{$size} {$unit}{$after}";
    }
}
`), p(["Note that the variable names in the double-quoted string above are\n    a different colour from the rest of the string. Nice!"]), h4(["Python"]), code$002Dblock("python")(`# function accepts any number of arguments since *all_sales is a tuple
def daily_sales_total(*all_sales):
    total = 0.0
    for each_sale in all_sales:
        total += float(each_sale)
    return total
`), h3(["Including non-HTML code in HTML snippets"]), p(["The Coda theme, like Coda itself, can handle non-HTML code inside\n    HTML snippets."]), h4$0027({
  id: "css-inside-html"
})(["CSS inside HTML"]), p(["For HTML snippets that contain some CSS, use ", code([`<pre class="brush: css; html-script: true;"></pre>`]), "."]), code$002Dblock("html")(`<head>
    <title>Coda theme for SyntaxHighlighter</title>
    <style type="text/css">
        p {
            margin: 0.75em 0;
            font: 1.0em/1.5em "Lucida Grande", Helvetica, Arial, sans-serif;
            padding: 0.75em;
        }
        p.js-off {
            border: 1px solid #c00; /* red */
            background-color: #fcc;
        }
        p.js-on {
            border: 1px solid #0b0; /* green */
            background-color: #cfc;
        }
    </style>
</head>
`), h4$0027({
  id: "javascript-inside-html"
})(["JavaScript inside HTML"]), p(["For HTML snippets that contain some JavaScript, use ", code([`<pre class="brush: javascript; html-script: true;"></pre>`]), "."]), code$002Dblock("html")(`<body>
    <p class="js-off">
        JavaScript is currently <strong>disabled</strong>.
    </p>
    <p class="js-on" style="display:none">
        JavaScript is currently <strong>enabled</strong>.
    </p>
    <script type="text/javascript">
        google.load('prototype', '1.6');
    </script>
    <script type="text/javascript">
        document.observe('dom:loaded', function () {
            $$('.js-off').invoke('hide');
            $$('.js-on').invoke('show');
        });
    </script>
</body>
`), h4$0027({
  id: "php-inside-html"
})(["PHP inside HTML"]), p(["For HTML snippets that contain some PHP, use ", code([`<pre class="brush: php; html-script: true;"></pre>`]), "."]), code$002Dblock("php")(`<ul>
<?php foreach ($names as $name): ?>
    <li><?php echo $name; ?></li>
<?php endforeach; ?>
</ul>
`), h3(["Limitations and known issues"]), p(["Unfortunately, the Coda brush does not perform quite as well as the\n    text editor from which it gets its name. The failings are as follows:"]), ul([li([p(["It is not possible to mix more than one additional language\n        with HTML. While it ", em(["is"]), " possible to mix CSS with\n        HTML, or JavaScript with HTML, it is not possible to mix\n        both CSS ", em(["and"]), " JavaScript with HTML. This is a\n        limitation of SyntaxHighlighter itself."])]), li([p(["When mixing CSS or JavaScript with HTML, the style/script\n        opening tags are given the class 'script' rather than being\n        processed in the same manner as the rest of the HTML code.\n        As a result these tags appear in red, the colour used for\n        PHP tags. (If no workaround exists I'm going to suggest that\n        Alex make the necessary changes to ensure that style/script\n        opening tags are treated normally.)"])]), li([p(["In order to correctly colour all HTML tags, each ", code(["<"]), "\n        that is not part of a string is considered to be part of a tag.\n        This causes incorrect highlighting, as can be seen in this\n        example:"]), code$002Dblock("html")(`<script type="text/javascript">
    function isLarger(x, y) {
        return (x > y);
    }
</script>
`)])]), h3$0027({
  id: "setup"
})(["Setup"]), ol([li(["Download and unzip ", a({
  href: "/downloads/coda-theme-for-syntaxhighlighter.zip"
})(["coda-theme-for-syntaxhighlighter.zip"]), "."]), li(["Open ", strong(["example.html"]), " to confirm that everything\n      is working correctly."]), li(["Upload ", strong(["styles/shThemeCoda.css"]), " to your\n      SyntaxHighlighter ", strong(["styles"]), " directory."]), li(["Upload ", strong(["styles/bg.png"]), " to your SyntaxHighlighter ", strong(["styles"]), " directory."]), li(["Upload the brushes in ", strong(["scripts/"]), " to your\n      SyntaxHighlighter ", strong(["scripts"]), " directory, replacing\n      the existing CSS, JavaScript, PHP, Python, and XML brushes.\n      Three versions of each brush are included: ", strong([".js"]), ", ", strong([".min.js"]), " (minified), and ", strong([".min.js.gz"]), "\n      (minified and gzipped). Use whichever version suits you best."]), li(["Add a link to the Coda theme wherever you link to shCore.css.\n      If you're using the standard setup, this will be in the head\n      section of the document."])]), update(datetime("2009-08-24")("22:51:00")("Pacific/Auckland"))([p([`Coda theme has been updated so that comments are now italicized
      (as they are in Coda). XML brush for Coda theme now applies the
      correct class name ("xml-comment") to HTML comments.`])])];
export default {
  id: 22,
  slug: "coda-theme-for-syntaxhighlighter",
  title: ["Coda theme for SyntaxHighlighter"],
  datetime: datetime("2009-08-16")("08:53:00")("Pacific/Auckland"),
  tags: ["coda", "css", "javascript", "prototype", "syntaxhighlighter"],
  body
};
