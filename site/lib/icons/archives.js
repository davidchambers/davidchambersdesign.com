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
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain['fantasy-land/chain'](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f)
};
const {chain, map} = Prelude;
const base = [
  $21E8(0),
  $21E9(1),
  $2192(1),
  $2193(14),
  $2192(14),
  $2191(14),
  $2192(1),
  $2193(15),
  $2190(16),
  $2191(15)
];
const spiral = [
  $21E8(3),
  $21E9(0),
  $2192(1),
  $2193(1),
  $2190(1),
  $2191(1),
  $21E8(3),
  $21E9(0),
  $2192(1),
  $2193(1),
  $2190(1),
  $2191(1),
  $21E8(3),
  $21E9(0),
  $2192(1),
  $2193(1),
  $2190(1),
  $2191(1),
  $21E8(3),
  $21E9(0),
  $2192(1),
  $2193(1),
  $2190(1),
  $2191(1)
];
const header = [
  $21E8(1),
  $21E9(1),
  $2192(2),
  $2193(1),
  $2192(1),
  $2191(1),
  $2192(2),
  $2193(1),
  $2192(1),
  $2191(1),
  $2192(2),
  $2193(1),
  $2192(1),
  $2191(1),
  $2192(2),
  $2193(1),
  $2192(1),
  $2191(1),
  $2192(2),
  $2193(3),
  $2190(14),
  $2191(3)
];
const paper = [
  $21E8(1),
  $21E9(4),
  $2192(14),
  $2193(11),
  $2190(14),
  $2191(11)
];
const archives = [
  path({
    fill: '#da5',
    d: render(base)
  }),
  path({
    fill: '#333',
    d: render(spiral)
  }),
  path({
    fill: '#b00',
    d: render(header)
  }),
  path({
    fill: '#fff',
    d: render(paper)
  })
];
export default archives;
