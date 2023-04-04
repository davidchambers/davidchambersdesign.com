import S from "sanctuary";
const equals = this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that;
const reduce = f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y);
const simplify = paths => equals([])(paths) ? [] : (() => {
  const [head, ...tail] = paths;
  const [prev, path] = reduce(([prev, path]) => curr => equals("M")(curr[0]) ? equals("M")(prev[0]) || equals("m")(prev[0]) ? [curr, path] : [curr, [...path, prev]] : (equals("M")(prev[0]) || equals("m")(prev[0])) && equals("m")(curr[0]) ? [[prev[0], [prev[1][0] + curr[1][0], prev[1][1] + curr[1][1]]], path] : [curr, [...path, prev]])([head, []])(tail);
  return [...path, prev];
})();
const render = $ => S.unwords(S.join(simplify($)));
const $21E6 = x => ["m", [-x, 0]];
const $21E8 = x => ["m", [+x, 0]];
const $21E7 = y => ["m", [0, -y]];
const $21E9 = y => ["m", [0, +y]];
const $2190 = x => ["h", -x];
const $2192 = x => ["h", +x];
const $2191 = y => ["v", -y];
const $2193 = y => ["v", +y];
export {render, $21E6, $21E8, $21E7, $21E9, $2190, $2192, $2191, $2193};
