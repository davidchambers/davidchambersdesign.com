import S from 'sanctuary';
import screen from './css/screen.js';
const coerce = function coerce(x) {
  return Array['isArray'](x) ? S['unwords'](S['map'](coerce)(x)) : typeof x == 'symbol' ? Symbol['keyFor'](x) : String(x);
};
const _split$002Devery$002D2 = function _split$002Devery$002D2(xs) {
  return S['array']([])(k => S['array']([])(v => S['compose'](S['prepend'](S['Pair'](k)(v)))(_split$002Devery$002D2)))(xs);
};
const _vendor$002Dprefix = function _vendor$002Dprefix(unprefixed) {
  return prefixed => S['chain'](S['pair'](k => v => k === unprefixed ? [
    ...prefixed,
    unprefixed
  ]['map'](k => S['Pair'](k)(v)) : [S['Pair'](k)(v)]));
};
const _vendor$002Dprefixes = S['pipe']([
  _vendor$002Dprefix(Symbol.for('border-radius'))([
    Symbol.for('-webkit-border-radius'),
    Symbol.for('-moz-border-radius'),
    Symbol.for('-ms-border-radius'),
    Symbol.for('-o-border-radius')
  ]),
  _vendor$002Dprefix(Symbol.for('box-shadow'))([
    Symbol.for('-webkit-box-shadow'),
    Symbol.for('-moz-box-shadow')
  ]),
  _vendor$002Dprefix(Symbol.for('transition-duration'))([
    Symbol.for('-webkit-transition-duration'),
    Symbol.for('-moz-transition-duration'),
    Symbol.for('-o-transition-duration')
  ]),
  _vendor$002Dprefix(Symbol.for('transition-timing-function'))([
    Symbol.for('-webkit-transition-timing-function'),
    Symbol.for('-moz-transition-timing-function'),
    Symbol.for('-o-transition-timing-function')
  ])
]);
const _format$002Dblock = function _format$002Dblock(selectors) {
  return properties => selectors['join'](',\n') + ' {\n' + properties['map'](S['pair'](k => v => '  ' + coerce(k) + ': ' + coerce(v) + ';\n'))['join']('') + '}\n';
};
const _generate$002Dcss = S['pipe']([
  screen,
  _split$002Devery$002D2,
  S['map'](S['map'](_split$002Devery$002D2)),
  S['map'](S['map'](_vendor$002Dprefixes)),
  S['map'](S['pair'](_format$002Dblock)),
  S['joinWith']('\n')
])(coerce);
export default _generate$002Dcss;
