import {linearGradient, path, stop} from "../elements.js";
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
