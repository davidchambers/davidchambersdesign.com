import S from "sanctuary";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, flip, map, not} = Prelude;
const simplify = paths => paths.length === 0 ? [] : (() => {
  const [head, ...tail] = paths;
  const [prev, path] = Prelude._apply("reduce")([([prev, path], curr) => curr[0] === "M" ? prev[0] === "M" || prev[0] === "m" ? [curr, path] : [curr, [...path, prev]] : (prev[0] === "M" || prev[0] === "m") && curr[0] === "m" ? [[prev[0], [prev[1][0] + curr[1][0], prev[1][1] + curr[1][1]]], path] : [curr, [...path, prev]], [head, []]])(tail);
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
