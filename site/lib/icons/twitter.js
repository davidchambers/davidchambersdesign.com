import {linearGradient, path, stop} from "../elements.js";
import {render, $21E6, $21E8, $21E7, $21E9, $2190, $2192, $2191, $2193} from "../orthogonal.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, map, not} = Prelude;
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
