import S from 'sanctuary';
import screen from './css/screen.js';
const coerce = function coerce(x) {
  return Array.isArray(x) ? S.unwords(S.map(coerce)(x)) : typeof x == 'symbol' ? Symbol.keyFor(x) : String(x);
};
const split$002Devery$002D2 = function split$002Devery$002D2(xs) {
  return S.array([])(k => S.array([])(v => S.compose(S.prepend(S.Pair(k)(v)))(split$002Devery$002D2)))(xs);
};
const vendor$002Dprefix = function vendor$002Dprefix(unprefixed) {
  return prefixed => S.chain(S.pair(k => v => k === unprefixed ? [
    ...prefixed,
    unprefixed
  ].map(k => S.Pair(k)(v)) : [S.Pair(k)(v)]));
};
const vendor$002Dprefixes = S.pipe([
  vendor$002Dprefix(Symbol.for('border-radius'))([
    Symbol.for('-webkit-border-radius'),
    Symbol.for('-moz-border-radius'),
    Symbol.for('-ms-border-radius'),
    Symbol.for('-o-border-radius')
  ]),
  vendor$002Dprefix(Symbol.for('box-shadow'))([
    Symbol.for('-webkit-box-shadow'),
    Symbol.for('-moz-box-shadow')
  ]),
  vendor$002Dprefix(Symbol.for('transition-duration'))([
    Symbol.for('-webkit-transition-duration'),
    Symbol.for('-moz-transition-duration'),
    Symbol.for('-o-transition-duration')
  ]),
  vendor$002Dprefix(Symbol.for('transition-timing-function'))([
    Symbol.for('-webkit-transition-timing-function'),
    Symbol.for('-moz-transition-timing-function'),
    Symbol.for('-o-transition-timing-function')
  ])
]);
const format$002Dblock = function format$002Dblock(selectors) {
  return properties => selectors.join(',\n') + ' {\n' + properties.map(S.pair(k => v => '  ' + coerce(k) + ': ' + coerce(v) + ';\n')).join('') + '}\n';
};
const generate$002Dcss = S.pipe([
  screen,
  split$002Devery$002D2,
  S.map(S.map(split$002Devery$002D2)),
  S.map(S.map(vendor$002Dprefixes)),
  S.map(S.pair(format$002Dblock)),
  S.joinWith('\n')
])(coerce);
export default generate$002Dcss;
