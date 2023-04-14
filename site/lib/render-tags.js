import sanctuary from "sanctuary";
import {h1, ol$0027, li$0027, div as $div, a} from "./elements.js";
import tags from "./tags.js";
const filter = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.filter(x => f(x));
    default:
      return xs["fantasy-land/filter"](f);
  }
})();
const map = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const chain = f => x => (() => {
  switch (globalThis.Object.prototype.toString.call(x)) {
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
