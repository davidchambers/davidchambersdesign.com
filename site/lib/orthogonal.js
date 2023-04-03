import S from "sanctuary";
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
const simplify = paths => equals([])(paths) ? [] : (() => {
  const [head, ...tail] = paths;
  const [prev, path] = reduce(([prev, path]) => curr => equals("M")(curr[0]) ? equals("M")(prev[0]) || equals("m")(prev[0]) ? [curr, path] : [curr, [...path, prev]] : (equals("M")(prev[0]) || equals("m")(prev[0])) && equals("m")(curr[0]) ? [[prev[0], [prev[1][0] + curr[1][0], prev[1][1] + curr[1][1]]], path] : [curr, [...path, prev]])([head, []])(tail);
  return [...path, prev];
})();
const render = $ => S.unwords(S.join(simplify($)));
const $21E6 = x => ["m", [-x, 0]];
const $21E8 = x => ["m", [+x, 0]];
const $21E7 = y => ["m", [0, -y]];
const $21E9 = y => ["m", [0, +y]];
const $2190 = x => ["h", -x];
const $2192 = x => ["h", +x];
const $2191 = y => ["v", -y];
const $2193 = y => ["v", +y];
export {render, $21E6, $21E8, $21E7, $21E9, $2190, $2192, $2191, $2193};
