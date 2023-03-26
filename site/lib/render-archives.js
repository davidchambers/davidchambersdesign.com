import S from "sanctuary";
import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "./elements.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, flip, map, not} = Prelude;
const render$002Dpost = ({slug, title, datetime}) => li([a({
  href: `/${slug}`
})(title), " ", time({
  datetime: Prelude._apply("toISO")([])(datetime)
})([Prelude._apply("toFormat")(["d MMMM y | h:mm"])(datetime) + Prelude._apply("toLowerCase")([])(Prelude._apply("toFormat")(["a"])(datetime))])]);
const render$002Dsection = posts => li([h2([posts[0]["formatted-date"]]), ol(Prelude.map(render$002Dpost)(posts))]);
const render$002Darchives = posts => (archives => [h1(["Archives"]), ol$0027({
  class: "archives"
})(archives)])(map(render$002Dsection)(S.groupBy(this$ => that => Object.is(that["formatted-date"], this$["formatted-date"]))(S.sortBy(post => -post.datetime)(map(post => ({
  ...post,
  ["formatted-date"]: Prelude._apply("toFormat")(["MMMM y"])(post.datetime)
}))(posts)))));
export default render$002Darchives;
