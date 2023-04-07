import {DateTime} from "luxon";
export default formatted => DateTime.fromFormat(formatted, "yyyy-MM-dd HH:mm:ss (z)", {
  setZone: true
});
