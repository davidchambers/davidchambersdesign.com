import sanctuary from "sanctuary";
const sliceTo = to => xs => xs.slice(0, to);
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
const concat = this$ => that => (function () {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
    case "[object String]":
      return this$.concat(that);
    default:
      return this$["fantasy-land/concat"](that);
  }
})();
const filter = f => xs => (function () {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.filter(x => f(x));
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [filter(f)([...xs])]);
    default:
      return xs["fantasy-land/filter"](f);
  }
})();
const S = sanctuary.unchecked;
const related$002Dposts = posts => post => (() => {
  const tags = globalThis.Reflect.construct(Set, [post.tags]);
  return sliceTo(5)(S.sortBy(function (self) {
    return S.Pair(-self.score)(Math.abs((args => target => target.diff.apply(target, args))([post.datetime])(self.datetime).milliseconds));
  })(S.mapMaybe(function (self) {
    return equals(post.slug)(self.slug) ? S.Nothing : (() => {
      const dividend = filter(function (tag) {
        return tags.has(tag);
      })(self.tags).length;
      const divisor = Math.sqrt(globalThis.Reflect.construct(Set, [concat(post.tags)(self.tags)]).size);
      const score = dividend / divisor;
      return score < 0.5 ? S.Nothing : S.Just({
        ...self,
        score
      });
    })();
  })(posts)));
})();
export default related$002Dposts;
