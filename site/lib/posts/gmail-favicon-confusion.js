import {p, a, code} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Gmail currently serves up two possible favicons, a 16x16 ", code(["shortcut icon"]), " and a 32x32 ", code(["icon"]), ".\n    I've no idea why the latter is included, but my browser\n    is happy to accept either version, which can lead to a\n    rather amusing situation."]), captioned$002Dimages([{
  alt: "Browser tabs featuring different Gmail icons",
  src: "/images/posts/63/gmail-icons.png",
  caption: ["Scaled down 32x32 icon (left) and regular favicon"]
}]), p(["Most days when Gmail loads I get the favicon, but I've had a couple\n    of extended periods of seeing the other version instead. I'd even\n    wondered whether Google was undertaking some A/B testing, although\n    this seemed rather far-fetched. I now believe that there's a race\n    condition, and that the smaller image usually wins this race."]), p(["I far prefer the 32x32 version (it makes the favicon look anaemic),\n    but when I had a close look at it I was upset by its sloppiness."]), captioned$002Dimages([{
  alt: "32x32 Gmail icon at 1000%",
  src: "/images/posts/63/gmail-icon-32*10.png",
  caption: ["32x32 Gmail icon at 1000%"]
}]), p([a({
  href: "http://blog.cocoia.com/"
})(["Sebastiaan de With"]), "\n    would not stand for this!"])];
export default {
  id: 63,
  slug: "gmail-favicon-confusion",
  title: ["Gmail's favicon confusion"],
  datetime: datetime("2010-07-21 10:56:00 (Pacific/Auckland)"),
  tags: ["design", "gmail"],
  body
};
