import {p, blockquote, a} from "../elements.js";
import datetime from "../datetime.js";
const body = [p([a({
  href: "http://www.youtube.com/watch?v=A6-wA-7QIeE"
})(["Dieter Rams – Gestalten"])]), blockquote([p(["The media have to learn [...] that the spectacular things are not\n      the important things – the unspectacular things are the important\n      things, especially in the future."])]), p(["via ", a({
  href: "http://kottke.org/"
})(["kottke"])])];
export default {
  id: 62,
  slug: "dieter-rams-video-interview",
  title: ["Dieter Rams video interview"],
  datetime: datetime("2010-07-20 19:30:00 (Pacific/Auckland)"),
  tags: ["design", "video"],
  body
};
