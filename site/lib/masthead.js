import S from 'sanctuary';
import { path } from './elements.js';
import {
  render,
  $21E6,
  $21E8,
  $21E7,
  $21E9,
  $2190,
  $2192,
  $2191,
  $2193
} from './orthogonal.js';
const mask$002Dchars = {
  A: [
    $2192(14),
    $2193(24),
    $2190(4),
    $2191(10),
    $2190(6),
    $2193(10),
    $2190(4),
    $2191(24),
    $21E8(4),
    $21E9(4),
    $2192(6),
    $2193(6),
    $2190(6),
    $2191(6)
  ],
  B: [
    $2192(14),
    $2193(24),
    $2190(14),
    $2191(24),
    $21E8(4),
    $21E9(4),
    $2192(6),
    $2193(6),
    $2190(6),
    $2191(6),
    $21E8(0),
    $21E9(10),
    $2192(6),
    $2193(6),
    $2190(6),
    $2191(6)
  ],
  C: [
    $2192(14),
    $2193(9),
    $2190(4),
    $2191(5),
    $2190(6),
    $2193(16),
    $2192(6),
    $2191(5),
    $2192(4),
    $2193(9),
    $2190(14),
    $2191(24)
  ],
  D: [
    $2192(14),
    $2193(24),
    $2190(14),
    $2191(24),
    $21E8(4),
    $21E9(4),
    $2192(6),
    $2193(16),
    $2190(6),
    $2191(16)
  ],
  E: [
    $2192(12),
    $2193(4),
    $2190(8),
    $2193(6),
    $2192(8),
    $2193(4),
    $2190(8),
    $2193(6),
    $2192(8),
    $2193(4),
    $2190(12),
    $2191(24)
  ],
  G: [
    $2192(14),
    $2193(4),
    $2190(10),
    $2193(16),
    $2192(6),
    $2191(10),
    $2192(4),
    $2193(14),
    $2190(14),
    $2191(24)
  ],
  H: [
    $2192(4),
    $2193(10),
    $2192(6),
    $2191(10),
    $2192(4),
    $2193(24),
    $2190(4),
    $2191(10),
    $2190(6),
    $2193(10),
    $2190(4),
    $2191(24)
  ],
  I: [
    $2192(4),
    $2193(24),
    $2190(4),
    $2191(24)
  ],
  M: [
    $2192(22),
    $2193(24),
    $2190(4),
    $2191(20),
    $2190(5),
    $2193(20),
    $2190(4),
    $2191(20),
    $2190(5),
    $2193(20),
    $2190(4),
    $2191(24)
  ],
  N: [
    $2192(14),
    $2193(24),
    $2190(4),
    $2191(20),
    $2190(6),
    $2193(20),
    $2190(4),
    $2191(24)
  ],
  R: [
    $2192(14),
    $2193(24),
    $2190(4),
    $2191(10),
    $2190(6),
    $2193(10),
    $2190(4),
    $2191(24),
    $21E8(4),
    $21E9(4),
    $2192(6),
    $2193(6),
    $2190(6),
    $2191(6)
  ],
  S: [
    $2192(12),
    $2193(4),
    $2190(8),
    $2193(6),
    $2192(8),
    $2193(14),
    $2190(12),
    $2191(4),
    $2192(8),
    $2191(6),
    $2190(8),
    $2191(14)
  ],
  V: [
    $2192(4),
    $2193(20),
    $2192(6),
    $2191(20),
    $2192(4),
    $2193(24),
    $2190(14),
    $2191(24)
  ]
};
const line$002Dchars = {
  A: [
    $2192(14),
    $2193(1),
    $2190(13),
    $2193(23),
    $2190(1),
    $2191(24),
    $21E8(4),
    $21E9(10),
    $2192(6),
    $2191(6),
    $2192(1),
    $2193(7),
    $2190(7),
    $2191(1),
    $21E8(6),
    $21E9(4),
    $2192(1),
    $2193(10),
    $2190(1),
    $2191(10)
  ],
  B: [
    $2192(14),
    $2193(1),
    $2190(13),
    $2193(23),
    $2190(1),
    $2191(24),
    $21E8(4),
    $21E9(10),
    $2192(6),
    $2191(6),
    $2192(1),
    $2193(7),
    $2190(7),
    $2191(1),
    $21E8(0),
    $21E9(10),
    $2192(6),
    $2191(6),
    $2192(1),
    $2193(7),
    $2190(7),
    $2191(1)
  ],
  C: [
    $2192(14),
    $2193(1),
    $2190(13),
    $2193(23),
    $2190(1),
    $2191(24),
    $21E8(4),
    $21E9(20),
    $2192(6),
    $2191(5),
    $2192(4),
    $2193(1),
    $2190(3),
    $2193(5),
    $2190(7),
    $2191(1),
    $21E8(6),
    $21E7(16),
    $2192(1),
    $2193(5),
    $2190(1),
    $2191(5)
  ],
  D: [
    $2192(14),
    $2193(1),
    $2190(13),
    $2193(23),
    $2190(1),
    $2191(24),
    $21E8(4),
    $21E9(20),
    $2192(6),
    $2191(16),
    $2192(1),
    $2193(17),
    $2190(7),
    $2191(1)
  ],
  E: [
    $2192(12),
    $2193(1),
    $2190(11),
    $2193(23),
    $2190(1),
    $2191(24),
    $21E8(4),
    $21E9(10),
    $2192(8),
    $2193(1),
    $2190(8),
    $2191(1),
    $21E8(0),
    $21E9(10),
    $2192(8),
    $2193(1),
    $2190(8),
    $2191(1)
  ],
  G: [
    $2192(14),
    $2193(1),
    $2190(13),
    $2193(23),
    $2190(1),
    $2191(24),
    $21E8(4),
    $21E9(20),
    $2192(6),
    $2191(10),
    $2192(4),
    $2193(1),
    $2190(3),
    $2193(10),
    $2190(7),
    $2191(1)
  ],
  H: [
    $2192(4),
    $2193(1),
    $2190(3),
    $2193(23),
    $2190(1),
    $2191(24),
    $21E8(4),
    $21E9(10),
    $2192(6),
    $2191(10),
    $2192(4),
    $2193(1),
    $2190(3),
    $2193(10),
    $2190(7),
    $2191(1),
    $21E8(6),
    $21E9(4),
    $2192(1),
    $2193(10),
    $2190(1),
    $2191(10)
  ],
  I: [
    $2192(4),
    $2193(1),
    $2190(3),
    $2193(23),
    $2190(1),
    $2191(24)
  ],
  M: [
    $2192(22),
    $2193(1),
    $2190(21),
    $2193(23),
    $2190(1),
    $2191(23),
    $21E8(9),
    $21E9(3),
    $2192(1),
    $2193(20),
    $2190(1),
    $2191(20),
    $21E8(9),
    $21E9(0),
    $2192(1),
    $2193(20),
    $2190(1),
    $2191(20)
  ],
  N: [
    $2192(14),
    $2193(1),
    $2190(13),
    $2193(23),
    $2190(1),
    $2191(24),
    $21E8(10),
    $21E9(4),
    $2192(1),
    $2193(20),
    $2190(1),
    $2191(20)
  ],
  R: [
    $2192(14),
    $2193(1),
    $2190(13),
    $2193(23),
    $2190(1),
    $2191(24),
    $21E8(4),
    $21E9(10),
    $2192(6),
    $2191(6),
    $2192(1),
    $2193(7),
    $2190(7),
    $2191(1),
    $21E8(6),
    $21E9(4),
    $2192(1),
    $2193(10),
    $2190(1),
    $2191(10)
  ],
  S: [
    $2192(12),
    $2193(1),
    $2190(11),
    $2193(13),
    $2190(1),
    $2191(14),
    $21E8(0),
    $21E9(20),
    $2192(8),
    $2191(6),
    $2192(1),
    $2193(7),
    $2190(8),
    $2193(3),
    $2190(1),
    $2191(4),
    $21E8(4),
    $21E7(10),
    $2192(8),
    $2193(1),
    $2190(8),
    $2191(1)
  ],
  V: [
    $2192(4),
    $2193(1),
    $2190(3),
    $2193(23),
    $2190(1),
    $2191(24),
    $21E8(4),
    $21E9(20),
    $2192(6),
    $2191(20),
    $2192(4),
    $2193(1),
    $2190(3),
    $2193(20),
    $2190(7),
    $2191(1)
  ]
};
const fill$002Dchars = {
  A: [
    $21E8(1),
    $21E9(23),
    $2192(2),
    $2191(10),
    $2192(8),
    $2193(1),
    $2190(7),
    $2193(10),
    $2190(3),
    $2191(1),
    $21E8(2),
    $21E7(20),
    $2192(8),
    $2193(1),
    $2190(7),
    $2193(7),
    $2190(1),
    $2191(8),
    $21E8(8),
    $21E9(20),
    $2192(2),
    $2191(22),
    $2192(1),
    $2193(23),
    $2190(3),
    $2191(1)
  ],
  B: [
    $21E8(1),
    $21E9(23),
    $2192(12),
    $2191(22),
    $2192(1),
    $2193(23),
    $2190(13),
    $2191(1),
    $21E8(2),
    $21E7(20),
    $2192(8),
    $2193(1),
    $2190(7),
    $2193(7),
    $2190(1),
    $2191(8),
    $21E8(0),
    $21E9(10),
    $2192(8),
    $2193(1),
    $2190(7),
    $2193(7),
    $2190(1),
    $2191(8)
  ],
  C: [
    $21E8(1),
    $21E9(23),
    $2192(12),
    $2191(7),
    $2192(1),
    $2193(8),
    $2190(13),
    $2191(1),
    $21E8(2),
    $21E7(20),
    $2192(8),
    $2193(1),
    $2190(7),
    $2193(17),
    $2190(1),
    $2191(18),
    $21E8(10),
    $21E7(2),
    $2192(1),
    $2193(8),
    $2190(3),
    $2191(1),
    $2192(2),
    $2191(7)
  ],
  D: [
    $21E8(1),
    $21E9(23),
    $2192(12),
    $2191(22),
    $2192(1),
    $2193(23),
    $2190(13),
    $2191(1),
    $21E8(2),
    $21E7(20),
    $2192(8),
    $2193(1),
    $2190(7),
    $2193(17),
    $2190(1),
    $2191(18)
  ],
  E: [
    $21E8(1),
    $21E9(23),
    $2192(10),
    $2191(2),
    $2192(1),
    $2193(3),
    $2190(11),
    $2191(1),
    $21E8(2),
    $21E7(20),
    $2192(8),
    $2191(2),
    $2192(1),
    $2193(3),
    $2190(8),
    $2193(7),
    $2190(1),
    $2191(8),
    $21E8(0),
    $21E9(10),
    $2192(8),
    $2191(2),
    $2192(1),
    $2193(3),
    $2190(8),
    $2193(7),
    $2190(1),
    $2191(8)
  ],
  G: [
    $21E8(1),
    $21E9(23),
    $2192(12),
    $2191(12),
    $2192(1),
    $2193(13),
    $2190(13),
    $2191(1),
    $21E8(2),
    $21E7(20),
    $2192(10),
    $2191(2),
    $2192(1),
    $2193(3),
    $2190(10),
    $2193(17),
    $2190(1),
    $2191(18)
  ],
  H: [
    $21E8(1),
    $21E9(23),
    $2192(2),
    $2191(10),
    $2192(8),
    $2193(1),
    $2190(7),
    $2193(10),
    $2190(3),
    $2191(1),
    $21E8(2),
    $21E7(22),
    $2192(1),
    $2193(10),
    $2190(1),
    $2191(10),
    $21E8(10),
    $21E9(0),
    $2192(1),
    $2193(23),
    $2190(3),
    $2191(1),
    $2192(2),
    $2191(22)
  ],
  I: [
    $21E8(1),
    $21E9(23),
    $2192(2),
    $2191(22),
    $2192(1),
    $2193(23),
    $2190(3),
    $2191(1)
  ],
  M: [
    $21E8(1),
    $21E9(23),
    $2192(2),
    $2191(20),
    $2192(7),
    $2193(1),
    $2190(6),
    $2193(20),
    $2190(3),
    $2191(1),
    $21E8(9),
    $21E9(0),
    $2192(2),
    $2191(20),
    $2192(7),
    $2193(1),
    $2190(6),
    $2193(20),
    $2190(3),
    $2191(1),
    $21E8(9),
    $21E9(0),
    $2192(2),
    $2191(22),
    $2192(1),
    $2193(23),
    $2190(3),
    $2191(1)
  ],
  N: [
    $21E8(1),
    $21E9(23),
    $2192(2),
    $2191(20),
    $2192(8),
    $2193(1),
    $2190(7),
    $2193(20),
    $2190(3),
    $2191(1),
    $21E8(10),
    $21E9(0),
    $2192(2),
    $2191(22),
    $2192(1),
    $2193(23),
    $2190(3),
    $2191(1)
  ],
  R: [
    $21E8(1),
    $21E9(23),
    $2192(2),
    $2191(10),
    $2192(8),
    $2193(1),
    $2190(7),
    $2193(10),
    $2190(3),
    $2191(1),
    $21E8(2),
    $21E7(20),
    $2192(8),
    $2193(1),
    $2190(7),
    $2193(7),
    $2190(1),
    $2191(8),
    $21E8(8),
    $21E9(20),
    $2192(2),
    $2191(22),
    $2192(1),
    $2193(23),
    $2190(3),
    $2191(1)
  ],
  S: [
    $21E8(1),
    $21E9(13),
    $2192(8),
    $2193(1),
    $2190(8),
    $2191(1),
    $21E8(0),
    $21E9(10),
    $2192(10),
    $2191(12),
    $2192(1),
    $2193(13),
    $2190(11),
    $2191(1),
    $21E8(2),
    $21E7(20),
    $2192(8),
    $2191(2),
    $2192(1),
    $2193(3),
    $2190(8),
    $2193(7),
    $2190(1),
    $2191(8)
  ],
  V: [
    $21E8(1),
    $21E9(23),
    $2192(12),
    $2191(22),
    $2192(1),
    $2193(23),
    $2190(13),
    $2191(1),
    $21E8(2),
    $21E7(22),
    $2192(1),
    $2193(20),
    $2190(1),
    $2191(20)
  ]
};
const update = positions => dir => (() => {
  const x = S.fst(positions[0]);
  const y = S.snd(positions[0]);
  return [
    dir[0] === Symbol.for('h') ? S.Pair(x + dir[1])(y) : dir[0] === Symbol.for('v') ? S.Pair(x)(y + dir[1]) : S.Pair(x + dir[1][0])(y + dir[1][1]),
    ...positions
  ];
})();
const reset = path => (() => {
  const paths = S.extend(S.I)(S.reduce(update)([S.Pair(0)(0)])(path));
  const xs = S.chain(S.map(S.fst))(paths);
  const ys = S.chain(S.map(S.snd))(paths);
  const dx = S.reduce(S.max)(0)(xs) - xs[0];
  const dy = 0 - ys[0];
  return [
    Symbol.for('m'),
    [
      dx,
      dy
    ]
  ];
})();
const paths = chars => [
  ...chars.slice(0, 1).flatMap(char => [
    [
      Symbol.for('M'),
      [
        0,
        0
      ]
    ],
    ...char,
    reset(char)
  ]),
  ...chars.slice(1).flatMap(char => [
    [
      Symbol.for('m'),
      [
        6,
        0
      ]
    ],
    ...char,
    reset(char)
  ])
];
const chars = Array.from('DAVIDCHAMBERSDESIGN');
const mask = [path({
    d: render(paths(chars.map(char => mask$002Dchars[char]))),
    fill: '#000',
    ['fill-rule']: 'evenodd'
  })];
const fill = [
  path({
    d: render(paths(chars.map(char => line$002Dchars[char]))),
    fill: '#999'
  }),
  path({
    d: render(paths(chars.map(char => fill$002Dchars[char]))),
    fill: '#666'
  })
];
const default_ = {
  mask: mask,
  fill: fill
};
export default default_;
export {
  fill,
  mask
};
