import {path} from "../elements.js";
import {render, $21E6, $21E8, $21E7, $21E9, $2190, $2192, $2191, $2193} from "../orthogonal.js";
const Prelude = {
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
const {_apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const stroke = [$21E8(0), $21E9(2), $2192(16), $2193(12), $2190(16), $2191(12)];
const fill = [$21E8(2), $21E9(3), $2192(12), $2193(1), $2192(1), $2193(9), $2190(14), $2191(9), $2192(1), $2191(1)];
const flap = [$21E8(2), $21E9(4), $2192(1), $2193(2), $2192(2), $2193(2), $2192(2), $2193(2), $2192(2), $2191(2), $2192(2), $2191(2), $2192(2), $2191(2), $2192(1), $2193(1), $2190(2), $2193(2), $2190(2), $2193(2), $2190(4), $2191(2), $2190(2), $2191(2), $2190(2), $2191(1)];
const seam = [$21E8(6), $21E9(8), $2190(1), $2193(2), $2190(2), $2193(2), $2190(2), $2193(1), $2192(1), $2191(2), $2192(2), $2191(2), $2192(2), $2191(1), $21E8(4), $21E9(0), $2192(1), $2193(2), $2192(2), $2193(2), $2192(2), $2193(1), $2190(1), $2191(2), $2190(2), $2191(2), $2190(2), $2191(1)];
const contact = [path({
  fill: "#963",
  d: render(stroke)
}), path({
  fill: "#feb",
  d: render(fill)
}), path({
  fill: "#741",
  d: render(flap)
}), path({
  fill: "#b85",
  d: render(seam)
})];
export default contact;
