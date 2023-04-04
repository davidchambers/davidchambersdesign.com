import {a, code, p, span, strong} from "../elements.js";
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
  datetime: datetime("2009-06-10")("21:17:00")("Pacific/Auckland"),
  tags: ["best-practice", "php"],
  body
};
