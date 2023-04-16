import {DateTime} from "luxon";
export default function (formatted) {
  return DateTime.fromFormat(formatted, "yyyy-MM-dd HH:mm:ss (z)", {
    setZone: true
  });
}
