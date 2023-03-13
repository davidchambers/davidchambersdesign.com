import path from 'node:path';
import s from './sanctuary.js';
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
    const primary = s['negate'](score);
    const secondary = Math['abs'](_seconds$002Dbetween(that[Symbol.for('datetime')])(_this[Symbol.for('datetime')]));
    return score >= 0.5 ? s['Just'](s['Pair'](s['Pair'](primary)(secondary))(_this)) : s['Nothing'];
  })();
};
const _related$002Dposts = function _related$002Dposts(posts) {
  return post => s['pipe']([
    s['reject'](_this => _this[Symbol.for('slug')] === post[Symbol.for('slug')]),
    s['map-maybe'](_with$002Dscores(post)),
    s['sort'],
    s['map'](s['snd']),
    posts => posts['slice'](0, 5)
  ])(posts);
};
export default _related$002Dposts;
