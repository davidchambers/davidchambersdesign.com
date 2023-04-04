import {code, em, h3, hr, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
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
const excerpt = [p(["One question I'm fond of asking in interviews is how to create\n    a set of strings to which values may be added in an efficient\n    manner. Furthermore, membership checks must be reliable and as\n    fast as possible. This post can be considered the model answer.\n    ;)"])];
const body = [...excerpt, hr, p(["JavaScript is a small language. So small, in fact, that\n    several useful constructs are entirely absent. Just two\n    types of collection are provided: arrays and objects\n    (and even these are less different than they appear).\n    Sets (collections of unique values) and dictionaries\n    (collections which map unique values to other values)\n    are the most glaring omissions."]), h3(["How does Python do it?"]), p(["Python has literal syntax for sets, and supports\n    membership checks via the ", code(["in"]), " keyword:"]), code$002Dblock("python")(`>>> usernames = {'brodie', 'jespern', 'nvenegas'}
>>> 'brodie' in usernames
True
>>> 'davidchambers' in usernames
False
`), p(["Incidentally, since sets are essentially dictionaries\n    without values, it's unsurprising that the same form\n    can be used to determine whether a value is among a\n    dictionary's keys:"]), code$002Dblock("python")(`>>> settings = {'lines': 50, 'number': False, 'spell': True}
>>> 'number' in settings
True
>>> 'wrap' in settings
False
`), h3(["Fashioning a poor man’s set from the limited materials\n    JavaScript provides"]), p(["How might one create a set of strings in JavaScript given the\n    limited, ahem, ", em(["set"]), " of data structures at our disposal?\n    One could use a string:"]), code$002Dblock("javascript")(`> usernames = ',brodie,jespern,nvenegas,'
> /,brodie,/.test(usernames)
true
> /,davidchambers,/.test(username)
false
`), p(["This approach is problematic for several reasons: it assumes\n    that \",\" won't appear in a username, membership checks are\n    inefficient, inserting an existing member will cause the\n    string to grow unless an expensive membership check is\n    performed, and the separators make things awkward."]), p(["An array is clearly a better choice:"]), code$002Dblock("javascript")(`> usernames = ['brodie', 'jespern', 'nvenegas']
> usernames.indexOf('brodie') >= 0
true
> usernames.indexOf('davidchambers') >= 0
false
`), p(["Though this is an improvement, membership checks are still\n    inefficient, and each insert still requires a member check if\n    we're to avoid having the array grow needlessly. If we kept the\n    array ordered we could use binary search, but inserts would be\n    even slower as each member would need to be inserted in the\n    correct position."]), p(["An object, then, is the ", em(["best"]), " choice:"]), code$002Dblock("javascript")(`> usernames = {'brodie': 1, 'jespern': 1, 'nvenegas': 1}
> 'brodie' in usernames
true
> 'davidchambers' in usernames
false
`), p(["This addresses the outstanding problems, and the ", code(["in"]), "\n    keyword makes the intent of these expressions clear."]), p(["But it also introduces a subtle bug:"]), code$002Dblock("javascript")(`> 'constructor' in usernames
true
> 'toString' in usernames
true
> 'valueOf' in usernames
true
`), p(["The ", code(["in"]), " check tells us whether the property exists on\n    the object ", em(["or anywhere in its prototype chain"]), ". Ugh."]), p([code(["in"]), " is out, then, but there is a way to ask whether a\n    property exists on the object itself:"]), code$002Dblock("javascript")(`> usernames.hasOwnProperty('brodie')
true
> usernames.hasOwnProperty('davidchambers')
false
`), p(["This fixes the unwanted inheritance problem, but introduces\n    another subtle error:"]), code$002Dblock("javascript")(`> usernames['davidchambers'] = 1 // add "davidchambers" to set
1
> usernames['hasOwnProperty'] = 1 // add "hasOwnProperty" to set
1
> usernames.hasOwnProperty('davidchambers')
TypeError: Property 'hasOwnProperty' of object #<Object> is not a function
`), p(["If we rely on ", code(["usernames.hasOwnProperty"]), " we lose\n    the ability to perform membership checks as soon as we add\n    \"hasOwnProperty\" as a member. The solution is to grab the\n    function from a reliable source (", code(["Object.prototype"]), "):"]), code$002Dblock("javascript")(`> Object.prototype.hasOwnProperty.call(usernames, 'davidchambers')
true
`), p(["What a mouthful! This is, though, the correct way to maintain\n    a collection of unique strings in JavaScript. It's efficient,\n    and avoids the pitfalls of the aforementioned approaches."]), h3(["Bonus section"]), p(["In working through this question with a candidate I realized\n    there's another solution, though I can't think of a compelling\n    reason to favour it:"]), code$002Dblock("javascript")(`> sentinel = {}
> usernames = {'brodie': sentinel, 'jespern': sentinel, 'nvenegas': sentinel}
> usernames['brodie'] === sentinel
true
> usernames['davidchambers'] === sentinel
false
> usernames['constructor'] === sentinel
false
`)];
export default {
  id: 94,
  slug: "the-perils-of-using-javascript-objects-as-sets",
  title: ["The perils of using JavaScript objects as sets"],
  datetime: datetime("2012-09-03")("20:00:00")("America/Los_Angeles"),
  tags: ["best-practice", "data-structures", "javascript", "programming", "python"],
  body
};
