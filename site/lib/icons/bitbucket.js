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
const bucket = [
  $21E8(0),
  $21E9(0),
  $2193(2),
  $2192(1),
  $2193(6),
  $2192(1),
  $2193(6),
  $2192(1),
  $2193(1),
  $2192(2),
  $2193(1),
  $2192(6),
  $2191(1),
  $2192(2),
  $2191(1),
  $2192(1),
  $2191(6),
  $2192(1),
  $2191(6),
  $2192(1),
  $2191(2),
  $2190(16)
];
const sticky$002Dnote = [
  $21E8(4),
  $21E9(1),
  $2192(8),
  $2193(7),
  $2190(8),
  $2191(7)
];
const symbol = [
  $21E8(6),
  $21E9(2),
  $2192(1),
  $2193(5),
  $2192(2),
  $2191(5),
  $2192(1),
  $2193(1),
  $2190(4),
  $2191(1),
  $21E8(0),
  $21E9(2),
  $2192(4),
  $2193(2),
  $2190(4),
  $2191(2)
];
const sticky$002Dtape = [
  $21E8(7),
  $21E9(0),
  $2192(2),
  $2193(3),
  $2190(2),
  $2191(3)
];
const bitbucket = [
  path({
    [Symbol.for('fill')]: '#27c',
    [Symbol.for('d')]: render(bucket)
  }),
  path({
    [Symbol.for('fill')]: '#ee7',
    [Symbol.for('d')]: render(sticky$002Dnote)
  }),
  path({
    [Symbol.for('fill')]: '#a7a',
    [Symbol.for('d')]: render(symbol)
  }),
  path({
    [Symbol.for('fill')]: '#fff',
    [Symbol.for('d')]: render(sticky$002Dtape),
    [Symbol.for('opacity')]: 0.25
  })
];
export default bitbucket;
