import {a, code, p} from "../elements.js";
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
const body = [p(["When I decided to write my own WordPress theme, I thought a\n    good approach would be to duplicate the default theme and go\n    from there. Since that day I have rewritten much of the code.\n    The loop in the index.php file, however, remains unchanged.\n    The loop looks like this:"]), code$002Dblock("php")(`if (have_posts()) :
    while (have_posts()) : the_post();
        // code
    endwhile;
endif;
`), p(["As well as displaying the three most recent posts on the\n    home page, I wanted to display links to slightly older\n    posts on the sidebar. I discovered a WpRecipes post on ", a({
  href: "http://www.wprecipes.com/avinash-asked-how-to-use-two-different-wordpress-loops"
})(["using two different WordPress loops"]), " which suggests\n    adding the following line of code just before the loop:"]), code$002Dblock("php")(`query_posts('showposts=5&offset=3');
`), p(["The ", code(["offset"]), " ensures that posts do not appear\n    in both places."])];
export default {
  id: 12,
  slug: "looping-more-than-once-with-the-wordpress-loop",
  title: ["Looping more than once with the WordPress loop"],
  datetime: datetime("2009-04-17")("00:34:00")("Pacific/Auckland"),
  tags: ["php", "wordpress"],
  body
};
