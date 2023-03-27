import {path} from "../elements.js";
import {render, $21E6, $21E8, $21E7, $21E9, $2190, $2192, $2191, $2193} from "../orthogonal.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, construct, flip, map, not} = Prelude;
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
