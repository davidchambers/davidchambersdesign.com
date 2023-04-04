import {p, strong} from "../elements.js";
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
