import S from 'sanctuary';
import { path } from '../elements.js';
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
const dates = S.map(d => path({
  [Symbol.for('fill-rule')]: Symbol.for('evenodd'),
  [Symbol.for('fill')]: '#000',
  [Symbol.for('d')]: render([
    $21E8(0),
    $21E9(0),
    ...d
  ])
}))([
  [
    $2192(4),
    $2193(7),
    $2190(4),
    $2191(7),
    $21E8(1),
    $21E9(1),
    $2192(2),
    $2193(5),
    $2190(2),
    $2191(5)
  ],
  [
    $2192(2),
    $2193(7),
    $2190(1),
    $2191(6),
    $2190(1),
    $2191(1)
  ],
  [
    $2192(4),
    $2193(4),
    $2190(3),
    $2193(2),
    $2192(3),
    $2193(1),
    $2190(4),
    $2191(4),
    $2192(3),
    $2191(2),
    $2190(3),
    $2191(1)
  ],
  [
    $2192(4),
    $2193(7),
    $2190(4),
    $2191(1),
    $2192(3),
    $2191(2),
    $2190(3),
    $2191(1),
    $2192(3),
    $2191(2),
    $2190(3),
    $2191(1)
  ],
  [
    $2192(1),
    $2193(3),
    $2192(2),
    $2191(3),
    $2192(1),
    $2193(7),
    $2190(1),
    $2191(3),
    $2190(3),
    $2191(4)
  ],
  [
    $2192(4),
    $2193(1),
    $2190(3),
    $2193(2),
    $2192(3),
    $2193(4),
    $2190(4),
    $2191(1),
    $2192(3),
    $2191(2),
    $2190(3),
    $2191(4)
  ],
  [
    $2192(4),
    $2193(1),
    $2190(3),
    $2193(2),
    $2192(3),
    $2193(4),
    $2190(4),
    $2191(7),
    $21E8(1),
    $21E9(4),
    $2192(2),
    $2193(2),
    $2190(2),
    $2191(2)
  ],
  [
    $2192(4),
    $2193(7),
    $2190(1),
    $2191(6),
    $2190(3),
    $2191(1)
  ],
  [
    $2192(4),
    $2193(7),
    $2190(4),
    $2191(7),
    $21E8(1),
    $21E9(1),
    $2192(2),
    $2193(2),
    $2190(2),
    $2191(2),
    $21E8(0),
    $21E9(3),
    $2192(2),
    $2193(2),
    $2190(2),
    $2191(2)
  ],
  [
    $2192(4),
    $2193(7),
    $2190(4),
    $2191(1),
    $2192(3),
    $2191(2),
    $2190(3),
    $2191(4),
    $21E8(1),
    $21E9(1),
    $2192(2),
    $2193(2),
    $2190(2),
    $2191(2)
  ]
]);
export default dates;
