import sanctuary from 'sanctuary';
const _kebab$002Dcase = $object => $object['replace'](new RegExp('(?!\\b)[A-Z0-9]', 'g'), c => '-' + c['toLowerCase']());
const prime = $object => $object['replace']('_', '\'');
const _default = Object['fromEntries'](Object['entries'](sanctuary['unchecked'])['map'](entry => [
  Symbol['for'](prime(_kebab$002Dcase(entry[0]))),
  entry[1]
]));
export default _default;
