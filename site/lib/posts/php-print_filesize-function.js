import {a, code, p, span, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["Recently I've been on a drive to eliminate dependencies from my\n    code and other areas, such as blog posts. For those who create\n    content for the Web, a reasonably common task is to provide links\n    to files that can be downloaded. It is considered good practice\n    to include an indication of a file's size; for example: ", a({
  href: "/favicon.ico"
})(["favicon.ico"]), " (3 KB)."]), p(["As I was about to hard-code a file's size into a blog post\n    recently, I thought to myself: ", strong(["Will I remember to\n    update this if the file's size changes?"]), " More importantly,\n    should I be required to remember such things? The answer,\n    of course, is no. I set about writing a function that would\n    allow the file's size to be displayed dynamically."])];
const body = [...excerpt, code$002Dblock("php")(`<?php

/**
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

?>
`), p(["Example usage:"]), code$002Dblock("php")(`<a href="favicon.ico">favicon.ico</a><?php print_filesize('favicon.ico'); ?>
`), p(["This gives: ", a({
  href: "/favicon.ico"
})(["favicon.ico"]), " ", span({
  class: "filesize"
})(["(≈1.1 kB)"]), ". By default,\n    the function wraps the file's size in a ", code(["span"]), "\n    element with ", code(["class=\"filesize\""]), ", to provide\n    a hook for styling if required."])];
export default {
  id: 17,
  slug: "php-print_filesize-function",
  title: ["PHP print_filesize function"],
  datetime: datetime("2009-06-10 21:17:00 (Pacific/Auckland)"),
  tags: ["best-practice", "php"],
  body
};
