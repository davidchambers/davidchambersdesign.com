import {a, dd, dl, dt, em, embed, p, strong} from "../elements.js";
import datetime from "../datetime.js";
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
const excerpt = [p(["Over the past few months I've reached a startling realization: ", strong(["JavaScript is a tremendously capable language."])]), p(["The reason that it took me so long to discover this is that\n    the playing field has never been fair. On the one hand I've been\n    writing application code for the server, a stable, predictable\n    environment. On the other hand I've been adding interactivity\n    on the client's side, dealing with inconsistencies on multiple\n    fronts, not least of which is the DOM API."]), p(["Comparing Python and JavaScript, for example, by using\n    the former to quickly put together a website using the\n    excellent Django framework while using the latter to add\n    drag and drop functionality is to compare apples and oranges. ", strong(["Actually, it's more like comparing apples to root canals."])])];
const body = [...excerpt, p(["Had I been writing application code in JavaScript (without\n    touching the DOM), I'd have been in a much better position\n    to weigh each on its merits. Thanks to some terrifically\n    exciting developments in the JS world, it is now possible to\n    write application code ", em(["entirely"]), " in JavaScript."]), p(["When I was first exposed to the idea of having JavaScript on\n    the server, the thing that appealed to me was the potential to\n    share code between server and client. This seemed preferable\n    to the situation that is currently prevalent, whereby objects\n    are created on the server (probably using an ORM such as that\n    provided by Rails or Django) and are then sent down the wire\n    as JSON (or XML for the masochists) at which point they are\n    parsed to create JS objects."]), p([a({
  href: "http://www.sproutcore.com/"
})(["SproutCore"]), "\n    rewrites the client–server relationship by moving ", em(["all"]), "\n    programming logic to the client. This new approach was motivated\n    by a desire to improve performance, but has two consequential\n    benefits. No longer do objects need to be represented on both\n    sides of the wire (in violation of the DRY principle). This\n    brings another benefit, which is the separation of concerns:\n    the server is freed to focus on serving, and the decoupling\n    of service and application code allow the service to be used\n    (simultaneously) by other applications."]), p(["SproutCore is server-agnostic, which allows it to connect to\n    existing services, and allows new services to be created using\n    the most appropriate server-side technologies."]), dl([dt([embed({
  type: "application/x-shockwave-flash",
  src: "http://blip.tv/play/g_MngZaxYQI",
  width: 480,
  height: 300,
  allowscriptaccess: "always",
  allowfullscreen: true
})]), dd(["Mike Subelsky introducing SproutCore at JSConf Washington, April 2009"])]), p(["Exciting JavaScript-related developments are not limited to the\n    client-side, however. There are several options available if you're\n    interested in running JavaScript on the server, but the one that's\n    caught my attention is ", a({
  href: "http://nodejs.org/"
})(["Node.js"]), "."]), dl([dt([embed({
  type: "application/x-shockwave-flash",
  src: "http://blip.tv/play/AYGylE4C",
  width: 480,
  height: 300,
  allowscriptaccess: "always",
  allowfullscreen: true
})]), dd(["Ryan Dahl introducing Node.js at JSConf Berlin, November 2009"])]), p(["The idea of using an event loop on the ", em(["server"]), "-side\n    is surprising at first, but obvious in hindsight. JavaScript\n    is extremely well suited to event-driven programming, and the\n    performance gains that can be made with non-blocking request\n    handling are significant."]), p(["JavaScript is at last recieving the attention and respect it\n    has long deserved. I'm greatly looking forward to building an\n    application using non-blocking, event-driven JavaScript on both\n    sides of the wire."])];
export default {
  id: 61,
  slug: "javascript-everywhere",
  title: ["JavaScript, JavaScript, everywhere"],
  datetime: datetime("2010-07-20")("19:05:00")("Pacific/Auckland"),
  tags: ["javascript", "node.js", "sproutcore"],
  body
};
