import sanctuaryEnv from '../environments/sanctuary.env.js';
import {datetime} from '../lib/index.js';


export default {
  ...sanctuaryEnv,
  'datetime': zone => time => date => datetime ([date, time, zone]),
  'format-datetime': format => datetime => datetime.toFormat (format),
  'iso': datetime => datetime.toISO (),
};
