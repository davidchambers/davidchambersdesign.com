import luxon from 'luxon';
const datetime = date => time => zone => luxon.DateTime.fromFormat(`${ date } ${ time } (${ Symbol.keyFor(zone) })`, 'yyyy-MM-dd HH:mm:ss (z)', { ['setZone']: true });
export default datetime;
