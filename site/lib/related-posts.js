import S from 'sanctuary';
const Prelude = { map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f) };
const {map} = Prelude;
const related$002Dposts = posts => post => (() => {
  const tags = Reflect.construct(Set, [post.tags]);
  return S.sortBy(this_ => S.Pair(-this_.score)(Math.abs(this_.datetime.diff(post.datetime).milliseconds)))(S.mapMaybe(this_ => this_.slug === post.slug ? S.Nothing : (() => {
    const score = this_.tags.filter(x => tags.has(x)).length / Math.sqrt(Reflect.construct(Set, [[
        ...tags,
        ...this_.tags
      ]]).size);
    return score < 0.5 ? S.Nothing : S.Just({
      ...this_,
      score
    });
  })())(posts)).slice(0, 5);
})();
export default related$002Dposts;
