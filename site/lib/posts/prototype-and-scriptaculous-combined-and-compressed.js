import {a, code, li, p, strong, ul} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const body = [p([strong(["Nothing new here."]), " I've combined ", a({
  href: "http://prototypejs.org/2009/9/1/prototype-1-6-1-released"
})(["Prototype 1.6.1"]), " and the various files that make up ", a({
  href: "http://script.aculo.us/downloads"
})(["script.aculo.us 1.8.3"]), "\n    (except unittest.js) into one file, which I've minified using the ", a({
  href: "http://developer.yahoo.com/yui/compressor/"
})(["YUI Compressor"]), ". Further compression has been achieved by gzipping\n    the minified file. All three versions are available for download:"]), ul([li([a({
  href: "http://static.davidchambersdesign.com/scripts/prototype+scriptaculous.js?p=1.6.1&s=1.8.3"
})(["prototype+scriptaculous.js"])]), li([a({
  href: "http://static.davidchambersdesign.com/scripts/prototype+scriptaculous.min.js?p=1.6.1&s=1.8.3"
})(["prototype+scriptaculous.min.js"])]), li([a({
  href: "http://static.davidchambersdesign.com/scripts/prototype+scriptaculous.min.js.gz?p=1.6.1&s=1.8.3"
})(["prototype+scriptaculous.min.js.gz"])])]), p(["I suggest including the Prototype and script.aculo.us version\n    numbers in the ", code(["src"]), ":"]), code$002Dblock("html")(`<script src="/scripts/prototype+scriptaculous.min.js?p=1.6.1&amp;s=1.8.3"></script>
`), p(["This prevents caching issues that might otherwise arise\n    upon updating to a newer version of prototype+scriptaculous\n    (I'll update the three files", $2014, "and this post", $2014, "each time a new version of Prototype is released)."])];
export default {
  id: 32,
  slug: "prototype-and-scriptaculous-combined-and-compressed",
  title: ["Prototype and script.aculo.us, combined and compressed"],
  datetime: datetime("2009-11-09")("23:14:00")("Pacific/Auckland"),
  tags: ["javascript", "optimization", "prototype", "script.aculo.us"],
  body
};
