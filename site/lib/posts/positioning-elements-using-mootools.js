import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
const body = [p(["I've spent the afternoon creating a custom scrollbar for a\n    products viewer which utilizes CSS transitions, reflections,\n    and other goodness."]), p(["Simple arithmetic dictates how long to make the scrollbar\n    and where to position it, but I could not get my theoretical\n    calculations to play out in the browser."]), p(["It turns out that I'd been calling the wrong MooTools method.\n    I'd been doing..."]), code$002Dblock("javascript")(`element.setStyle('left', offset);
`), p(["rather than..."]), code$002Dblock("javascript")(`element.setPosition({ x: offset });
`), p(["Frustratingly, ", code(["setStyle('left', offset)"]), " ", em(["appeared"]), " to work, but its behaviour was unpredictable.\n    I'm still confused by this, but at least I'm no longer stuck."])];
export default {
  id: 60,
  slug: "positioning-elements-using-mootools",
  title: ["Positioning elements using MooTools"],
  datetime: datetime("2010-07-19")("17:45:00")("Pacific/Auckland"),
  tags: ["javascript", "mootools"],
  body
};
