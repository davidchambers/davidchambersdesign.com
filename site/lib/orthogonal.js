import s from './sanctuary.js';
const reducer = function reducer(prev) {
  return path => curr => curr[0] === Symbol.for('M') ? prev[0] === Symbol.for('M') || prev[0] === Symbol.for('m') ? s['Pair'](curr)(path) : s['Pair'](curr)([
    ...path,
    prev
  ]) : (prev[0] === Symbol.for('M') || prev[0] === Symbol.for('m')) && curr[0] === Symbol.for('m') ? s['Pair']([
    prev[0],
    [
      prev[1][0] + curr[1][0],
      prev[1][1] + curr[1][1]
    ]
  ])(path) : s['Pair'](curr)([
    ...path,
    prev
  ]);
};
const simplify = s['array']([])(head => tail => s['pair'](s['append'])(s['reduce'](s['pair'](reducer))(s['Pair'](head)([]))(tail)));
const render = s['pipe']([
  simplify,
  s['join'],
  s['map'](x => typeof x === 'symbol' ? Symbol['keyFor'](x) : String(x)),
  s['unwords']
]);
const _$21E6 = function _$21E6(x) {
  return [
    Symbol.for('m'),
    [
      -x,
      0
    ]
  ];
};
const _$21E8 = function _$21E8(x) {
  return [
    Symbol.for('m'),
    [
      +x,
      0
    ]
  ];
};
const _$21E7 = function _$21E7(y) {
  return [
    Symbol.for('m'),
    [
      0,
      -y
    ]
  ];
};
const _$21E9 = function _$21E9(y) {
  return [
    Symbol.for('m'),
    [
      0,
      +y
    ]
  ];
};
const _$2190 = function _$2190(x) {
  return [
    Symbol.for('h'),
    -x
  ];
};
const _$2192 = function _$2192(x) {
  return [
    Symbol.for('h'),
    +x
  ];
};
const _$2191 = function _$2191(y) {
  return [
    Symbol.for('v'),
    -y
  ];
};
const _$2193 = function _$2193(y) {
  return [
    Symbol.for('v'),
    +y
  ];
};
export {
  render,
  _$21E6,
  _$21E8,
  _$21E7,
  _$21E9,
  _$2190,
  _$2192,
  _$2191,
  _$2193
};
