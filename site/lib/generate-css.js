import s from './sanctuary.js';
import screen from './css/screen.js';
const coerce = function coerce(x) {
  return (() => {
    return Array['isArray'](x) ? (() => {
      return s[Symbol.for('unwords')](s[Symbol.for('map')](coerce)(x));
    })() : typeof x == 'symbol' ? (() => {
      return Symbol['keyFor'](x);
    })() : (() => {
      return String(x);
    })();
  })();
};
const _split$002Devery$002D2 = function _split$002Devery$002D2(xs) {
  return s[Symbol.for('array')]([])(k => s[Symbol.for('array')]([])(v => s[Symbol.for('compose')](s[Symbol.for('prepend')](s[Symbol.for('Pair')](k)(v)))(_split$002Devery$002D2)))(xs);
};
const _vendor$002Dprefix = function _vendor$002Dprefix(unprefixed) {
  return prefixed => s[Symbol.for('chain')](s[Symbol.for('pair')](k => v => (() => {
    return k === unprefixed ? (() => {
      return s[Symbol.for('map')]($1 => s[Symbol.for('Pair')]($1)(v))(s[Symbol.for('append')](unprefixed)(prefixed));
    })() : (() => {
      return [s[Symbol.for('Pair')](k)(v)];
    })();
  })()));
};
const _vendor$002Dprefixes = s[Symbol.for('pipe')]([
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
  return s[Symbol.for('pipe')]([
    s[Symbol.for('map')](s[Symbol.for('pair')](k => v => '  ' + coerce(k) + ': ' + coerce(v) + ';')),
    s[Symbol.for('prepend')](s[Symbol.for('join-with')](',\n')(selectors) + ' {'),
    s[Symbol.for('append')]('}'),
    s[Symbol.for('unlines')]
  ]);
};
const _generate$002Dcss = s[Symbol.for('pipe')]([
  screen,
  _split$002Devery$002D2,
  s[Symbol.for('map')](s[Symbol.for('map')](_split$002Devery$002D2)),
  s[Symbol.for('map')](s[Symbol.for('map')](_vendor$002Dprefixes)),
  s[Symbol.for('map')](s[Symbol.for('pair')](_format$002Dblock)),
  s[Symbol.for('join-with')]('\n')
])(coerce);
export default _generate$002Dcss;
