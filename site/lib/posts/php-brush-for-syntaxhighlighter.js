import {a, code, li, p, p$0027, strong, ul} from "../elements.js";
import {captioned$002Dimages, code$002Dblock, update} from "../components.js";
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
const excerpt = [p(["Alex Gorbatchev's ", a({
  href: "http://alexgorbatchev.com/wiki/SyntaxHighlighter"
})(["SyntaxHighlighter"]), "\n    is a well-written bundle which enables syntax highlighting of\n    code via JavaScript. More than twenty languages are supported\n    \"out of the box\", and brushes (JavaScript files containing\n    language-specific regular expressions) can be created to\n    support additional languages."]), p(["Unfortunately, however, several of the brushes that come bundled\n    with SyntaxHighlighter are far from perfect. Have a look at the\n    bundled PHP brush in action below."]), captioned$002Dimages([{
  alt: `Screenshot of PHP code highlighted by SyntaxHighlighter's PHP brush
`,
  src: "/images/posts/16/bundled-php-brush-in-action.png",
  caption: ["Screenshot of bundled PHP brush in action"]
}])];
const body = [...excerpt, p(["I would give this brush 6/10. Here are its deficiencies,\n    as I see them:"]), ul([li(["PHP opening and closing tags are not captured"]), li(["Variables within double-quoted strings are not captured"]), li(["Numerical values are not captured"]), li(["Only a fraction of PHP's function names are recognized"]), li(["Custom function names are not captured"])]), p(["I've created an ", a({
  href: "/downloads/shBrushPhp.js"
})(["improved PHP brush"]), "\n    which remedies these deficiencies. It uses the following class names: ", strong(["phptag"]), " for opening and closing PHP tags, including short\n    tags; ", strong(["comments"]), " for both single- and multi-line comments; ", strong(["string"]), " for both single- and double-quoted strings; ", strong(["varinstr"]), " for variables within double-quoted strings; ", strong(["numval"]), " for numerical values; ", strong(["function"]), " for ", a({
  href: "http://www.php.net/quickref.php"
})(["documented PHP functions"]), "; ", strong(["custfunc"]), " for custom (user-defined) functions; and ", strong(["constant"]), ", ", strong(["keyword"]), ", and ", strong(["variable"]), " for exactly what you'd expect."]), update(datetime("2009-08-16")("02:33:00")("Pacific/Auckland"))([p(["Until this point I have had a class name added to each\n      div.syntaxhighlighter element to allow code to be coloured\n      in a language-specific manner. This approach fails, however,\n      when a highlighted block features two languages (PHP and HTML,\n      for example). CSS selectors cannot differentiate between\n      two code elements with the same class name in the same\n      div.syntaxhighlighter element."]), p(["Each language, therefore, needs to use its own class names.\n      It is easy to differentiate ", code(["code.php-comment"]), " from ", code(["code.xml-comment"]), ", allowing PHP comments to be styled\n      differently from XML comments if desired."]), p(["The updated class names are ", strong(["php-tag"]), ", ", strong(["php-comment"]), ", ", strong(["php-string"]), ", ", strong(["php-varinstr"]), ", ", strong(["php-numval"]), ", ", strong(["php-function"]), ", ", strong(["php-custfunc"]), ", ", strong(["php-constant"]), ", ", strong(["php-keyword"]), ", and ", strong(["php-variable"]), "."])]), code$002Dblock("php")(`<?php

'single-quoted string';

"double-quoted string";

// single-quoted string with literal dollar sign
'fruit smoothie: $5.50';

// double-quoted string containing a variable
"fruit smoothie: $cost";

// numerical value
$cost = 5.50;

// a few common function calls
empty($variable);
isset($variable);
strlen($variable);
strrev($variable);

// a call to a custom function
is_ready_to_order($customer);

?>
`), p$0027({
  class: "caption"
})(["Live rendering of improved PHP brush"])];
export default {
  id: 16,
  slug: "php-brush-for-syntaxhighlighter",
  title: ["PHP brush for SyntaxHighlighter"],
  datetime: datetime("2009-06-08")("17:00:00")("Pacific/Auckland"),
  tags: ["javascript", "php", "syntaxhighlighter"],
  body
};
