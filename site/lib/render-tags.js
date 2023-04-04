import S from "sanctuary";
import {a, div as $div, h1, li$0027, ol$0027} from "./elements.js";
import tags from "./tags.js";
const filter = f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f);
const map = f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f);
const chain = f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f);
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
