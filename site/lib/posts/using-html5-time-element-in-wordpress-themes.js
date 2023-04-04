import {p, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["I've begun retrofitting this site with HTML5 elements.\n    I'm thoroughly enjoying the process (I love meaningful markup)."]), p(["One of the first HTML5 elements I've introduced is the ", strong(["time"]), " element which, through its ", strong(["datetime"]), "\n    attribute, provides a machine-readable version of dates and times."]), code$002Dblock("html")(`<time datetime="2009-11-01T16:41:53+13:00">1 November 2009</time>
`), p(["I wrote a function to generate the machine-readable dates and times\n    for blog comments."]), code$002Dblock("php")(`<?php

/**
 * echoes comment's date and time in format 2009-11-01T03:41:53+13:00
 */
function comment_datetime()
{
    $comment = get_comment($comment);
    $local = strtotime($comment->comment_date);
    $gmt = strtotime($comment->comment_date_gmt);
    $seconds = abs($local - $gmt);
    $hours = (int) ($seconds / 3600);
    $minutes = (int) (($seconds - $hours * 3600) / 60);
    $output = get_comment_time('Y-m-d\\TH:i:s');

    if ($local == $gmt)
        $output .= 'Z';
    else
        $output .= ($local > $gmt ? '+' : '-')
                . str_pad($hours, 2, '0', STR_PAD_LEFT) . ':'
                . str_pad($minutes, 2, '0', STR_PAD_LEFT);

    echo $output;
}

?>
`), p(["While looping through comments in your WordPress theme,\n    call the above function to print a valid datetime string."]), code$002Dblock("php")(`<time datetime="<?php comment_datetime(); ?>">
`)];
export default {
  id: 31,
  slug: "using-html5-time-element-in-wordpress-themes",
  title: ["Using HTML5 time element in WordPress themes"],
  datetime: datetime("2009-11-02")("02:04:00")("Pacific/Auckland"),
  tags: ["html5", "php", "wordpress"],
  body
};
