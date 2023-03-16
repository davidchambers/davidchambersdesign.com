import S from 'sanctuary';
import screen from './css/screen.js';
const coerce = x => Array.isArray(x) ? S.unwords(S.map(coerce)(x)) : typeof x == 'symbol' ? Symbol.keyFor(x) : String(x);
const split$002Devery$002D2 = xs => S.array([])(k => S.array([])(v => asdf => [
  [
    k,
    v
  ],
  ...split$002Devery$002D2(asdf)
]))(xs);
const vendor$002Dprefix = unprefixed => prefixed => S.chain(property => property[0] === unprefixed ? [
  ...prefixed,
  unprefixed
].map(k => [
  k,
  property[1]
]) : [[
    property[0],
    property[1]
  ]]);
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
const format$002Dblock = selectors => properties => `${ selectors.join(',\n') } {\n${ properties.map(property => `  ${ coerce(property[0]) }: ${ coerce(property[1]) };\n`).join('') }}\n`;
const generate$002Dcss = S.pipe([
  screen,
  split$002Devery$002D2,
  S.map(pairs => format$002Dblock(pairs[0])(vendor$002Dprefixes(split$002Devery$002D2(pairs[1])))),
  S.joinWith('\n')
])(coerce);
export default generate$002Dcss;
