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
  reject: predicate => Prelude.filter(x => !predicate(x))
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, id, map, match, not, reject} = Prelude;
const body = [p(["On ", time({
  datetime: "2010-03-19T13:58-00:00"
})(["19 March 2010"]), ",\n    David Chambers wrote:"]), blockquote([p(["Hi Douglas,"]), p(["[...] Moments ago I used ", a({
  href: "http://www.jslint.com/"
})(["JSLint"]), "\n      for the first time; I plan to use it frequently\n      from this point forward. I have one question,\n      though, concerning the acceptability of extra\n      commas. Consider the following code snippet:"]), code$002Dblock("javascript")(`var ninja = {
    name: 'Hattori Hanzou Masashige',
    shuriken: 5,
    attack: function () {
        if (ninja.shuriken) {
            ninja.shuriken -= 1;
            window.alert('Hai-Ya!');
        }
    },
};
`), p(["JSLint returns an ", em(["extra comma"]), " error for the unnecessary\n      comma preceding the closing brace. I would argue, though, that this in\n      not an error. As far as I'm aware, this comma will not cause problems."]), p(["In fact, quite the opposite is true. If one were to insert an\n      additional property or method after ", em(["attack"]), " one would\n      not need to remember to first add a comma. In Django it's considered\n      best practice to include a comma after every item (including the last)\n      in a one item per line collection for this very reason."]), p(["I thought I'd give you my two cents, anyway. :)"]), p(["Regards,"]), p(["David Chambers"])]), p(["On ", time({
  datetime: "2010-03-19T15:13-00:00"
})(["19 March 2010"]), ",\n    Douglas Crockford wrote:"]), blockquote([p(["Your awareness is incorrect. Have you tested on IE6?"])])];
export default {
  id: 46,
  slug: "extra-comma-considered-harmful",
  title: ["Extra comma considered harmful"],
  datetime: datetime("2010-03-29")("15:30:00")("Pacific/Auckland"),
  tags: ["best-practice", "javascript"],
  body
};
