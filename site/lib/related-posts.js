import S from "sanctuary";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude.filter(x => !predicate(x)),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {_apply, apply, construct, match, id, const: const$, not, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const related$002Dposts = posts => post => (() => {
  const tags = construct(Set)([post.tags]);
  const has$002Dtag = tag => Prelude._apply("has")([tag])(tags);
  return Prelude._apply("slice")([0, 5])(S.sortBy(this$ => S.Pair(-this$.score)(Math.abs((x => x.milliseconds)(Prelude._apply("diff")([post.datetime])(this$.datetime)))))(S.mapMaybe(this$ => Object.is(post.slug, this$.slug) ? S.Nothing : (() => {
    const dividend = (x => x.length)(filter(has$002Dtag)(this$.tags));
    const divisor = Math.sqrt((x => x.size)(construct(Set)([Prelude.concat(post.tags)(this$.tags)])));
    const score = dividend / divisor;
    return score < 0.5 ? S.Nothing : S.Just({
      ...this$,
      score
    });
  })())(posts)));
})();
export default related$002Dposts;
