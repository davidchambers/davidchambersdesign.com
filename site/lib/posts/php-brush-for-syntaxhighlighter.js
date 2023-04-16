import {p$0027, p, ul, li, a, code, strong} from "../elements.js";
import {captioned$002Dimages, code$002Dblock, update} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["Alex Gorbatchev's ", a({
  href: "http://alexgorbatchev.com/wiki/SyntaxHighlighter"
})(["SyntaxHighlighter"]), " ", "is a well-written bundle which enables syntax highlighting of ", "code via JavaScript. More than twenty languages are supported ", "\"out of the box\", and brushes (JavaScript files containing ", "language-specific regular expressions) can be created to ", "support additional languages."]), p(["Unfortunately, however, several of the brushes that come bundled ", "with SyntaxHighlighter are far from perfect. Have a look at the ", "bundled PHP brush in action below."]), captioned$002Dimages([{
  alt: "Screenshot of PHP code highlighted by SyntaxHighlighter's PHP brush\n    ",
  src: "/images/posts/16/bundled-php-brush-in-action.png",
  caption: ["Screenshot of bundled PHP brush in action"]
}])];
const body = [...excerpt, p(["I would give this brush 6/10. Here are its deficiencies, ", "as I see them:"]), ul([li(["PHP opening and closing tags are not captured"]), li(["Variables within double-quoted strings are not captured"]), li(["Numerical values are not captured"]), li(["Only a fraction of PHP's function names are recognized"]), li(["Custom function names are not captured"])]), p(["I've created an ", a({
  href: "/downloads/shBrushPhp.js"
})(["improved PHP brush"]), " ", "which remedies these deficiencies. It uses the following class names: ", strong(["phptag"]), " for opening and closing PHP tags, including short ", "tags; ", strong(["comments"]), " for both single- and multi-line comments; ", strong(["string"]), " for both single- and double-quoted strings; ", strong(["varinstr"]), " for variables within double-quoted strings; ", strong(["numval"]), " for numerical values; ", strong(["function"]), " for ", a({
  href: "http://www.php.net/quickref.php"
})(["documented PHP functions"]), "; ", strong(["custfunc"]), " for custom (user-defined) functions; and ", strong(["constant"]), ", ", strong(["keyword"]), ", and ", strong(["variable"]), " for exactly what you'd expect."]), update(datetime("2009-08-16 02:33:00 (Pacific/Auckland)"))([p(["Until this point I have had a class name added to each ", "div.syntaxhighlighter element to allow code to be coloured ", "in a language-specific manner. This approach fails, however, ", "when a highlighted block features two languages (PHP and HTML, ", "for example). CSS selectors cannot differentiate between ", "two code elements with the same class name in the same ", "div.syntaxhighlighter element."]), p(["Each language, therefore, needs to use its own class names. ", "It is easy to differentiate ", code(["code.php-comment"]), " from ", code(["code.xml-comment"]), ", allowing PHP comments to be styled ", "differently from XML comments if desired."]), p(["The updated class names are ", strong(["php-tag"]), ", ", strong(["php-comment"]), ", ", strong(["php-string"]), ", ", strong(["php-varinstr"]), ", ", strong(["php-numval"]), ", ", strong(["php-function"]), ", ", strong(["php-custfunc"]), ", ", strong(["php-constant"]), ", ", strong(["php-keyword"]), ", and ", strong(["php-variable"]), "."])]), code$002Dblock("php")("<?php\n\n'single-quoted string';\n\n\"double-quoted string\";\n\n// single-quoted string with literal dollar sign\n'fruit smoothie: $5.50';\n\n// double-quoted string containing a variable\n\"fruit smoothie: $cost\";\n\n// numerical value\n$cost = 5.50;\n\n// a few common function calls\nempty($variable);\nisset($variable);\nstrlen($variable);\nstrrev($variable);\n\n// a call to a custom function\nis_ready_to_order($customer);\n\n?>\n  "), p$0027({
  class: "caption"
})(["Live rendering of improved PHP brush"])];
export default {
  id: 16,
  slug: "php-brush-for-syntaxhighlighter",
  title: ["PHP brush for SyntaxHighlighter"],
  datetime: datetime("2009-06-08 17:00:00 (Pacific/Auckland)"),
  tags: ["javascript", "php", "syntaxhighlighter"],
  body
};
