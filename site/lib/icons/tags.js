import {path} from "../elements.js";
import {render, $21E6, $21E8, $21E9, $2190, $2192, $2191, $2193} from "../orthogonal.js";
const {XOR, OR, subtract, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, empty, reduce, reduceRight, filter, reject, map, flip, of, chain, contains} = {
  XOR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
      default:
        return lhs ^ rhs;
    }
  })(),
  OR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
      default:
        return lhs | rhs;
    }
  })(),
  subtract: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
      default:
        return lhs - rhs;
    }
  })(),
  apply: f => args => f.apply(null, args),
  construct: constructor => args => globalThis.Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[globalThis.Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : globalThis.Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  empty: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return [];
      case "Object":
        return {};
      case "String":
        return "";
      case "Set":
      case "Map":
        return globalThis.Reflect.construct(typeRep, [[]]);
      default:
        return typeRep["fantasy-land/empty"]();
    }
  })(),
  reduce: f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter(x => !f(x)),
  map: f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  of: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return globalThis.Array.of;
      case "Function":
        return x => y => x;
      case "Set":
        return x => globalThis.Reflect.construct(typeRep, [[x]]);
      default:
        return typeRep["fantasy-land/of"];
    }
  })(),
  chain: f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f),
  contains: this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these)
};
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
