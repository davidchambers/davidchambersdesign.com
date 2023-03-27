import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {captioned$002Dimages, code$002Dblock} from "../components.js";
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
  not: b => !b
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, map, not} = Prelude;
const body = [p(["I spent much of my day at work editing Django templates in Emacs,\n    which does a decent job of applying syntax highlighting to HTML.\n    When I got home, though, and resumed work on a new Mango feature,\n    my Django templates lacked colour. :\\"]), p(["Emacs doesn't recognize the \"dhtml\" extension, but it's easy to\n    add a custom mapping (when the appropriate snippet is sitting in a\n    chat window waiting to be copied (ty, Brodie))."]), code$002Dblock("TK")(`(add-to-list 'auto-mode-alist '("[.]dhtml$" . html-mode))
`), p(["Adding the above snippet to my ", strong(["~/.emacs"]), " file did\n    the trick. :)"]), captioned$002Dimages([{
  alt: "Emacs syntax highlighting",
  src: "/images/posts/81/emacs-syntax-highlighting.png",
  caption: ["HTML in Emacs with and without syntax highlighting"]
}])];
export default {
  id: 81,
  slug: "mapping-file-extensions-to-emacs-syntax-modes",
  title: ["Mapping file extensions to Emacs syntax modes"],
  datetime: datetime("2011-02-18")("23:15:00")("America/Los_Angeles"),
  tags: ["emacs", "syntax-highlighting"],
  body
};
