import {p, a, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["Developers will be familiar with using PHP's ", a({
  href: "http://php.net/manual/en/function.mysql-real-escape-string.php"
})(["mysql_real_escape_string"]), " ", "to escape problematic characters before submitting a query. ", "When the query in question involves MySQL's REGEXP function, ", "however, we need to go one step further and escape regex's ", "special characters."])];
const body = [p(["While using the ", a({
  href: "http://search.mtg-apps.com/"
})(["MTG card search"]), " ", "that I've been developing recently, I encountered an error that ", "MySQL reported as follows:"]), code$002Dblock("plain-text")("Got error 'repetition-operator operand invalid' from regexp\n  "), p(["The problem resulted from an unescaped ", strong(["{"]), " being ", "passed to MySQL's REGEXP function. Because this character has a ", "special meaning in regex, it must be escaped when it is being ", "used literally within a string. This is done by preceding it ", "with a backslash (", strong(["\\"]), ")."]), ...excerpt, p(["I had a look on php.net to see whether such a function exists. ", "Having failed to find one there, I did a Google search but again ", "came away empty-handed. I wrote my own function for the job, and ", "thought I'd share it in case others encounter the same problem:"]), code$002Dblock("php")("<?php\n\nfunction mysql_regexp_escape_string($string)\n{\n    $special_chars = array('*', '.', '?', '+', '[', ']', '(', ')', '{', '}', '^', '$', '|', '\\\\');\n    $replacements = array();\n\n    foreach ($special_chars as $special_char)\n    {\n        $replacements[] = '\\\\' . $special_char;\n    }\n\n    return str_replace($special_chars, $replacements, $string);\n}\n\n?>\n  "), p(["It is quite possible that a solution to this problem already exists. ", "If this is the case, I am eager to know about it."])];
export default {
  id: 5,
  slug: "escape-special-characters-for-sql-regexp",
  title: ["Escape special characters for SQL REGEXP"],
  datetime: datetime("2009-01-10 22:21:00 (Pacific/Auckland)"),
  tags: ["php", "sql"],
  body
};
