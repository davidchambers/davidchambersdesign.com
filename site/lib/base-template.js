import {text, a, body, div as $div, footer, head, header, hr, html, li, link, meta, nav$0027, p, script, span, strong, title, ul} from "./elements.js";
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
const base$002Dtemplate = document$002Dtitle => main => html([head([meta({
  charset: "utf-8"
}), title(map(String)(document$002Dtitle)), link({
  rel: "alternate",
  type: "application/atom+xml",
  href: "/feed/"
}), link({
  rel: "stylesheet",
  href: "/css/reset.css",
  media: "all"
}), link({
  rel: "stylesheet",
  href: "/css/print.css",
  media: "print"
}), link({
  rel: "stylesheet",
  href: "/css/screen.css",
  media: "screen"
}), link({
  rel: "shortcut icon",
  type: "image/x-icon",
  href: "http://static.davidchambersdesign.com/favicon.ico"
}), script({
  src: "http://use.typekit.com/jhk0ogh.js"
})([]), script({})([text("try{Typekit.load();}catch(e){}")])]), body([$div({
  id: "skip"
})([a({
  href: "#main"
})(["Skip to main content"])]), $div({
  id: "wrap"
})([$div({
  id: "header"
})([header([a({
  id: "title",
  href: "/"
})(["David Chambers Design"]), hr, p(["It's where I share interesting info with other web geeks"]), nav$0027({
  id: "nav"
})([ul([li([a({
  href: "/about/"
})([span({})([strong(["About."]), "\n                      Who I am and what I do."])])]), li([a({
  href: "/contact/"
})([span({})([strong(["Contact."]), "\n                      Just in case you want to get in touch."])])]), li([a({
  href: "/archives/"
})([span({})([strong(["Archives."]), "\n                      Old posts, recent posts, they're all here."])])]), li([a({
  href: "/tags/"
})([span({})([strong(["Tags."]), "\n                      Helpful if you're after posts on a particular topic."])])]), li([a({
  href: "https://bitbucket.org/davidchambers"
})([span({})([strong(["Bitbucket."]), "\n                      Home to most of my open-source projects."])])]), li([a({
  href: "/twitter/"
})([span({})([strong(["Twitter."]), "\n                      It's where I chirrup… or chirp… or something."])])])])])])]), $div({
  id: "main"
})(main)]), footer([p(["Powered by ", a({
  href: "http://mango.io/wtf?",
  ["data-version"]: "0.9dev"
})(["Mango"]), ". Hosted on ", a({
  href: "http://www.linode.com/?r=ce523c9eeda64e4bceaf7011dc9e8558b909711d"
})(["Linode"]), ". Original content ", a({
  href: "/copying/"
})(["WTFPL-licensed"]), "."])])])]);
export default base$002Dtemplate;
