import {path} from "../elements.js";
import {render, $21E6, $21E8, $21E7, $21E9, $2190, $2192, $2191, $2193} from "../orthogonal.js";
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
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const stroke = [$21E8(5), $21E9(0), $2192(6), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2191(1), $2192(1), $2191(1), $2192(1), $2193(7), $2190(7), $2191(1), $2192(1), $2191(1), $2192(1), $2191(1), $2190(1), $2191(1), $2190(4), $2193(1), $2190(1), $2193(1), $2190(1), $2193(4), $2192(1), $2193(1), $2192(1), $2193(1), $2192(4), $2191(1), $2192(1), $2191(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2190(1), $2193(1), $2190(1), $2193(1), $2190(1), $2193(1), $2190(6), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(6), $2192(1), $2191(1), $2192(1), $2191(1), $2192(1), $2191(1), $2192(1), $2191(1), $2192(1), $2191(1)];
const fill = [$21E8(5), $21E9(1), $2192(6), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2191(1), $2192(1), $2193(4), $2190(4), $2191(1), $2192(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(4), $2193(1), $2190(1), $2193(1), $2190(1), $2193(1), $2190(1), $2193(4), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(4), $2191(1), $2192(1), $2191(1), $2192(1), $2193(1), $2192(1), $2193(1), $2190(1), $2193(1), $2190(1), $2193(1), $2190(6), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(6), $2192(1), $2191(1), $2192(1), $2191(1), $2192(1), $2191(1), $2192(1), $2191(1)];
const flushcache = [path({
  fill: "#391",
  d: render(stroke)
}), path({
  fill: "#6c4",
  d: render(fill)
})];
export default flushcache;
