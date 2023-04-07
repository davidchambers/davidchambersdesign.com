const id = x => x;
const equals = this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that;
const Nothing = {
  [Symbol.for("tag")]: "Nothing",
  ["fantasy-land/map"]: f => Nothing
};
const Just = value => ({
  [Symbol.for("tag")]: "Just",
  value,
  ["fantasy-land/map"]: f => Just(f(value))
});
const $match = default$ => cases => maybe => Object.hasOwn(cases, maybe[Symbol.for("tag")]) ? (() => {
  switch (maybe[Symbol.for("tag")]) {
    case "Nothing":
      return cases.Nothing;
    case "Just":
      return cases.Just(maybe.value);
  }
})() : default$(maybe);
const maybe = Nothing => Just => $match(null)({
  Nothing,
  Just
});
const fromMaybe = default$ => maybe(default$)(id);
const fromNullable = x => equals(null)(x) || equals(undefined)(x) ? Nothing : Just(x);
export default {
  Nothing,
  Just,
  [Symbol.for("match")]: $match
};
export {Nothing, Just, maybe, fromMaybe, fromNullable};
