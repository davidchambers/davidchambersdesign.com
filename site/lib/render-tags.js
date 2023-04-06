import sanctuary from "sanctuary";
import {a, div as $div, h1, li$0027, ol$0027} from "./elements.js";
import tags from "./tags.js";
const filter = f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f);
const map = f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f);
const chain = f => x => (() => {
  switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, x, [])) {
    case "[object Array]":
      return x.flatMap(x => f(x));
    case "[object Function]":
      return y => x(f(y))(y);
    default:
      return x["fantasy-land/chain"](f);
  }
})();
const S = sanctuary.unchecked;
const render$002Dtags = posts => (() => {
  const from$002Dentry = ([slug, name]) => li$0027({
    ["data-count"]: S.size(filter(S.equals(slug))(chain($ => $.tags)(posts)))
  })([a({
    href: "/tag/" + slug + "/"
  })([name])]);
  return [h1(["Tags"]), ol$0027({
    id: "tags"
  })(map(from$002Dentry)(Object.entries(tags))), $div({
    class: "clearfix"
  })([])];
})();
export default render$002Dtags;
