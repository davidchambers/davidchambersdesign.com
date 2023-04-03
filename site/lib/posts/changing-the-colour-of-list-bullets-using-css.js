import {a, code, h3$0027, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["<<"]: rhs => lhs => lhs << rhs,
      [">>"]: rhs => lhs => lhs >> rhs,
      [">>>"]: rhs => lhs => lhs >>> rhs,
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  apply: f => args => f.apply(null, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter($ => not(f($))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const body = [p(["So, you're about to style an unordered list of some sort..."]), code$002Dblock("html")(`<h1>TXJS 2011 Speakers</h1>
<ul>
  <li>Brendan Eich</li>
  <li>Alex Russell</li>
  <li>Douglas Crockford</li>
  <li>Paul Irish</li>
</ul>
`), p(["You've decided upon hanging square bullets in a light grey –\n    nothing too distracting..."]), code$002Dblock("css")(`ul {
  list-style: square outside;
  color: #ccc;
}
li {
  color: #000;
}
`), p(["This should do the trick, but doesn't for some reason! How the heck\n    does one target the bullets and only the bullets? As far as I know\n    it's not possible."]), h3$0027({
  id: "conventional-hack"
})(["Conventional hack"]), code$002Dblock("html")(`<h1>TXJS 2011 Speakers</h1>
<ul>
  <li><span>Brendan Eich</span></li>
  <li><span>Alex Russell</span></li>
  <li><span>Douglas Crockford</span></li>
  <li><span>Paul Irish</span></li>
</ul>

<style>
  ul {
    list-style: square outside;
    color: #ccc;
  }
  li > span {
    color: #000;
  }
</style>
`), p(["This gets the job done, but those ", code(["span"]), "s are ugly –\n    there are ways to achieve the desired visual effect without\n    hacking the markup."]), h3$0027({
  id: "background-image-technique"
})(["Background image technique"]), code$002Dblock("css")(`ul {
  list-style: none;
}
li {
  margin-left: -12px;
  background: url(bullet.png) no-repeat 0;
  text-indent: 12px;
}
`), p(["This requires very little CSS. To avoid incurring the overhead\n    of an extra HTTP request, one could Base64-encode the image in a ", a({
  href: "http://en.wikipedia.org/wiki/Data_URI_scheme#CSS"
})(["data URI"]), "."]), h3$0027({
  id: "pseudo-element-technique"
})(["Pseudo-element technique"]), code$002Dblock("css")(`ul {
  list-style: none;
}
li {
  position: relative;
}
li:before {
  position: absolute;
  top: 8px;
  margin: 8px 0 0 -12px;
    /* accommodate Camino */
    vertical-align: middle;
    display: inline-block;
  width: 4px;
  height: 4px;
  background: #ccc;
  content: "";
}
`), p(["So it's possible to fashion square bullets of any colour\n    with just a handful of straightforward declarations. Nice!"]), p(["Prefer round bullets? No problem. :)"]), code$002Dblock("css")(`...
-webkit-border-radius: 2px;
-moz-border-radius: 2px;
border-radius: 2px;
...
`)];
export default {
  id: 83,
  slug: "changing-the-colour-of-list-bullets-using-css",
  title: ["Changing the colour of list bullets using CSS"],
  datetime: datetime("2011-04-13")("17:30:00")("America/Los_Angeles"),
  tags: ["css", "meaningful-markup"],
  body
};
