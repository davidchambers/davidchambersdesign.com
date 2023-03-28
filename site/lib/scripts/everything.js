import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import {svg} from "../elements.js";
import base$002Dtemplate from "../base-template.js";
import * as masthead from "../masthead.js";
import related$002Dposts from "../related-posts.js";
import render$002Darchives from "../render-archives.js";
import render$002Dpage from "../render-page.js";
import render$002Dpost from "../render-post.js";
import render$002Dtags from "../render-tags.js";
import css$002Fscreen from "../css/screen.js";
import icons$002Fabout from "../icons/about.js";
import icons$002Farchives from "../icons/archives.js";
import icons$002Fbitbucket from "../icons/bitbucket.js";
import icons$002Fcontact from "../icons/contact.js";
import icons$002Fflushcache from "../icons/flushcache.js";
import icons$002Ftags from "../icons/tags.js";
import icons$002Ftwitter from "../icons/twitter.js";
import {date$002D0, date$002D1, date$002D2, date$002D3, date$002D4, date$002D5, date$002D6, date$002D7, date$002D8, date$002D9} from "../icons/dates.js";
import pages from "../pages/index.js";
import posts from "../posts/index.js";
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
const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const public$ = components => apply([dirname, "..", "..", "public", ...components])(path.join);
const write$002Dfile = filename => data => apply([filename, data])(fs.writeFileSync);
write$002Dfile(public$(["css", "screen.css"]))(css$002Fscreen);
const render$002Dsvg = attrs => paths => `<?xml version="1.0" standalone="no"?>\n${svg({
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.1",
  ...attrs
})(paths).render({
  indent: "  ",
  level: 0,
  inline: false
})}`;
write$002Dfile(public$(["svg", "masthead.svg"]))(render$002Dsvg({})(masthead.fill));
write$002Dfile(public$(["svg", "masthead-mask.svg"]))(render$002Dsvg({})(masthead.mask));
write$002Dfile(public$(["svg", "dates-0.svg"]))(render$002Dsvg({})(date$002D0));
write$002Dfile(public$(["svg", "dates-1.svg"]))(render$002Dsvg({})(date$002D1));
write$002Dfile(public$(["svg", "dates-2.svg"]))(render$002Dsvg({})(date$002D2));
write$002Dfile(public$(["svg", "dates-3.svg"]))(render$002Dsvg({})(date$002D3));
write$002Dfile(public$(["svg", "dates-4.svg"]))(render$002Dsvg({})(date$002D4));
write$002Dfile(public$(["svg", "dates-5.svg"]))(render$002Dsvg({})(date$002D5));
write$002Dfile(public$(["svg", "dates-6.svg"]))(render$002Dsvg({})(date$002D6));
write$002Dfile(public$(["svg", "dates-7.svg"]))(render$002Dsvg({})(date$002D7));
write$002Dfile(public$(["svg", "dates-8.svg"]))(render$002Dsvg({})(date$002D8));
write$002Dfile(public$(["svg", "dates-9.svg"]))(render$002Dsvg({})(date$002D9));
write$002Dfile(public$(["svg", "about.svg"]))(render$002Dsvg({
  width: 16,
  height: 16
})(icons$002Fabout));
write$002Dfile(public$(["svg", "archives.svg"]))(render$002Dsvg({
  width: 16,
  height: 16
})(icons$002Farchives));
write$002Dfile(public$(["svg", "bitbucket.svg"]))(render$002Dsvg({
  width: 16,
  height: 16
})(icons$002Fbitbucket));
write$002Dfile(public$(["svg", "contact.svg"]))(render$002Dsvg({
  width: 16,
  height: 16
})(icons$002Fcontact));
write$002Dfile(public$(["svg", "flushcache.svg"]))(render$002Dsvg({
  width: 16,
  height: 16
})(icons$002Fflushcache));
write$002Dfile(public$(["svg", "tags.svg"]))(render$002Dsvg({
  width: 16,
  height: 16
})(icons$002Ftags));
write$002Dfile(public$(["svg", "twitter.svg"]))(render$002Dsvg({
  width: 16,
  height: 16
})(icons$002Ftwitter));
const render$002Ddocument = element => `<!DOCTYPE html>\n${element.render({
  indent: "  ",
  level: 0,
  inline: false
})}`;
write$002Dfile(public$(["archives.html"]))(render$002Ddocument(base$002Dtemplate(["Archives"])(render$002Darchives(posts))));
write$002Dfile(public$(["tags.html"]))(render$002Ddocument(base$002Dtemplate(["Tags"])(render$002Dtags(posts))));
flip(map)(pages)(page => write$002Dfile(public$([`${page.slug}.html`]))(render$002Ddocument(base$002Dtemplate(page.title)(render$002Dpage(page)))));
flip(map)(posts)(post => write$002Dfile(public$([`${post.slug}.html`]))(render$002Ddocument(base$002Dtemplate(post.title)(render$002Dpost(post)(related$002Dposts(posts)(post))))));
