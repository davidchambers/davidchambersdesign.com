import S from 'sanctuary';
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain['fantasy-land/chain'](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f)
};
const {chain, map} = Prelude;
const simplify = paths => paths.length === 0 ? [] : (() => {
  const [head, ...tail] = paths;
  const [prev, path] = tail.reduce(([prev, path], curr) => curr[0] === 'M' ? prev[0] === 'M' || prev[0] === 'm' ? [
    curr,
    path
  ] : [
    curr,
    [
      ...path,
      prev
    ]
  ] : (prev[0] === 'M' || prev[0] === 'm') && curr[0] === 'm' ? [
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
  ], [
    head,
    []
  ]);
  return [
    ...path,
    prev
  ];
})();
const render = paths => S.unwords(S.join(simplify(paths)));
const $21E6 = x => [
  'm',
  [
    -x,
    0
  ]
];
const $21E8 = x => [
  'm',
  [
    +x,
    0
  ]
];
const $21E7 = y => [
  'm',
  [
    0,
    -y
  ]
];
const $21E9 = y => [
  'm',
  [
    0,
    +y
  ]
];
const $2190 = x => [
  'h',
  -x
];
const $2192 = x => [
  'h',
  +x
];
const $2191 = y => [
  'v',
  -y
];
const $2193 = y => [
  'v',
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
