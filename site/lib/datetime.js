import luxon from 'luxon';
const Prelude = { map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f) };
const datetime = date => time => zone => luxon.DateTime.fromFormat(`${ date } ${ time } (${ zone })`, 'yyyy-MM-dd HH:mm:ss (z)', { setZone: true });
export default datetime;
