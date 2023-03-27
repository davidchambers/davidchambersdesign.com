import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, construct, flip, map, not} = Prelude;
const body = [p([strong(["JavaScript does not have associative arrays."]), "\n    (This will be old news to many.)"]), p(["Confusion arises from the fact that array syntax in JavaScript is\n    very similar to array syntax in PHP, a language that ", em(["does"]), "\n    have associative arrays. Additionally, ", strong(["any object in\n    JavaScript can be treated as an associative array"]), ". This means\n    that if one creates a JavaScript ", code(["Array"]), " object and\n    proceeds to use PHP's associative array syntax in an attempt to\n    add items to it, one ", em(["will"]), " succeed in assigning it\n    attribute–value pairs. The object in question need not be an ", code(["Array"]), " for this to work, though, so for the sake of\n    clarity using a vanilla ", code(["Object"]), " is advisable."]), p(["To gain a more detailed understanding of why JavaScript ", em(["appears"]), " to have associative arrays, read ", a({
  href: "http://andrewdupont.net/2006/05/18/javascript-associative-arrays-considered-harmful/"
})([`JavaScript "Associative Arrays" Considered Harmful`]), "."])];
export default {
  id: 19,
  slug: "associative-arrays-in-javascript",
  title: ["Associative arrays in JavaScript"],
  datetime: datetime("2009-06-29")("19:14:00")("Pacific/Auckland"),
  tags: ["best-practice", "javascript"],
  body
};
