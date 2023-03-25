import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {captioned$002Dimages, update, $2014} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {chain, concat, map, not} = Prelude;
const body = [update(datetime("2009-08-28")("18:12:00")("Pacific/Auckland"))([p(["An update to this post has been published: ", a({
  href: "/tiny-calendar-icons-sprite/"
})(["Tiny calendar icons sprite"]), "."])]), p(["I've always enjoyed creating icons in Photoshop. Not the gorgeous, often\n    richly detailed icons that grace OS X applications", $2014, "although I would\n    love to learn to create these as well", $2014, "but icons designed pixel by\n    pixel for display at very small scales."]), p(["Working with a tiny canvas and a limited palette (I restrict myself to\n    hexadecimal colours that can be written in shorthand) is a challenge,\n    but I find the experience rewarding. I recently redesigned this site's\n    archives page, for which I created a set of 16 x 16px calendar icons."]), captioned$002Dimages([{
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
  datetime: datetime("2009-04-24")("21:24:00")("Pacific/Auckland"),
  tags: ["design", "icons"],
  body
};
