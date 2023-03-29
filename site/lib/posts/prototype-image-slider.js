import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock, update} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => Prelude["match'"](type)(_ => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude.filter(x => Prelude.not(predicate(x))),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const excerpt = [p(["In my post titled ", a({
  href: "/captions-over-images/"
})(["Captions over images"]), "\n    I advocate the use of definition lists for captioning images.\n    Earlier today I was asked whether this meaningful markup could\n    be used in conjunction with an \"image slider\" such as ", a({
  href: "http://cssglobe.com/post/4004/easy-slider-15-the-easiest-jquery-plugin-for-sliding"
})(["Easy Slider 1.5"]), "."]), p(["I had a look at the Easy Slider source code and decided to\n    write my own image slider using Prototype rather than hacking\n    someone else's code to pieces. It's a proof of concept rather\n    than a full-blown \"plugin\", but it demonstrates that such\n    functionality is achievable using elegant, meaningful markup."]), p(["Check out the ", a({
  href: "/examples/prototype-image-slider/"
})(["Prototype image slider demo"]), " to see the code in action."])];
const body = [...excerpt, update(datetime("2009-09-17")("01:17:00")("Pacific/Auckland"))([p(["I noticed that the script was failing miserably in Safari,\n      which didn't like the following line:"]), code$002Dblock("javascript")(`li: new Element('li', { class: 'prev' }),
`), p(["Wrapping the word \"class\" in quotes as per this ", a({
  href: "http://www.prototypejs.org/2007/5/12/dom-builder#comment-15777"
})(["recommendation by Tobie Langel"]), " did the trick!"])]), h3$0027({
  id: "usage"
})(["Usage"]), p(["First, you'll need to save a copy of ", a({
  href: "/examples/prototype-image-slider/prototype-image-slider.js"
})(["prototype-image-slider.js"]), "."]), p(["To create a new ", code(["Slider"]), " simply call the constructor.\n    The constructor requires one argument, either a DOM node or a string\n    that references a node's ID."]), code$002Dblock("javascript")(`new Slider('slider');
`), p(["There's nothing to prevent multiple image sliders from appearing\n    on a page. The following code turns each div with class of 'slider'\n    into a ", code(["Slider"]), " object."]), code$002Dblock("javascript")(`$$('div.slider').each(function (e) {
    new Slider(e);
})
`), p(["Of course, it's a good idea to wait until the page is ready to be\n    manipulated before... er... manipulating the page."]), code$002Dblock("javascript")(`document.observe('dom:loaded', function () {
    $$('div.slider').each(function (e) {
        new Slider(e);
    });
});
`), p(["To provide a small degree of flexibility, the constructor accepts\n    two optional arguments: a float specifying the duration of each\n    transition, and an integer specifying the number of the slide to\n    be displayed first. The default values are 1.0 and 0 (slides are\n    numbered from zero)."]), code$002Dblock("javascript")(`new Slider('slider', 0.5);     // faster transitions
new Slider('slider', 1.0, 3);  // fourth slide displayed first
new Slider('slider', 1.0, -1); // last slide displayed first
new Slider('slider', 1.5, -1); // slower transitions; last slide displayed first
`), p(["If you find this code useful and would like me to flesh it out,\n    let me know."]), update(datetime("2009-09-21")("11:53:00")("Pacific/Auckland"))([p(["I neglected to mention that this code also requires ", a({
  href: "http://script.aculo.us/"
})(["script.aculo.us"]), "."])])];
export default {
  id: 26,
  slug: "prototype-image-slider",
  title: ["Prototype image slider"],
  datetime: datetime("2009-09-16")("23:43:00")("Pacific/Auckland"),
  tags: ["css", "html", "javascript", "meaningful-markup", "prototype"],
  body
};
