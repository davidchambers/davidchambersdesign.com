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
const body = [p(["Sometimes we require users to log in to a WordPress site in order\n    to access ", em(["front-end"]), " functionality hidden from guests.\n    In such instances, we can simply provide a standard login link:"]), code$002Dblock("php")(`<a href="<?php bloginfo('url'); ?>/wp-login.php">log in</a>
`), p(["While this gets the job done, it takes users to the dashboard after\n    they have logged in: they must then click on a link to return to the\n    front-end, at which point an additional click may be required to get\n    them back to the page they were viewing. Since WordPress 2.6.2 it has\n    been possible to circumvent this round trip from ", strong(["origin"]), "\n    to ", strong(["wp-login.php"]), " to ", strong(["wp-admin/"]), " to ", strong(["/"]), " and finally back to ", strong(["origin"]), " by\n    including a value for ", code(["redirect_to"]), " in the href:"]), code$002Dblock("php")(`<a href="<?php bloginfo('url'); ?>/wp-login.php?redirect_to=<?php echo urlencode($_SERVER['REQUEST_URI']); ?>">log in</a>
`), p(["The above returns users to their starting point after they've\n    logged in."])];
export default {
  id: 7,
  slug: "wordpress-login-redirect",
  title: ["WordPress login redirect"],
  datetime: datetime("2009-03-01")("03:01:00")("Pacific/Auckland"),
  tags: ["php", "wordpress"],
  body
};
