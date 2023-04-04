import S from "sanctuary";
const construct = constructor => args => globalThis.Reflect.construct(constructor, args);
const equals = this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that;
const concat = this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that);
const filter = f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f);
const related$002Dposts = posts => post => (() => {
  const tags = construct(Set)([post.tags]);
  return (args => target => target.slice.apply(target, args))([0, 5])(S.sortBy(this$ => S.Pair(-this$.score)(Math.abs(($ => $.milliseconds)((args => target => target.diff.apply(target, args))([post.datetime])(this$.datetime)))))(S.mapMaybe(this$ => equals(post.slug)(this$.slug) ? S.Nothing : (() => {
    const dividend = ($ => $.length)(filter(tag => tags.has(tag))(this$.tags));
    const divisor = Math.sqrt(($ => $.size)(construct(Set)([concat(post.tags)(this$.tags)])));
    const score = dividend / divisor;
    return score < 0.5 ? S.Nothing : S.Just({
      ...this$,
      score
    });
  })())(posts)));
})();
export default related$002Dposts;
