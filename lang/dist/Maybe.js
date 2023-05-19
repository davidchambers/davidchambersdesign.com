const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const id = x => x;
const equals = this$ => that => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return ($discriminant => {
      if ($discriminant === "[object Array]") {
        return this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]));
      }
      return false;
    })(globalThis.Object.prototype.toString.call(that));
  }
  if ($discriminant === "[object Object]") {
    return ($discriminant => {
      if ($discriminant === "[object Object]") {
        return typeof$(this$["fantasy-land/equals"]) === "function" ? this$["fantasy-land/equals"](that) : this$ === that;
      }
      return false;
    })(globalThis.Object.prototype.toString.call(that));
  }
  return this$ === that;
})(globalThis.Object.prototype.toString.call(this$));
const $prototype = {
  ["fantasy-land/map"]: function (f) {
    return ($value => {
      if ($value.$tag === "Nothing" && $value.$size === 0) {
        return Nothing;
      }
      if ($value.$tag === "Just" && $value.$size === 1) {
        const x = $value[0];
        return Just(f(x));
      }
      throw globalThis.Error("Pattern matching failure");
    })(this);
  }
};
const Nothing = globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Nothing",
  $size: 0
});
const Just = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Just",
  $size: 1,
  [0]: value,
  value
});
const maybe = y => f => m => ($value => {
  if ($value.$tag === "Nothing" && $value.$size === 0) {
    return y;
  }
  if ($value.$tag === "Just" && $value.$size === 1) {
    const x = $value[0];
    return f(x);
  }
  throw globalThis.Error("Pattern matching failure");
})(m);
const fromMaybe = default$ => maybe(default$)(id);
const fromNullable = x => equals(x)(null$) || equals(x)(undefined) ? Nothing : Just(x);
export {Nothing, Just, maybe, fromMaybe, fromNullable};
