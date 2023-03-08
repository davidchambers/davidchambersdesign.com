import luxon from 'luxon';
const datetime = function datetime(date) {
  return time => zone => luxon['DateTime']['fromFormat']((() => {
    return date + ' ' + time + ' (' + Symbol['keyFor'](zone) + ')';
  })(), 'yyyy-MM-dd HH:mm:ss (z)', { ['setZone']: true });
};
export default datetime;
