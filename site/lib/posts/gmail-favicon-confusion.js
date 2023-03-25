import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, flip, map, not} = Prelude;
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
  datetime: datetime("2010-07-21")("10:56:00")("Pacific/Auckland"),
  tags: ["design", "gmail"],
  body
};
