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
const {XOR, OR, subtract, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, empty, reduce, reduceRight, filter, reject, map, flip, of, chain, contains} = {
  XOR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
      default:
        return lhs ^ rhs;
    }
  })(),
  OR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
      default:
        return lhs | rhs;
    }
  })(),
  subtract: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
      default:
        return lhs - rhs;
    }
  })(),
  apply: f => args => f.apply(null, args),
  construct: constructor => args => globalThis.Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[globalThis.Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : globalThis.Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  empty: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return [];
      case "Object":
        return {};
      case "String":
        return "";
      case "Set":
      case "Map":
        return globalThis.Reflect.construct(typeRep, [[]]);
      default:
        return typeRep["fantasy-land/empty"]();
    }
  })(),
  reduce: f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter(x => !f(x)),
  map: f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  of: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return globalThis.Array.of;
      case "Function":
        return x => y => x;
      case "Set":
        return x => globalThis.Reflect.construct(typeRep, [[x]]);
      default:
        return typeRep["fantasy-land/of"];
    }
  })(),
  chain: f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f),
  contains: this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these)
};
const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const public$ = components => apply(path.join)([dirname, "..", "..", "public", ...components]);
const write$002Dfile = filename => data => apply(fs.writeFileSync)([filename, data]);
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
flip(map)(pages)(page => write$002Dfile(public$([page.slug + ".html"]))(render$002Ddocument(base$002Dtemplate(page.title)(render$002Dpage(page)))));
flip(map)(posts)(post => write$002Dfile(public$([post.slug + ".html"]))(render$002Ddocument(base$002Dtemplate(post.title)(render$002Dpost(post)(related$002Dposts(posts)(post))))));
