import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => Prelude["match'"](type)(_ => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude.filter(x => !predicate(x)),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {_apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const body = [p(["I was delighted to discover this \"trick\"\n    over on CSS-Tricks in a post titled ", a({
  href: "http://css-tricks.com/textarea-tricks/"
})(["Textarea Tricks"]), ".\n    (See, Chris, I ", em(["do"]), " like you!)"]), p(["Internet Explorer displays a (completely pointless) inactive scrollbar in\n    empty ", code(["textarea"]), " elements, unlike other browsers which wait\n    until a scrollbar is actually ", em(["required"]), " before displaying it."]), p(["As it turns out, there's a dead simple way to prevent this,\n    and once again its everybody's friend ", code(["overflow"]), "\n    to the rescue."]), code$002Dblock("css")(`textarea { overflow: auto; }
`), p(["The ", code(["overflow"]), " property seems to be a magical remedy\n    for a variety of different ailments, most significant of which\n    is the collapsing of an element whose children are all floated.\n    Applying ", code(["overflow: auto"]), " makes the element wrap its\n    children rather than letting them \"hang\"."]), p(["One thing that I sometimes ponder, though, is why ", code(["visible"]), "\n    was selected as the default ", code(["overflow"]), " value – it seems\n    inferior to ", code(["auto"]), " in most use cases."])];
export default {
  id: 59,
  slug: "remove-textarea-scrollbars-in-internet-explorer",
  title: ["Remove textarea scrollbars in Internet Explorer"],
  datetime: datetime("2010-07-18")("22:00:00")("Pacific/Auckland"),
  tags: ["css"],
  body
};
