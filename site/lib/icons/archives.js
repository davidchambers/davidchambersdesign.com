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
const base = [
  _$21E8(0),
  _$21E9(1),
  _$2192(1),
  _$2193(14),
  _$2192(14),
  _$2191(14),
  _$2192(1),
  _$2193(15),
  _$2190(16),
  _$2191(15)
];
const spiral = [
  _$21E8(3),
  _$21E9(0),
  _$2192(1),
  _$2193(1),
  _$2190(1),
  _$2191(1),
  _$21E8(3),
  _$21E9(0),
  _$2192(1),
  _$2193(1),
  _$2190(1),
  _$2191(1),
  _$21E8(3),
  _$21E9(0),
  _$2192(1),
  _$2193(1),
  _$2190(1),
  _$2191(1),
  _$21E8(3),
  _$21E9(0),
  _$2192(1),
  _$2193(1),
  _$2190(1),
  _$2191(1)
];
const header = [
  _$21E8(1),
  _$21E9(1),
  _$2192(2),
  _$2193(1),
  _$2192(1),
  _$2191(1),
  _$2192(2),
  _$2193(1),
  _$2192(1),
  _$2191(1),
  _$2192(2),
  _$2193(1),
  _$2192(1),
  _$2191(1),
  _$2192(2),
  _$2193(1),
  _$2192(1),
  _$2191(1),
  _$2192(2),
  _$2193(3),
  _$2190(14),
  _$2191(3)
];
const paper = [
  _$21E8(1),
  _$21E9(4),
  _$2192(14),
  _$2193(11),
  _$2190(14),
  _$2191(11)
];
const archives = [
  path({
    [Symbol.for('fill')]: '#da5',
    [Symbol.for('d')]: render(base)
  }),
  path({
    [Symbol.for('fill')]: '#333',
    [Symbol.for('d')]: render(spiral)
  }),
  path({
    [Symbol.for('fill')]: '#b00',
    [Symbol.for('d')]: render(header)
  }),
  path({
    [Symbol.for('fill')]: '#fff',
    [Symbol.for('d')]: render(paper)
  })
];
export default archives;
