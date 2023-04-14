import {p, a, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["Developers will be familiar with using PHP's ", a({
  href: "http://php.net/manual/en/function.mysql-real-escape-string.php"
})(["mysql_real_escape_string"]), "\n    to escape problematic characters before submitting a query.\n    When the query in question involves MySQL's REGEXP function,\n    however, we need to go one step further and escape regex's\n    special characters."])];
const body = [p(["While using the ", a({
  href: "http://search.mtg-apps.com/"
})(["MTG card search"]), "\n    that I've been developing recently, I encountered an error that\n    MySQL reported as follows:"]), code$002Dblock("plain-text")(`Got error 'repetition-operator operand invalid' from regexp
`), p(["The problem resulted from an unescaped ", strong(["{"]), " being\n    passed to MySQL's REGEXP function. Because this character has a\n    special meaning in regex, it must be escaped when it is being\n    used literally within a string. This is done by preceding it\n    with a backslash (", strong(["\\"]), ")."]), ...excerpt, p(["I had a look on php.net to see whether such a function exists.\n    Having failed to find one there, I did a Google search but again\n    came away empty-handed. I wrote my own function for the job, and\n    thought I'd share it in case others encounter the same problem:"]), code$002Dblock("php")(`<?php

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
`), p(["It is quite possible that a solution to this problem already exists.\n    If this is the case, I am eager to know about it."])];
export default {
  id: 5,
  slug: "escape-special-characters-for-sql-regexp",
  title: ["Escape special characters for SQL REGEXP"],
  datetime: datetime("2009-01-10 22:21:00 (Pacific/Auckland)"),
  tags: ["php", "sql"],
  body
};
