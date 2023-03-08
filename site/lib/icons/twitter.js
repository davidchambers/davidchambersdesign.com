import {
  linearGradient,
  path,
  stop
} from '../elements.js';
import {
  render,
  _$21E6,
  _$21E8,
  _$21E7,
  _$21E9,
  _$2190,
  _$2192,
  _$2191,
  _$2193
} from '../orthogonal.js';
const a = function a(_rx$002Dry) {
  return angle => _large$002Darc$002Dflag => _sweep$002Dflag => _dx$002Ddy => [
    Symbol.for('a'),
    _rx$002Dry,
    angle,
    _large$002Darc$002Dflag,
    _sweep$002Dflag,
    _dx$002Ddy
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
      _$21E8(3),
      _$21E9(3),
      a([
        2,
        2
      ])(0)(0)(1)([
        4,
        0
      ]),
      _$2193(1),
      _$2192(4),
      a([
        2,
        2
      ])(0)(0)(1)([
        0,
        4
      ]),
      _$2190(4),
      _$2193(2),
      a([
        1,
        1
      ])(0)(0)(0)([
        1,
        1
      ]),
      _$2192(3),
      a([
        2,
        2
      ])(0)(0)(1)([
        0,
        4
      ]),
      _$2190(4),
      a([
        4,
        4
      ])(0)(0)(1)([
        -4,
        -4
      ]),
      _$2191(8)
    ])
  })
];
export default twitter;
