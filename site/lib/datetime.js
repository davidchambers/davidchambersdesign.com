import luxon from "luxon";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
const datetime = date => time => zone => luxon.DateTime.fromFormat(`${date} ${time} (${zone})`, "yyyy-MM-dd HH:mm:ss (z)", {
  setZone: true
});
export default datetime;
