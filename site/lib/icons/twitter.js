import {linearGradient, path, stop} from "../elements.js";
import {render, $21E8, $21E9, $2190, $2192, $2191, $2193} from "../orthogonal.js";
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
  apply: args => target => target.apply(target, args),
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
const a = rx$002Dry => angle => large$002Darc$002Dflag => sweep$002Dflag => dx$002Ddy => ["a", rx$002Dry, angle, large$002Darc$002Dflag, sweep$002Dflag, dx$002Ddy];
const twitter = [linearGradient({
  id: "gradient",
  x1: "50%",
  y1: "0%",
  x2: "50%",
  y2: "100%"
})([stop({
  ["stop-color"]: "#96ecfd",
  offset: "0%"
}), stop({
  ["stop-color"]: "#14dff0",
  offset: "100%"
})]), path({
  stroke: "#fff",
  ["stroke-width"]: 1,
  fill: "url(#gradient)",
  d: render([$21E8(3), $21E9(3), a([2, 2])(0)(0)(1)([4, 0]), $2193(1), $2192(4), a([2, 2])(0)(0)(1)([0, 4]), $2190(4), $2193(2), a([1, 1])(0)(0)(0)([1, 1]), $2192(3), a([2, 2])(0)(0)(1)([0, 4]), $2190(4), a([4, 4])(0)(0)(1)([-4, -4]), $2191(8)])
})];
export default twitter;
