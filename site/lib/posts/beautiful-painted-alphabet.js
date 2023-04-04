import {a, blockquote, dd, dl, dt, p} from "../elements.js";
import datetime from "../datetime.js";
const body = [p(["I came across this recently while browsing ", a({
  href: "http://markboulton.co.uk/"
})(["Mark Boulton's site"]), ".\n    The style and control of Job's hand is played off against\n    the exuberance of his son's approach. An upbeat soundtrack\n    accompanies the performance."]), dl([dt([a({
  href: "http://www.youtube.com/watch?v=ajjg3faIQ5A"
})(["abcdefghijklmnopqrstuvwxyz"])]), dd(["Video by Job & Roel Wouters"])]), p(["From the director:"]), blockquote([p(["Job and Gradus are both ambitious concerning letters.\n      Spontaneous jam sessions in our studio inspired us to\n      make this film about the fun [of] drawing letters."])])];
export default {
  id: 1,
  slug: "beautiful-painted-alphabet",
  title: ["Beautiful painted alphabet"],
  datetime: datetime("2008-08-22")("01:56:00")("Pacific/Auckland"),
  tags: ["design", "typography", "video"],
  body
};
