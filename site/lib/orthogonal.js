import S from 'sanctuary';
const reducer = prev => path => curr => curr[0] === Symbol.for('M') ? prev[0] === Symbol.for('M') || prev[0] === Symbol.for('m') ? [
  curr,
  path
] : [
  curr,
  [
    ...path,
    prev
  ]
] : (prev[0] === Symbol.for('M') || prev[0] === Symbol.for('m')) && curr[0] === Symbol.for('m') ? [
  [
    prev[0],
    [
      prev[1][0] + curr[1][0],
      prev[1][1] + curr[1][1]
    ]
  ],
  path
] : [
  curr,
  [
    ...path,
    prev
  ]
];
const simplify = paths => paths.length === 0 ? [] : (() => {
  const head = paths[0];
  const tail = paths.slice(1);
  const pair = S.reduce(pair => curr => reducer(pair[0])(pair[1])(curr))([
    head,
    []
  ])(tail);
  return [
    ...pair[1],
    pair[0]
  ];
})();
const render = paths => simplify(paths).flat().map(x => typeof x === 'symbol' ? Symbol.keyFor(x) : String(x)).join(' ');
const $21E6 = x => [
  Symbol.for('m'),
  [
    -x,
    0
  ]
];
const $21E8 = x => [
  Symbol.for('m'),
  [
    +x,
    0
  ]
];
const $21E7 = y => [
  Symbol.for('m'),
  [
    0,
    -y
  ]
];
const $21E9 = y => [
  Symbol.for('m'),
  [
    0,
    +y
  ]
];
const $2190 = x => [
  Symbol.for('h'),
  -x
];
const $2192 = x => [
  Symbol.for('h'),
  +x
];
const $2191 = y => [
  Symbol.for('v'),
  -y
];
const $2193 = y => [
  Symbol.for('v'),
  +y
];
export {
  render,
  $21E6,
  $21E8,
  $21E7,
  $21E9,
  $2190,
  $2192,
  $2191,
  $2193
};
