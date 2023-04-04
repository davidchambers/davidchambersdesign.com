const apply = f => args => f.apply(null, args);
const Nothing = {
  [Symbol.for("tag")]: "Nothing",
  ["fantasy-land/map"]: f => Nothing
};
const Just = value => ({
  [Symbol.for("tag")]: "Just",
  value,
  ["fantasy-land/map"]: f => Just(f(value))
});
const $match = default$ => cases => maybe => apply(Object.hasOwn)([cases, maybe[Symbol.for("tag")]]) ? (() => {
  switch (maybe[Symbol.for("tag")]) {
    case "Nothing":
      return cases.Nothing;
    case "Just":
      return cases.Just(maybe.value);
  }
})() : default$(maybe);
const maybe = nothing => just => $match(null)({
  Nothing: nothing,
  Just: just
});
const Maybe = {
  Nothing,
  Just,
  [Symbol.for("match")]: $match,
  maybe
};
export default Maybe;
