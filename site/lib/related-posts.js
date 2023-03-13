import path from 'node:path';
import S from 'sanctuary';
const intersection = function intersection(_set$002D1) {
  return _set$002D2 => new Set([..._set$002D2]['filter'](x => _set$002D1['has'](x)));
};
const union = function union(_set$002D1) {
  return _set$002D2 => new Set([
    ..._set$002D1,
    ..._set$002D2
  ]);
};
const similarity = function similarity(_set$002D1) {
  return _set$002D2 => intersection(_set$002D1)(_set$002D2)['size'] / Math['sqrt'](union(_set$002D1)(_set$002D2)['size']);
};
const _seconds$002Dbetween = function _seconds$002Dbetween(from) {
  return to => to['diff'](from, 'seconds')['seconds'];
};
const _with$002Dscores = function _with$002Dscores(that) {
  return _this => (() => {
    const score = similarity(new Set(that[Symbol.for('tags')]))(new Set(_this[Symbol.for('tags')]));
    const primary = S['negate'](score);
    const secondary = Math['abs'](_seconds$002Dbetween(that[Symbol.for('datetime')])(_this[Symbol.for('datetime')]));
    return score >= 0.5 ? S['Just'](S['Pair'](S['Pair'](primary)(secondary))(_this)) : S['Nothing'];
  })();
};
const _related$002Dposts = function _related$002Dposts(posts) {
  return post => S['pipe']([
    S['reject'](_this => _this[Symbol.for('slug')] === post[Symbol.for('slug')]),
    S['mapMaybe'](_with$002Dscores(post)),
    S['sort'],
    S['map'](S['snd']),
    posts => posts['slice'](0, 5)
  ])(posts);
};
export default _related$002Dposts;
