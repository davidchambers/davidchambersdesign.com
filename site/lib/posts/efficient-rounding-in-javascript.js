import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock} from "../components.js";
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
const body = [p(["So you have some number, ", code(["x"]), ", which you want to round\n    to the nearest integer. Easy, right?"]), code$002Dblock("javascript")(`x = Math.round(x);
`), p(["Sure, but is this the fastest option? I think not."]), code$002Dblock("javascript")(`x = x < 0 ? x - 0.5 >> 0 : x + 0.5 >> 0;
`), p(["What the heck's going on here? ", code([">>"]), " is JavaScript's\n    right shift operator. It shifts a number's binary representation ", code(["n"]), " bits to the right, where ", code(["n"]), " is the\n    value to the right of the operator. Since ", code(["n"]), " is ", code(["0"]), " in this case, no shifting will occur, although ", strong(["the resulting value will be an integer"]), "."]), p(["Note that this approach results in ", code(["-82.5"]), " being\n    rounded to ", code(["-83"]), "."]), p(["If, for some reason, your code calls ", code(["Math.round()"]), "\n    millions of times, it may be worth investigating the bitwise\n    approach to avoid the overhead of all those function calls."]), p(["Stick to ", code(["Math.round()"]), " the rest of the\n    time, though, as it makes for much clearer code. ", strong(["Never optimize prematurely."])])];
export default {
  id: 68,
  slug: "efficient-rounding-in-javascript",
  title: ["Efficient rounding in JavaScript"],
  datetime: datetime("2010-08-31")("22:20:00")("Pacific/Auckland"),
  tags: ["javascript", "optimization", "performance"],
  body
};
