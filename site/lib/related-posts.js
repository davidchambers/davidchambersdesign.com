import path from 'node:path';
import S from 'sanctuary';
const intersection = set$002D1 => set$002D2 => new Set([...set$002D2].filter(x => set$002D1.has(x)));
const union = set$002D1 => set$002D2 => new Set([
  ...set$002D1,
  ...set$002D2
]);
const similarity = set$002D1 => set$002D2 => intersection(set$002D1)(set$002D2).size / Math.sqrt(union(set$002D1)(set$002D2).size);
const seconds$002Dbetween = from => to => to.diff(from, 'seconds').seconds;
const with$002Dscores = that => this_ => (() => {
  const score = similarity(new Set(that.tags))(new Set(this_.tags));
  const primary = S.negate(score);
  const secondary = Math.abs(seconds$002Dbetween(that.datetime)(this_.datetime));
  return score >= 0.5 ? S.Just(S.Pair(S.Pair(primary)(secondary))(this_)) : S.Nothing;
})();
const related$002Dposts = posts => post => S.pipe([
  S.reject(this_ => this_.slug === post.slug),
  S.mapMaybe(with$002Dscores(post)),
  S.sort,
  S.map(S.snd),
  posts => posts.slice(0, 5)
])(posts);
export default related$002Dposts;
