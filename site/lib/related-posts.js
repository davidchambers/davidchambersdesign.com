import S from "sanctuary";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
const related$002Dposts = posts => post => (() => {
  const tags = Reflect.construct(Set, [post.tags]);
  return (posts => posts.slice(0, 5))(S.sortBy(this$ => S.Pair(-this$.score)(Math.abs(this$.datetime.diff(post.datetime).milliseconds)))(S.mapMaybe(this$ => this$.slug === post.slug ? S.Nothing : (() => {
    const score = this$.tags.filter(x => tags.has(x)).length / Math.sqrt(Reflect.construct(Set, [[...tags, ...this$.tags]]).size);
    return score < 0.5 ? S.Nothing : S.Just({
      ...this$,
      score
    });
  })())(posts)));
})();
export default related$002Dposts;
