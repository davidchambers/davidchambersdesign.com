import {code, em, p, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
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
  _apply: name => args => target => target[name].apply(target, args),
  apply: f => args => f.apply(null, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => Prelude.filter(x => Prelude.not(f(x))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const body = [p(["Sometimes we require users to log in to a WordPress site in order\n    to access ", em(["front-end"]), " functionality hidden from guests.\n    In such instances, we can simply provide a standard login link:"]), code$002Dblock("php")(`<a href="<?php bloginfo('url'); ?>/wp-login.php">log in</a>
`), p(["While this gets the job done, it takes users to the dashboard after\n    they have logged in: they must then click on a link to return to the\n    front-end, at which point an additional click may be required to get\n    them back to the page they were viewing. Since WordPress 2.6.2 it has\n    been possible to circumvent this round trip from ", strong(["origin"]), "\n    to ", strong(["wp-login.php"]), " to ", strong(["wp-admin/"]), " to ", strong(["/"]), " and finally back to ", strong(["origin"]), " by\n    including a value for ", code(["redirect_to"]), " in the href:"]), code$002Dblock("php")(`<a href="<?php bloginfo('url'); ?>/wp-login.php?redirect_to=<?php echo urlencode($_SERVER['REQUEST_URI']); ?>">log in</a>
`), p(["The above returns users to their starting point after they've\n    logged in."])];
export default {
  id: 7,
  slug: "wordpress-login-redirect",
  title: ["WordPress login redirect"],
  datetime: datetime("2009-03-01")("03:01:00")("Pacific/Auckland"),
  tags: ["php", "wordpress"],
  body
};
