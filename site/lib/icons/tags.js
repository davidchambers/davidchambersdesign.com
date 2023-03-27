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
const stroke = [$21E8(2), $21E9(0), $2192(4), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2190(1), $2193(1), $2190(1), $2193(1), $2190(1), $2193(1), $2190(1), $2193(1), $2190(1), $2193(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(4), $2192(2), $2191(2)];
const fill = [$21E8(1), $21E9(1), $2192(5), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2190(1), $2193(1), $2190(1), $2193(1), $2190(1), $2193(1), $2190(1), $2193(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(5)];
const text = [$21E8(6), $21E9(5), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2192(1), $2193(1), $2190(1), $2193(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2190(1), $2191(1), $2192(1), $2191(1)];
const sticker = [$21E8(3), $21E9(2), $2192(1), $2193(3), $2190(1), $2191(3), $21E6(1), $21E9(1), $2192(3), $2193(1), $2190(3), $2191(1)];
const string = [$21E8(0), $21E9(0), $2192(1), $2193(2), $2192(2), $2193(2), $2192(1), $2191(1), $2190(2), $2191(2), $2190(2), $2191(1)];
const tags = [path({
  fill: "#741",
  d: render(stroke)
}), path({
  fill: "#feb",
  d: render(fill)
}), path({
  fill: "#c93",
  d: render(text)
}), path({
  fill: "#fff",
  d: render(sticker)
}), path({
  fill: "#333",
  d: render(string)
})];
export default tags;
