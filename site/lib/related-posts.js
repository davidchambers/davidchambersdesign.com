import sanctuary from "sanctuary";
const construct = constructor => args => globalThis.Reflect.construct(constructor, args);
const equals = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return (() => {
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
const concat = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
    case "[object String]":
      return this$.concat(that);
    default:
      return this$["fantasy-land/concat"](that);
  }
})();
const filter = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.filter(x => f(x));
    default:
      return xs["fantasy-land/filter"](f);
  }
})();
const S = sanctuary.unchecked;
const related$002Dposts = posts => post => (() => {
  const tags = construct(Set)([post.tags]);
  return (args => target => target.slice.apply(target, args))([0, 5])(S.sortBy(this$ => S.Pair(-this$.score)(Math.abs((args => target => target.diff.apply(target, args))([post.datetime])(this$.datetime).milliseconds)))(S.mapMaybe(this$ => equals(post.slug)(this$.slug) ? S.Nothing : (() => {
    const dividend = filter(tag => tags.has(tag))(this$.tags).length;
    const divisor = Math.sqrt(construct(Set)([concat(post.tags)(this$.tags)]).size);
    const score = dividend / divisor;
    return score < 0.5 ? S.Nothing : S.Just({
      ...this$,
      score
    });
  })())(posts)));
})();
export default related$002Dposts;
