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
const wAw = [
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
];
const wBw = [
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
];
const wCw = [
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
];
const wDw = [
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
];
const wEw = [
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
];
const wGw = [
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
];
const wHw = [
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
];
const wIw = [
  $2192(4),
  $2193(24),
  $2190(4),
  $2191(24)
];
const wMw = [
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
];
const wNw = [
  $2192(14),
  $2193(24),
  $2190(4),
  $2191(20),
  $2190(6),
  $2193(20),
  $2190(4),
  $2191(24)
];
const wRw = wAw;
const wSw = [
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
];
const wVw = [
  $2192(4),
  $2193(20),
  $2192(6),
  $2191(20),
  $2192(4),
  $2193(24),
  $2190(14),
  $2191(24)
];
const xAx = [
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
];
const xBx = [
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
];
const xCx = [
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
];
const xDx = [
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
];
const xEx = [
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
];
const xGx = [
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
];
const xHx = [
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
];
const xIx = [
  $2192(4),
  $2193(1),
  $2190(3),
  $2193(23),
  $2190(1),
  $2191(24)
];
const xMx = [
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
];
const xNx = [
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
];
const xRx = xAx;
const xSx = [
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
];
const xVx = [
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
];
const yAy = [
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
];
const yBy = [
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
];
const yCy = [
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
];
const yDy = [
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
];
const yEy = [
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
];
const yGy = [
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
];
const yHy = [
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
];
const yIy = [
  $21E8(1),
  $21E9(23),
  $2192(2),
  $2191(22),
  $2192(1),
  $2193(23),
  $2190(3),
  $2191(1)
];
const yMy = [
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
];
const yNy = [
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
];
const yRy = yAy;
const ySy = [
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
];
const yVy = [
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
];
const update = positions => {
  return dir => (() => {
    const x = S.fst(positions[0]);
    const y = S.snd(positions[0]);
    return [
      dir[0] === Symbol.for('h') ? S.Pair(x + dir[1])(y) : dir[0] === Symbol.for('v') ? S.Pair(x)(y + dir[1]) : S.Pair(x + dir[1][0])(y + dir[1][1]),
      ...positions
    ];
  })();
};
const reset = path => {
  return (() => {
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
};
const paths = S.pipe([
  S.map(char => [
    ...char,
    reset(char)
  ]),
  S.intercalate([[
      Symbol.for('m'),
      [
        6,
        0
      ]
    ]]),
  S.prepend([
    Symbol.for('M'),
    [
      0,
      0
    ]
  ])
]);
const wcharsw = paths([
  wDw,
  wAw,
  wVw,
  wIw,
  wDw,
  wCw,
  wHw,
  wAw,
  wMw,
  wBw,
  wEw,
  wRw,
  wSw,
  wDw,
  wEw,
  wSw,
  wIw,
  wGw,
  wNw
]);
const xcharsx = paths([
  xDx,
  xAx,
  xVx,
  xIx,
  xDx,
  xCx,
  xHx,
  xAx,
  xMx,
  xBx,
  xEx,
  xRx,
  xSx,
  xDx,
  xEx,
  xSx,
  xIx,
  xGx,
  xNx
]);
const ycharsy = paths([
  yDy,
  yAy,
  yVy,
  yIy,
  yDy,
  yCy,
  yHy,
  yAy,
  yMy,
  yBy,
  yEy,
  yRy,
  ySy,
  yDy,
  yEy,
  ySy,
  yIy,
  yGy,
  yNy
]);
const mask = [path({
    ['d']: render(wcharsw),
    ['fill']: '#000',
    ['fill-rule']: 'evenodd'
  })];
const fill = [
  path({
    ['d']: render(xcharsx),
    ['fill']: '#999'
  }),
  path({
    ['d']: render(ycharsy),
    ['fill']: '#666'
  })
];
const default_ = {
  ['mask']: mask,
  ['fill']: fill
};
export default default_;
export {
  fill,
  mask
};
