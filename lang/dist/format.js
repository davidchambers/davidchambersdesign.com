const joinWith = separator => xs => xs.join(separator);
const concat = this$ => that => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return this$.concat(that);
  }
  if ($discriminant === "[object String]") {
    return this$.concat(that);
  }
  return this$["fantasy-land/concat"](that);
})(globalThis.Object.prototype.toString.call(this$));
const map = f => xs => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return xs.map(x => f(x));
  }
  return xs["fantasy-land/map"](f);
})(globalThis.Object.prototype.toString.call(xs));
const list = strings => ($value => {
  if (globalThis.Array.isArray($value)) {
    if ($value.length === 0) {
      return "";
    }
  }
  if (globalThis.Array.isArray($value)) {
    if ($value.length === 1) {
      const first = $value[0];
      return first;
    }
  }
  if (globalThis.Array.isArray($value)) {
    if ($value.length === 2) {
      const first = $value[0];
      {
        const second = $value[1];
        return concat(first)(concat(" and ")(second));
      }
    }
  }
  if (globalThis.Array.isArray($value)) {
    if ($value.length >= 1) {
      const init = $value.slice(0, -1);
      {
        const last = $value.at(-1);
        return ($lhs => concat($lhs)(concat(" and ")(last)))(joinWith(" ")(map($lhs => concat($lhs)(","))(init)));
      }
    }
  }
  throw globalThis.Error("Pattern matching failure");
})(strings);
export {list};
