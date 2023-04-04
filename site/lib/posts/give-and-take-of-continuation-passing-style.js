import {a, code, em, p} from "../elements.js";
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
const body = [p(["I have been experimenting with ", a({
  href: "https://en.wikipedia.org/wiki/Continuation-passing_style"
})(["continuation-passing style"]), " recently. Writing code in\n    this style feels strange but exciting! I recently discovered\n    that one can use functions in place of objects."]), p(["Local mutation and reassignment are acceptable, but I avoid them\n    whenever practical. As a result I use ", code(["reduce"]), " ", em(["a lot"]), "."]), code$002Dblock("javascript")(`//    reduce :: (b -> a -> b) -> b -> Array a -> b
const reduce = f => b => as => as.reduce ((b, a) => f (b) (a), b);

//    append :: a -> Array a -> Array a
const append = a => as => [...as, a];

//    blah :: Integer -> String -> { id :: Integer, name :: String }
const blah = id => name => ({id, name});

> reduce (({id, blahs}) => name => ({id: id + 1, blahs: append (blah (id) (name)) (blahs)}))
.        ({id: 1, blahs: []})
.        (['foo', 'bar', 'baz'])
. .blahs
[{id: 1, name: 'foo'}, {id: 2, name: 'bar'}, {id: 3, name: 'baz'}]
`), p(["☝️ This has been my approach for the past several years. The accumulator\n    contains all necessary state, and at the end of the reduction I access\n    whichever fields are relevant (in this case just ", code(["blahs"]), ")."]), code$002Dblock("javascript")(`> reduce (cont => name => id => append (blah (id) (name)) (cont (id + 1)))
.        (id => [])
.        (['foo', 'bar', 'baz'])
.        (1)
[{id: 3, name: 'foo'}, {id: 2, name: 'bar'}, {id: 1, name: 'baz'}]
`), p(["☝️ This was my first attempt at using continuations. The problem is\n    that function wrapping happens from left to right, so the ", code(["id"]), "\n    is threaded from right to left, giving the wrong result."]), code$002Dblock("javascript")(`> reduce (cont => name => id => blahs => cont (id + 1) (append (blah (id) (name)) (blahs)))
.        (id => blahs => blahs)
.        (['foo', 'bar', 'baz'])
.        (1)
.        ([])
[{id: 1, name: 'baz'}, {id: 2, name: 'bar'}, {id: 3, name: 'baz'}]
`), p(["☝️ This was my second attempt. The order is reversed, but the ", code(["id"]), " and ", code(["name"]), " values are still mismatched."]), p(["I needed more control. What if the initial accumulator were ", code(["give => give (1) ([])"]), "? In the base case, this would mean\n    using ", code(["(give => give (1) ([])) (id => blahs => blahs)"]), "\n    to get ", code(["[]"]), ", the empty list of blahs. What is the type of ", code(["give => give (1) ([])"]), "? I will refer to this function as ", code(["take"]), "."]), code$002Dblock("javascript")(`//    take :: (Integer -> Array String -> a) -> a
const take = give => give (1) ([]);
`), p([code(["a"]), " is a type variable. We have no idea what ", code(["give"]), ", the continuation provided to ", code(["take"]), ",\n    will return. ", code(["take"]), " returns whatever give returns,\n    though, so the return type of ", code(["take"]), " matches the\n    return type of ", code(["give"]), "."]), p(["Having established that the type of the accumulator is ", code(["(Integer -> Array String -> a) -> a"]), ", we need to\n    have the reducing function return a function of that type."]), code$002Dblock("javascript")(`> reduce (take => name => give => give (1) ([blah (1) (name)]))
.        (give => give (1) ([]))
.        (['foo', 'bar', 'baz'])
.        (id => blahs => blahs)
[{id: 1, name: 'baz'}]
`), p(["☝️ The answer is wrong", $2014, "we lost ", code(["'foo'"]), " and ", code(["'bar'"]), ", and ", code(["'baz'"]), " has the wrong ", code(["id"]), $2014, "but the types align."]), code$002Dblock("javascript")(`> reduce (take => name => take (id => blahs => give => give (id + 1) (append (blah (id) (name)) (blahs))))
.        (give => give (1) ([]))
.        (['foo', 'bar', 'baz'])
.        (id => blahs => blahs)
[{id: 1, name: 'foo'}, {id: 2, name: 'bar'}, {id: 3, name: 'baz'}]
`), p(["☝️ Success! We receive a continuation we refer to as ", code(["take"]), ".\n    We apply ", code(["take"]), " to gain access to ", code(["id"]), " and ", code(["blahs"]), ", and we then return a new continuation, ", code(["give => give (id + 1) (append (blah (id) (name)) (blahs))"]), ",\n    which is the ", code(["take"]), " function for the next iteration."]), p(["This approach extends to an arbitrary number of state variables\n    (e.g. ", code(["give => give (0) ('') ([]) ({})"]), "). I find the\n    names ", code(["give"]), " and ", code(["take"]), " helpful for\n    remembering which continuation is which. :)"])];
export default {
  id: 95,
  slug: "give-and-take-of-continuation-passing-style",
  title: ["The ", code(["give"]), " and ", code(["take"]), "\n    of continuation-passing style"],
  datetime: datetime("2020-10-08")("10:41:26")("Europe/Berlin"),
  tags: ["continuation-passing-style", "javascript", "programming"],
  body
};
