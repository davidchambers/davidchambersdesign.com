import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  flip: f => y => x => f(x)(y),
  id: x => x,
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  match: type => type[Symbol.for("match")],
  not: b => !b,
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  reject: predicate => Prelude.filter(x => !predicate(x))
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, id, map, match, not, reduce, reduceRight, reject} = Prelude;
const body = [p(["When dealing with dates, it's not uncommon to need to convert an\n    integer into an ordinal number (1st, 2nd, 3rd, etc.). While making\n    improvements to ", a({
  href: "http://mango.io/wtf?"
})(["Mango"]), " recently\n    I wrote a function to do this, first in Python, later in JavaScript."]), h3(["Python"]), code$002Dblock("python")(`def ordinal(n):
    if 10 < n < 14: return u'%sth' % n
    if n % 10 == 1: return u'%sst' % n
    if n % 10 == 2: return u'%snd' % n
    if n % 10 == 3: return u'%srd' % n
    return u'%sth' % n
`), h3(["JavaScript"]), code$002Dblock("javascript")(`function ordinal(n) {
    if (10 < n && n < 14) return n + 'th';
    switch (n % 10) {
        case 1: return n + 'st';
        case 2: return n + 'nd';
        case 3: return n + 'rd';
        default: return n + 'th';
    }
}
`), p(["By special-casing 11, 12, and 13, the function becomes\n    incredibly simple."]), p(["I'm pleased to have found a context in which JavaScript's ", code(["switch"]), " statement is almost ", em(["elegant"]), ".\n    The problem, usually, is the need to ", code(["break"]), " to\n    prevent fall-through. When used within a function, though, the ", code(["return"]), " statement is able to perform this role, making\n    the JavaScript code almost as readable as the Python equivalent."])];
export default {
  id: 70,
  slug: "converting-integers-to-ordinals",
  title: ["Converting integers to ordinals"],
  datetime: datetime("2010-09-16")("13:00:00")("Pacific/Auckland"),
  tags: ["javascript", "programming", "python"],
  body
};
