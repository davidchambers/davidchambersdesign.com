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
const render$002Dpath = d => [path({
  ["fill-rule"]: "evenodd",
  fill: "#000",
  d: render([$21E8(0), $21E9(0), ...d])
})];
const date$002D0 = render$002Dpath([$2192(4), $2193(7), $2190(4), $2191(7), $21E8(1), $21E9(1), $2192(2), $2193(5), $2190(2), $2191(5)]);
const date$002D1 = render$002Dpath([$2192(2), $2193(7), $2190(1), $2191(6), $2190(1), $2191(1)]);
const date$002D2 = render$002Dpath([$2192(4), $2193(4), $2190(3), $2193(2), $2192(3), $2193(1), $2190(4), $2191(4), $2192(3), $2191(2), $2190(3), $2191(1)]);
const date$002D3 = render$002Dpath([$2192(4), $2193(7), $2190(4), $2191(1), $2192(3), $2191(2), $2190(3), $2191(1), $2192(3), $2191(2), $2190(3), $2191(1)]);
const date$002D4 = render$002Dpath([$2192(1), $2193(3), $2192(2), $2191(3), $2192(1), $2193(7), $2190(1), $2191(3), $2190(3), $2191(4)]);
const date$002D5 = render$002Dpath([$2192(4), $2193(1), $2190(3), $2193(2), $2192(3), $2193(4), $2190(4), $2191(1), $2192(3), $2191(2), $2190(3), $2191(4)]);
const date$002D6 = render$002Dpath([$2192(4), $2193(1), $2190(3), $2193(2), $2192(3), $2193(4), $2190(4), $2191(7), $21E8(1), $21E9(4), $2192(2), $2193(2), $2190(2), $2191(2)]);
const date$002D7 = render$002Dpath([$2192(4), $2193(7), $2190(1), $2191(6), $2190(3), $2191(1)]);
const date$002D8 = render$002Dpath([$2192(4), $2193(7), $2190(4), $2191(7), $21E8(1), $21E9(1), $2192(2), $2193(2), $2190(2), $2191(2), $21E8(0), $21E9(3), $2192(2), $2193(2), $2190(2), $2191(2)]);
const date$002D9 = render$002Dpath([$2192(4), $2193(7), $2190(4), $2191(1), $2192(3), $2191(2), $2190(3), $2191(4), $21E8(1), $21E9(1), $2192(2), $2193(2), $2190(2), $2191(2)]);
export {date$002D0, date$002D1, date$002D2, date$002D3, date$002D4, date$002D5, date$002D6, date$002D7, date$002D8, date$002D9};
