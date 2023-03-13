import s from './sanctuary.js';
import screen from './css/screen.js';
const coerce = function coerce(x) {
  return Array['isArray'](x) ? s['unwords'](s['map'](coerce)(x)) : typeof x == 'symbol' ? Symbol['keyFor'](x) : String(x);
};
const _split$002Devery$002D2 = function _split$002Devery$002D2(xs) {
  return s['array']([])(k => s['array']([])(v => s['compose'](s['prepend'](s['Pair'](k)(v)))(_split$002Devery$002D2)))(xs);
};
const _vendor$002Dprefix = function _vendor$002Dprefix(unprefixed) {
  return prefixed => s['chain'](s['pair'](k => v => k === unprefixed ? [
    ...prefixed,
    unprefixed
  ]['map'](k => s['Pair'](k)(v)) : [s['Pair'](k)(v)]));
};
const _vendor$002Dprefixes = s['pipe']([
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
  return s['pipe']([
    s['map'](s['pair'](k => v => '  ' + coerce(k) + ': ' + coerce(v) + ';')),
    s['prepend'](s['join-with'](',\n')(selectors) + ' {'),
    s['append']('}'),
    s['unlines']
  ]);
};
const _generate$002Dcss = s['pipe']([
  screen,
  _split$002Devery$002D2,
  s['map'](s['map'](_split$002Devery$002D2)),
  s['map'](s['map'](_vendor$002Dprefixes)),
  s['map'](s['pair'](_format$002Dblock)),
  s['join-with']('\n')
])(coerce);
export default _generate$002Dcss;
