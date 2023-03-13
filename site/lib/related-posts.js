import path from 'node:path';
import S from 'sanctuary';
const intersection = function intersection(set$002D1) {
  return set$002D2 => new Set([...set$002D2].filter(x => set$002D1.has(x)));
};
const union = function union(set$002D1) {
  return set$002D2 => new Set([
    ...set$002D1,
    ...set$002D2
  ]);
};
const similarity = function similarity(set$002D1) {
  return set$002D2 => intersection(set$002D1)(set$002D2).size / Math.sqrt(union(set$002D1)(set$002D2).size);
};
const seconds$002Dbetween = function seconds$002Dbetween(from) {
  return to => to.diff(from, 'seconds').seconds;
};
const with$002Dscores = function with$002Dscores(that) {
  return this_ => (() => {
    const score = similarity(new Set(that[Symbol.for('tags')]))(new Set(this_[Symbol.for('tags')]));
    const primary = S.negate(score);
    const secondary = Math.abs(seconds$002Dbetween(that[Symbol.for('datetime')])(this_[Symbol.for('datetime')]));
    return score >= 0.5 ? S.Just(S.Pair(S.Pair(primary)(secondary))(this_)) : S.Nothing;
  })();
};
const related$002Dposts = function related$002Dposts(posts) {
  return post => S.pipe([
    S.reject(this_ => this_[Symbol.for('slug')] === post[Symbol.for('slug')]),
    S.mapMaybe(with$002Dscores(post)),
    S.sort,
    S.map(S.snd),
    posts => posts.slice(0, 5)
  ])(posts);
};
export default related$002Dposts;
