import S from "sanctuary";
const Prelude = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => Prelude["match'"](type)(_ => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude.filter(x => Prelude.not(predicate(x))),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const simplify = paths => Prelude.equals([])(paths) ? [] : (() => {
  const [head, ...tail] = paths;
  const [prev, path] = reduce(([prev, path]) => curr => Prelude.equals("M")(curr[0]) ? Prelude.equals("M")(prev[0]) || Prelude.equals("m")(prev[0]) ? [curr, path] : [curr, [...path, prev]] : (Prelude.equals("M")(prev[0]) || Prelude.equals("m")(prev[0])) && Prelude.equals("m")(curr[0]) ? [[prev[0], [prev[1][0] + curr[1][0], prev[1][1] + curr[1][1]]], path] : [curr, [...path, prev]])([head, []])(tail);
  return [...path, prev];
})();
const render = x => S.unwords(S.join(simplify(x)));
const $21E6 = x => ["m", [-x, 0]];
const $21E8 = x => ["m", [+x, 0]];
const $21E7 = y => ["m", [0, -y]];
const $21E9 = y => ["m", [0, +y]];
const $2190 = x => ["h", -x];
const $2192 = x => ["h", +x];
const $2191 = y => ["v", -y];
const $2193 = y => ["v", +y];
export {render, $21E6, $21E8, $21E7, $21E9, $2190, $2192, $2191, $2193};
