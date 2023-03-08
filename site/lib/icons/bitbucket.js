import { path } from '../elements.js';
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
const bucket = [
  _$21E8(0),
  _$21E9(0),
  _$2193(2),
  _$2192(1),
  _$2193(6),
  _$2192(1),
  _$2193(6),
  _$2192(1),
  _$2193(1),
  _$2192(2),
  _$2193(1),
  _$2192(6),
  _$2191(1),
  _$2192(2),
  _$2191(1),
  _$2192(1),
  _$2191(6),
  _$2192(1),
  _$2191(6),
  _$2192(1),
  _$2191(2),
  _$2190(16)
];
const _sticky$002Dnote = [
  _$21E8(4),
  _$21E9(1),
  _$2192(8),
  _$2193(7),
  _$2190(8),
  _$2191(7)
];
const symbol = [
  _$21E8(6),
  _$21E9(2),
  _$2192(1),
  _$2193(5),
  _$2192(2),
  _$2191(5),
  _$2192(1),
  _$2193(1),
  _$2190(4),
  _$2191(1),
  _$21E8(0),
  _$21E9(2),
  _$2192(4),
  _$2193(2),
  _$2190(4),
  _$2191(2)
];
const _sticky$002Dtape = [
  _$21E8(7),
  _$21E9(0),
  _$2192(2),
  _$2193(3),
  _$2190(2),
  _$2191(3)
];
const bitbucket = [
  path({
    [Symbol.for('fill')]: '#27c',
    [Symbol.for('d')]: render(bucket)
  }),
  path({
    [Symbol.for('fill')]: '#ee7',
    [Symbol.for('d')]: render(_sticky$002Dnote)
  }),
  path({
    [Symbol.for('fill')]: '#a7a',
    [Symbol.for('d')]: render(symbol)
  }),
  path({
    [Symbol.for('fill')]: '#fff',
    [Symbol.for('d')]: render(_sticky$002Dtape),
    [Symbol.for('opacity')]: 0.25
  })
];
export default bitbucket;
