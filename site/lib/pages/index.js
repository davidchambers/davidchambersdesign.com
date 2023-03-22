import about from './about.js';
import elam from './elam.js';
const Prelude = { map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f) };
const {map} = Prelude;
export default [
  about,
  elam
];
