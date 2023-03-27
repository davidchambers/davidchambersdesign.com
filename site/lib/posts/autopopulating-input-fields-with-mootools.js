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
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b,
  reject: predicate => Prelude.filter(x => !predicate(x))
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, map, not, reject} = Prelude;
const body = [p(["Early this year I wrote a post titled ", a({
  href: "/autopopulating-input-fields-with-prototype/"
})(["Auto-populating input fields with Prototype"]), ".\n    Looking at the code now, I realize that it's not very pretty.\n    I'm rewriting this site's JavaScript in MooTools, and the new\n    code is quite a bit more elegant."]), code$002Dblock("javascript")(`// provide input hints
window.addEvent('domready', function () {
    $$('input[placeholder]').addEvents({
        focus: function () {
            if (this.hasClass('placeholder')) {
                this.removeClass('placeholder').set('value', '');
            }
        },
        blur: function () {
            if (this.get('value') === '') {
                this.addClass('placeholder').set('value', this.get('placeholder'));
            }
        }
    }).fireEvent('blur');
});
`), p(["I really appreciate the fact that MooTools provides ", code(["addEvents"]), " in addition to ", code(["addEvent"]), ".\n    As a result, the code above is clearer than a well-written\n    Prototype equivalent."])];
export default {
  id: 52,
  slug: "autopopulating-input-fields-with-mootools",
  title: ["Auto-populating input fields with MooTools"],
  datetime: datetime("2010-06-09")("23:23:00")("Pacific/Auckland"),
  tags: ["html5", "javascript", "mootools", "ux"],
  body
};
