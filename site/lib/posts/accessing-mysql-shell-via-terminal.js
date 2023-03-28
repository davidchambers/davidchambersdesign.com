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
const body = [p(["Certain things are extremely well documented on the Web; certain\n    other things, however, seem to appear only deep in the comments\n    of obscure blog entries."]), p(["The problem I encountered a few minutes ago fell squarely in the\n    latter category. I simply wanted to know how to access the MySQL\n    shell from the OS X Terminal. I expected my Google search for ", code([`MySQL console Terminal "OS X"`]), " to return several\n    useful results, but this was not the case."]), p(["I managed to find the solution in a thread with subject ", a({
  href: "http://www.oreillynet.com/cs/user/view/cs_msg/7078#id_7118"
})(["error 1044 and 1045"]), ":"]), code$002Dblock("console")(`mysql -u root -p mysql
`)];
export default {
  id: 34,
  slug: "accessing-mysql-shell-via-terminal",
  title: ["Accessing MySQL shell via Terminal"],
  datetime: datetime("2010-01-08")("13:49:00")("Pacific/Auckland"),
  tags: ["mac-os-x", "mysql", "terminal.app"],
  body
};
