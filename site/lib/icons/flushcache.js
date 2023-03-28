import {path} from "../elements.js";
import {render, $21E6, $21E8, $21E7, $21E9, $2190, $2192, $2191, $2193} from "../orthogonal.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude.filter(x => !predicate(x)),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {_apply, apply, construct, match, id, const: const$, not, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
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
