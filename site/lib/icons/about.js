import {path} from "../elements.js";
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
  not: b => !b,
  reject: predicate => Prelude.filter(x => !predicate(x))
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, map, not, reject} = Prelude;
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
