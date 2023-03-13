import sanctuary from 'sanctuary';
const _kebab$002Dcase = function _kebab$002Dcase(s) {
  return s['replace'](new RegExp('(?!\\b)[A-Z0-9]', 'g'), c => '-' + c['toLowerCase']());
};
const prime = function prime(s) {
  return s['replaceAll']('_', '\'');
};
const _default = Object['fromEntries'](Object['entries'](sanctuary['unchecked'])['map'](entry => [
  prime(_kebab$002Dcase(entry[0])),
  entry[1]
]));
export default _default;
