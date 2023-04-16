import {p, a, code, span, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["Recently I've been on a drive to eliminate dependencies from my ", "code and other areas, such as blog posts. For those who create ", "content for the Web, a reasonably common task is to provide links ", "to files that can be downloaded. It is considered good practice ", "to include an indication of a file's size; for example: ", a({
  href: "/favicon.ico"
})(["favicon.ico"]), " (3 KB)."]), p(["As I was about to hard-code a file's size into a blog post ", "recently, I thought to myself: ", strong(["Will I remember to ", "update this if the file's size changes?"]), " More importantly, ", "should I be required to remember such things? The answer, ", "of course, is no. I set about writing a function that would ", "allow the file's size to be displayed dynamically."])];
const body = [...excerpt, code$002Dblock("php")("<?php\n\n/**\n * echoes nicely formatted filesize\n * @param string $filename\n * @param string $before\n * @param string $after\n */\nfunction print_filesize($filename, $before = ' <span class=\"filesize\">(', $after = ')</span>')\n{\n    if (file_exists($filename))\n    {\n        $size = filesize($filename);\n        $unit = 'B';\n\n        if (intval($size/(1024*1024*1024)))\n        {\n            $size = number_format(($size/(1024*1024*1024)), 1);\n            $unit = 'GB';\n        }\n        elseif (intval($size/(1024*1024)))\n        {\n            $size = number_format(($size/(1024*1024)), 1);\n            $unit = 'MB';\n        }\n        elseif (intval($size/1024))\n        {\n            $size = number_format(($size/1024), 1);\n            $unit = 'KB';\n        }\n\n        $approx = $unit == 'B' ? '' : '≈' ;\n\n        echo \"{$before}{$approx}{$size} {$unit}{$after}\";\n    }\n}\n\n?>\n  "), p(["Example usage:"]), code$002Dblock("php")("<a href=\"favicon.ico\">favicon.ico</a><?php print_filesize('favicon.ico'); ?>\n  "), p(["This gives: ", a({
  href: "/favicon.ico"
})(["favicon.ico"]), " ", span({
  class: "filesize"
})(["(≈1.1 kB)"]), ". By default, ", "the function wraps the file's size in a ", code(["span"]), " ", "element with ", code(["class=\"filesize\""]), ", to provide ", "a hook for styling if required."])];
export default {
  id: 17,
  slug: "php-print_filesize-function",
  title: ["PHP print_filesize function"],
  datetime: datetime("2009-06-10 21:17:00 (Pacific/Auckland)"),
  tags: ["best-practice", "php"],
  body
};
