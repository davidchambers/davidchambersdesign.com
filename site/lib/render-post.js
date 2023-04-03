import {a, article$0027, footer$0027, h1, h3$0027, h4, header, li, li$0027, ol, time, ul} from "./elements.js";
import tags from "./tags.js";
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["<<"]: rhs => lhs => lhs << rhs,
      [">>"]: rhs => lhs => lhs >> rhs,
      [">>>"]: rhs => lhs => lhs >>> rhs,
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  apply: f => args => f.apply(null, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter($ => not(f($))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const render$002Dpost = post => related$002Dposts => [article$0027(("article-id" in post) ? {
  id: post["article-id"]
} : {})([header([h1(post.title), time({
  datetime: (args => target => target.toFormat.apply(target, args))(["yyyy-MM-dd'T'HH:mm:ssZZ"])(post.datetime),
  pubdate: "pubdate"
})([(args => target => target.toFormat.apply(target, args))(["d MMMM y"])(post.datetime)])]), ...post.body, footer$0027({
  class: "metadata"
})([ul([li$0027({
  class: "shorturl"
})([a({
  href: "http://dċd.ws/" + post.id + "/"
})(["Short URL"])])]), ...equals([])(post.tags) ? [] : [h4(["This post has the following tags:"]), ol(map(tag => li([a({
  href: "/tag/" + tag + "/"
})([tags[tag]])]))(post.tags))]]), ...equals([])(related$002Dposts) ? [] : [h3$0027({
  id: "related"
})(["Possibly related posts"]), ul(map(post => li([a({
  href: "/" + post.slug + "/"
})(post.title)]))(related$002Dposts))]])];
export default render$002Dpost;
