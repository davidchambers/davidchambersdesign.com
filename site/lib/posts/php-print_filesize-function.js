import {
  canonicalize$002Dchildren,
  text,
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
import { code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const excerpt = [
  p([
    'Recently I\'ve been on a drive to eliminate dependencies from my\n    code and other areas, such as blog posts. For those who create\n    content for the Web, a reasonably common task is to provide links\n    to files that can be downloaded. It is considered good practice\n    to include an indication of a file\'s size; for example: ',
    a('/favicon.ico')('favicon.ico'),
    ' (3 KB).'
  ]),
  p([
    'As I was about to hard-code a file\'s size into a blog post\n    recently, I thought to myself: ',
    strong('Will I remember to\n    update this if the file\'s size changes?'),
    ' More importantly,\n    should I be required to remember such things? The answer,\n    of course, is no. I set about writing a function that would\n    allow the file\'s size to be displayed dynamically.'
  ])
];
const body = [
  ...excerpt,
  code$002Dblock('php')(`<?php

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
`),
  p(['Example usage:']),
  code$002Dblock('php')(`<a href="favicon.ico">favicon.ico</a><?php print_filesize('favicon.ico'); ?>
`),
  p([
    'This gives: ',
    a('/favicon.ico')('favicon.ico'),
    ' ',
    span({ class: 'filesize' })('(\u22481.1 kB)'),
    '. By default, the function\n    wraps the file\'s size in a ',
    code('span'),
    ' element with ',
    code('class="filesize"'),
    ', to provide a hook for styling\n    if required.'
  ])
];
export default {
  id: 17,
  slug: 'php-print_filesize-function',
  title: 'PHP print_filesize function',
  datetime: datetime('2009-06-10')('21:17:00')('Pacific/Auckland'),
  tags: [
    'best-practice',
    'php'
  ],
  body: body
};
