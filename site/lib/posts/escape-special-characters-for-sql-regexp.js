import {a, p, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const {XOR, OR, subtract, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, empty, reduce, reduceRight, filter, reject, map, flip, of, chain, contains} = {
  XOR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
      default:
        return lhs ^ rhs;
    }
  })(),
  OR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
      default:
        return lhs | rhs;
    }
  })(),
  subtract: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
      default:
        return lhs - rhs;
    }
  })(),
  apply: f => args => f.apply(null, args),
  construct: constructor => args => globalThis.Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[globalThis.Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : globalThis.Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  empty: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return [];
      case "Object":
        return {};
      case "String":
        return "";
      case "Set":
      case "Map":
        return globalThis.Reflect.construct(typeRep, [[]]);
      default:
        return typeRep["fantasy-land/empty"]();
    }
  })(),
  reduce: f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter(x => !f(x)),
  map: f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  of: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return globalThis.Array.of;
      case "Function":
        return x => y => x;
      case "Set":
        return x => globalThis.Reflect.construct(typeRep, [[x]]);
      default:
        return typeRep["fantasy-land/of"];
    }
  })(),
  chain: f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f),
  contains: this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these)
};
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
  datetime: datetime("2009-01-10")("22:21:00")("Pacific/Auckland"),
  tags: ["php", "sql"],
  body
};
