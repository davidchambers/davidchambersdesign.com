import {path} from "../elements.js";
import {render, $21E8, $21E7, $21E9, $2190, $2192, $2191, $2193} from "../orthogonal.js";
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
const skin = [$21E8(3), $21E9(4), $2192(10), $2193(6), $2190(1), $2193(3), $2190(1), $2193(1), $2190(1), $2193(1), $2190(4), $2191(1), $2190(1), $2191(1), $2190(1), $2191(3), $2190(1), $2191(6)];
const features = [$21E8(2), $21E9(9), $2192(1), $2193(4), $2192(2), $2193(2), $2192(6), $2191(2), $2192(2), $2191(4), $2192(1), $2193(1), $2190(2), $2193(4), $2190(2), $2193(2), $2190(4), $2191(2), $2190(2), $2191(4), $2190(2), $2191(1), $21E8(3), $21E7(1), $2192(2), $2193(1), $2190(2), $2191(1), $21E8(2), $21E9(3), $2192(2), $2193(1), $2190(2), $2191(1), $21E8(2), $21E7(3), $2192(2), $2193(1), $2190(2), $2191(1)];
const hat$002Dstripes$002Ddark = [$21E8(6), $21E9(0), $2192(4), $2193(2), $2192(3), $2193(1), $2190(1), $2191(2), $2190(8), $2193(2), $2190(1), $2191(1), $2192(3), $2191(2), $21E8(0), $21E9(2), $2192(4), $2193(2), $2192(3), $2193(2), $2192(1), $2191(1), $2190(2), $2191(2), $2190(8), $2193(2), $2190(2), $2193(1), $2192(1), $2191(2), $2192(3), $2191(2), $21E8(0), $21E9(2), $2192(4), $2193(2), $2192(3), $2193(3), $2192(1), $2191(2), $2190(2), $2191(2), $2190(8), $2193(2), $2190(2), $2193(2), $2192(1), $2191(3), $2192(3), $2191(2)];
const hat$002Dstripes$002Dlight = [$21E8(6), $21E9(1), $2192(4), $2193(2), $2192(3), $2193(1), $2190(1), $2191(2), $2190(8), $2193(2), $2190(1), $2191(1), $2192(3), $2191(2), $21E8(0), $21E9(2), $2192(4), $2193(2), $2192(3), $2193(2), $2192(1), $2191(1), $2190(2), $2191(2), $2190(8), $2193(2), $2190(2), $2193(1), $2192(1), $2191(2), $2192(3), $2191(2)];
const about = [path({
  fill: "#edb",
  d: render(skin)
}), path({
  fill: "#963",
  d: render(features)
}), path({
  fill: "#432",
  d: render(hat$002Dstripes$002Ddark)
}), path({
  fill: "#ccc",
  d: render(hat$002Dstripes$002Dlight)
})];
export default about;
