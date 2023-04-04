import {a, code, em, h3, h4, p} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
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
const excerpt = [p([a({
  href: "http://en.wikipedia.org/wiki/Closure_(computer_science)"
})(["Closure"]), " is truly wonderful. JavaScript", $2014, "despite its\n    plethora of quirks", $2014, "is now widely appreciated, thanks in large\n    part to its lexical scoping. Python 3 is lexically-scoped, too, as\n    the following code demonstrates."]), code$002Dblock("python")(`def cache(saved=None):
    def _(thing=None):
        nonlocal saved
        if thing is not None:
            saved = thing
        return saved
    return _
cache = cache()
`), p(["If (the rebound) ", code(["cache"]), " is passed no arguments\n    (or ", code(["None"]), "), ", code(["saved"]), " is returned.\n    Otherwise, ", code(["thing"]), " is assigned to ", code(["saved"]), "\n    and returned."]), code$002Dblock("TK")(`>>> cache(2**3)
8
>>> cache()
8
`), p(["This works thanks to the ", code(["nonlocal"]), " keyword\n    introduced in Python 3, which enables variables in outer\n    scopes to be rebound. So how would one achieve the same\n    result in earlier versions of Python?"])];
const body = [...excerpt, h3(["Bringing lexical scoping to Python 2.x"]), code$002Dblock("python")(`def cache(saved=None):
    def _(thing=None):
        # nonlocal saved
        if thing is not None:
            saved = thing
        return saved
    return _
cache = cache()
`), p(["The ", code(["nonlocal"]), " line is commented out as it's a syntax\n    error in Python 2.x."]), code$002Dblock("TK")(`>>> cache(2**3)
8
>>> cache()
...
UnboundLocalError: local variable 'saved' referenced before assignment
`), p(["When ", code(["cache"]), " is passed a (non-", code(["None"]), ") ", code(["thing"]), ", a ", em(["new"]), " ", code(["saved"]), " is\n    created within the local scope. When ", code(["cache"]), " is\n    passed no arguments (or ", code(["None"]), "), execution skips\n    to ", code(["return saved"]), ". At this point, ", code(["saved"]), "\n    is expected to exist within the local scope – it does not,\n    which explains the ", code(["UnboundLocalError"]), "."]), p(["It is possible to simulate lexical scoping in Python 2.x.\n    The approaches I find most palatable utilize a dictionary\n    or a function object as a namespace accessible to both the\n    inner and outer functions."]), h4(["Dictionary"]), code$002Dblock("python")(`def cache():
    ns = {'saved': None}
    def _(thing=None):
        if thing is not None:
            ns['saved'] = thing
        return ns['saved']
    return _
cache = cache()
`), h4(["Function object"]), code$002Dblock("python")(`def cache():
    def ns(): pass
    ns.saved = None
    def _(thing=None):
        if thing is not None:
            ns.saved = thing
        return ns.saved
    return _
cache = cache()
`), p(["The dictionary approach is arguably more correct, but subscript\n    notation hurts my eyes so I prefer to stick things on a function\n    object. It's useful that ", code(["def ns(): pass"]), " looks odd, as\n    it alerts the reader to the fact that something ", em(["is"]), " odd."])];
export default {
  id: 78,
  slug: "simulating-nonlocal-in-python-2.x",
  title: ["Simulating ", code(["nonlocal"]), " in Python 2.x"],
  datetime: datetime("2011-02-05")("19:30:00")("America/Los_Angeles"),
  tags: ["hacks", "programming", "python"],
  body
};
