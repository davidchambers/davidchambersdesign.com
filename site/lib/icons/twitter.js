import {
  linearGradient,
  path,
  stop
} from '../elements.js';
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
} from '../orthogonal.js';
const a = rx$002Dry => {
  return angle => large$002Darc$002Dflag => sweep$002Dflag => dx$002Ddy => [
    Symbol.for('a'),
    rx$002Dry,
    angle,
    large$002Darc$002Dflag,
    sweep$002Dflag,
    dx$002Ddy
  ];
};
const twitter = [
  linearGradient({
    [Symbol.for('id')]: 'gradient',
    [Symbol.for('x1')]: '50%',
    [Symbol.for('y1')]: '0%',
    [Symbol.for('x2')]: '50%',
    [Symbol.for('y2')]: '100%'
  })([
    stop({
      [Symbol.for('stop-color')]: '#96ecfd',
      [Symbol.for('offset')]: '0%'
    }),
    stop({
      [Symbol.for('stop-color')]: '#14dff0',
      [Symbol.for('offset')]: '100%'
    })
  ]),
  path({
    [Symbol.for('stroke')]: '#fff',
    [Symbol.for('stroke-width')]: 1,
    [Symbol.for('fill')]: 'url(#gradient)',
    [Symbol.for('d')]: render([
      $21E8(3),
      $21E9(3),
      a([
        2,
        2
      ])(0)(0)(1)([
        4,
        0
      ]),
      $2193(1),
      $2192(4),
      a([
        2,
        2
      ])(0)(0)(1)([
        0,
        4
      ]),
      $2190(4),
      $2193(2),
      a([
        1,
        1
      ])(0)(0)(0)([
        1,
        1
      ]),
      $2192(3),
      a([
        2,
        2
      ])(0)(0)(1)([
        0,
        4
      ]),
      $2190(4),
      a([
        4,
        4
      ])(0)(0)(1)([
        -4,
        -4
      ]),
      $2191(8)
    ])
  })
];
export default twitter;
