import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
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
const body = [p(["JavaScript's regular expressions are less than awesome, sadly.\n    One limitation is the lack of start of string and end of string\n    anchors. In Perl, for example, ", code(["\\A"]), " matches the\n    start of a string, ", code(["\\Z"]), " the end."]), p(["Most of the time it's possible to get by with ", code(["^"]), " and ", code(["$"]), " which act like ", code(["\\A"]), " and ", code(["\\Z"]), " ", strong(["except in multiline mode"]), " where they match the start and\n    end of any line."]), p(["It's possible, though, to have a lookahead act as an end of string\n    anchor in multiline mode:"]), code$002Dblock("javascript")(`> /bar(?![\\s\\S])/m.test('foo\\nbar')
true
> /bar(?![\\s\\S])/m.test('foo\\nbar\\n')
false
> /bar(?![\\s\\S])/m.test('foo\\nbar\\nbaz')
false
`), p([code(["(?![\\s\\S])"]), " at the end of the pattern is equivalent to ", code(["\\Z"]), "."]), h3(["Start of string anchor?"]), p(["Unfortunately, since JavaScript offers lookahead but not lookbehind,\n    this approach can't be used to simulate ", code(["\\A"]), "."])];
export default {
  id: 86,
  slug: "end-of-string-anchor-in-javascript-regular-expressions",
  title: ["End of string anchor in JavaScript regular expressions"],
  datetime: datetime("2011-05-22")("18:30:00")("America/Los_Angeles"),
  tags: ["javascript", "regex", "regular-expressions"],
  body
};
