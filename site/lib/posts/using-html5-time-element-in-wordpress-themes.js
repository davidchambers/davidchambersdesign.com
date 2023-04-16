import {p, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["I've begun retrofitting this site with HTML5 elements. ", "I'm thoroughly enjoying the process (I love meaningful markup)."]), p(["One of the first HTML5 elements I've introduced is the ", strong(["time"]), " element which, through its ", strong(["datetime"]), " ", "attribute, provides a machine-readable version of dates and times."]), code$002Dblock("html")("<time datetime=\"2009-11-01T16:41:53+13:00\">1 November 2009</time>\n  "), p(["I wrote a function to generate the machine-readable dates and times ", "for blog comments."]), code$002Dblock("php")("<?php\n\n/**\n * echoes comment's date and time in format 2009-11-01T03:41:53+13:00\n */\nfunction comment_datetime()\n{\n    $comment = get_comment($comment);\n    $local = strtotime($comment->comment_date);\n    $gmt = strtotime($comment->comment_date_gmt);\n    $seconds = abs($local - $gmt);\n    $hours = (int) ($seconds / 3600);\n    $minutes = (int) (($seconds - $hours * 3600) / 60);\n    $output = get_comment_time('Y-m-d\\TH:i:s');\n\n    if ($local == $gmt)\n        $output .= 'Z';\n    else\n        $output .= ($local > $gmt ? '+' : '-')\n                . str_pad($hours, 2, '0', STR_PAD_LEFT) . ':'\n                . str_pad($minutes, 2, '0', STR_PAD_LEFT);\n\n    echo $output;\n}\n\n?>\n  "), p(["While looping through comments in your WordPress theme, ", "call the above function to print a valid datetime string."]), code$002Dblock("php")("<time datetime=\"<?php comment_datetime(); ?>\">\n  ")];
export default {
  id: 31,
  slug: "using-html5-time-element-in-wordpress-themes",
  title: ["Using HTML5 time element in WordPress themes"],
  datetime: datetime("2009-11-02 02:04:00 (Pacific/Auckland)"),
  tags: ["html5", "php", "wordpress"],
  body
};
