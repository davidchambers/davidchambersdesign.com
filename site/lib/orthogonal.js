import sanctuary from "sanctuary";
const id = x => x;
const equals = this$ => that => (function () {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return (function () {
        switch (globalThis.Object.prototype.toString.call(that)) {
          case "[object Array]":
            return this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]));
          default:
            return false;
        }
      })();
    default:
      return this$ === that;
  }
})();
const reduce = f => y => xs => (function () {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.reduce((y, x) => f(y)(x), y);
    default:
      return xs["fantasy-land/reduce"]((y, x) => f(y)(x), y);
  }
})();
const chain = f => x => (function () {
  switch (globalThis.Object.prototype.toString.call(x)) {
    case "[object Array]":
      return x.flatMap(x => f(x));
    case "[object Function]":
      return y => x(f(y))(y);
    default:
      return x["fantasy-land/chain"](f);
  }
})();
const join = chain(id);
const S = sanctuary.unchecked;
const simplify = paths => equals([])(paths) ? [] : (() => {
  const [head, ...tail] = paths;
  const [prev, path] = reduce(function ([prev, path]) {
    return function (curr) {
      return equals("M")(curr[0]) ? equals("M")(prev[0]) || equals("m")(prev[0]) ? [curr, path] : [curr, [...path, prev]] : (equals("M")(prev[0]) || equals("m")(prev[0])) && equals("m")(curr[0]) ? [[prev[0], [prev[1][0] + curr[1][0], prev[1][1] + curr[1][1]]], path] : [curr, [...path, prev]];
    };
  })([head, []])(tail);
  return [...path, prev];
})();
const render = $ => S.unwords(($ => join(simplify($)))($));
const $21E6 = x => ["m", [-x, 0]];
const $21E8 = x => ["m", [x, 0]];
const $21E7 = y => ["m", [0, -y]];
const $21E9 = y => ["m", [0, y]];
const $2190 = x => ["h", -x];
const $2192 = x => ["h", x];
const $2191 = y => ["v", -y];
const $2193 = y => ["v", y];
export {render, $21E6, $21E8, $21E7, $21E9, $2190, $2192, $2191, $2193};
