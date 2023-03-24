import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import datetime from "../datetime.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
const body = [p(["From Wikipedia on Mies van der Rohe's ", a({
  href: "http://en.wikipedia.org/wiki/Seagram_Building"
})(["Seagram Building"]), ":"]), blockquote([p(["[An] interesting feature of the Seagram Building is the window blinds.\n      As was common with International Style architects, Mies wanted the\n      building to have a uniform appearance. One aspect of a façade which\n      Mies disliked, was the disordered irregularity when window blinds are\n      drawn. Inevitably, people using different windows will draw blinds to\n      different heights, making the building appear disorganized. To reduce\n      this disproportionate appearance, Mies specified window blinds which\n      only operated in three positions – fully open, halfway open/closed,\n      or fully closed."])]), p(["This, taken from Werner Blaser's ", i(["Mies van der Rohe"]), ",\n    is also brilliant:"]), blockquote([p(["The plan of the brick villa is a good example of the\n      way in which Mies van der Rohe developed the art of\n      structure from the very beginning. The structure of\n      a brick wall begins with the smallest unit into which\n      the whole can be divided: the brick. The dimensions are\n      calculated in terms of the basic unit of the brick."])])];
export default {
  id: 64,
  slug: "man-after-my-own-heart",
  title: ["Man after my own heart"],
  datetime: datetime("2010-07-23")("00:07:00")("Pacific/Auckland"),
  tags: ["architecture", "design"],
  body
};
