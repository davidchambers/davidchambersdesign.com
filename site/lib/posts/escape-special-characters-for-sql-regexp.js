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
import { code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p([
    'While using the ',
    a('http://search.mtg-apps.com/')('MTG card search'),
    '\n    that I\'ve been developing recently, I encountered an error that MySQL\n    reported as follows:'
  ]),
  code$002Dblock(Symbol.for('plain-text'))(`Got error 'repetition-operator operand invalid' from regexp
`),
  p([
    'The problem resulted from an unescaped ',
    strong('{'),
    ' being\n    passed to MySQL\'s REGEXP function. Because this character has a\n    special meaning in regex, it must be escaped when it is being\n    used literally within a string. This is done by preceding it\n    with a backslash (',
    strong('\\'),
    ').'
  ]),
  excerpt([p([
      'Developers will be familiar with using PHP\'s ',
      a('http://php.net/manual/en/function.mysql-real-escape-string.php')('mysql_real_escape_string'),
      '\n      to escape problematic characters before submitting a query.\n      When the query in question involves MySQL\'s REGEXP function,\n      however, we need to go one step further and escape regex\'s\n      special characters.'
    ])]),
  p(['I had a look on php.net to see whether such a function exists.\n    Having failed to find one there, I did a Google search but again\n    came away empty-handed. I wrote my own function for the job, and\n    thought I\'d share it in case others encounter the same problem:']),
  code$002Dblock(Symbol.for('php'))(`<?php

function mysql_regexp_escape_string($string)
{
    $special_chars = array('*', '.', '?', '+', '[', ']', '(', ')', '{', '}', '^', '$', '|', '\\\\');
    $replacements = array();

    foreach ($special_chars as $special_char)
    {
        $replacements[] = '\\\\' . $special_char;
    }

    return str_replace($special_chars, $replacements, $string);
}

?>
`),
  p(['It is quite possible that a solution to this problem already exists.\n    If this is the case, I am eager to know about it.'])
];
export default {
  ['id']: 5,
  ['slug']: 'escape-special-characters-for-sql-regexp',
  ['title']: 'Escape special characters for SQL REGEXP',
  ['datetime']: datetime('2009-01-10')('22:21:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    'php',
    'sql'
  ],
  ['body']: body
};
