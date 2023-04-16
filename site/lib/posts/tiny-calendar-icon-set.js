import {p, a} from "../elements.js";
import {captioned$002Dimages, update, $2014} from "../components.js";
import datetime from "../datetime.js";
const body = [update(datetime("2009-08-28 18:12:00 (Pacific/Auckland)"))([p(["An update to this post has been published: ", a({
  href: "/tiny-calendar-icons-sprite/"
})(["Tiny calendar icons sprite"]), "."])]), p(["I've always enjoyed creating icons in Photoshop. Not the gorgeous, often ", "richly detailed icons that grace OS X applications", $2014, "although I would ", "love to learn to create these as well", $2014, "but icons designed pixel by ", "pixel for display at very small scales."]), p(["Working with a tiny canvas and a limited palette (I restrict myself to ", "hexadecimal colours that can be written in shorthand) is a challenge, ", "but I find the experience rewarding. I recently redesigned this site's ", "archives page, for which I created a set of 16 x 16px calendar icons."]), captioned$002Dimages([{
  alt: "Calendar icons for every possible day of the month",
  src: "/images/posts/14/calendar-300pc.png",
  caption: ["Calendar icons shown at 300% of actual size"]
}, {
  alt: "Calendar icons for every possible day of the month",
  src: "/images/posts/14/calendar.png",
  caption: ["Calendar icons shown actual size"]
}]), p(["You are welcome to ", a({
  href: "/downloads/tiny-calendar-icon-set.zip"
})(["download the tiny calendar icon set"]), "."])];
export default {
  id: 14,
  slug: "tiny-calendar-icon-set",
  title: ["Tiny calendar icon set"],
  datetime: datetime("2009-04-24 21:24:00 (Pacific/Auckland)"),
  tags: ["design", "icons"],
  body
};
