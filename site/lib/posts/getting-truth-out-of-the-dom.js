import {p, a, em} from "../elements.js";
import datetime from "../datetime.js";
const body = [p(["Recording of Yehuda Katz's presentation from Bay Area jQuery Conf 2011."]), p([a({
  href: "http://vimeo.com/22687694"
})(["Getting truth out of the DOM"])]), p(["While watching this it ", em(["finally"]), " became clear to me why\n    storing state in the DOM is a terrible idea for complex applications.\n    The approach comes unstuck as soon as one wishes to display an entity\n    more than once in a view (such as in a list–details split view)."])];
export default {
  id: 87,
  slug: "getting-truth-out-of-the-dom",
  title: ["Getting truth out of the DOM – Yehuda Katz"],
  datetime: datetime("2011-05-24 22:15:00 (America/Los_Angeles)"),
  tags: ["best-practice", "javascript", "mvc", "video"],
  body
};
