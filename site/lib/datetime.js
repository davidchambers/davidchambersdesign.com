import luxon from "luxon";
const apply = f => args => f.apply(null, args);
const datetime = date => time => zone => apply(luxon.DateTime.fromFormat)([date + " " + time + " (" + zone + ")", "yyyy-MM-dd HH:mm:ss (z)", {
  setZone: true
}]);
export default datetime;
