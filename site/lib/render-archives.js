import S from "sanctuary";
import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "./elements.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
const render$002Dpost = post => li([a({
  href: `/${post.slug}`
})(post.title), " ", time({
  datetime: post.datetime.toISO()
})([post.datetime.toFormat("d MMMM y | h:mm") + post.datetime.toFormat("a").toLowerCase()])]);
const render$002Dsection = posts => li([h2([posts[0]["formatted-date"]]), ol(Prelude.map(render$002Dpost)(posts))]);
const render$002Darchives = posts => (archives => [h1(["Archives"]), ol$0027({
  class: "archives"
})(archives)])(map(render$002Dsection)(S.groupBy(this$ => that => this$["formatted-date"] === that["formatted-date"])(S.sortBy(post => -post.datetime)(map(post => ({
  ...post,
  ["formatted-date"]: post.datetime.toFormat("MMMM y")
}))(posts)))));
export default render$002Darchives;
