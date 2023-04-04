import {em, p} from "../elements.js";
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
const body = [p(["A decorator is a function which takes a function and returns a function:"]), code$002Dblock("coffeescript")(`decorator = (fn) -> fn
`), p(["Obviously, this doesn't do anything useful. It's the fact that a\n    decorator can return a function which behaves ", em(["similarly"]), "\n    to the function passed to it that makes the pattern interesting.\n    Commonly a decorator will simply wrap a function invocation in a\n    check of some sort:"]), code$002Dblock("javascript")(`var loginRequired = function (fn) {
  return function () {
    if (!user.authenticated) {
      return window.location.replace('/login');
    }
    fn.apply(null, [].slice.apply(arguments));
  };
};
`), p(["The above decorator could be used to \"guard\" actions that only\n    authenticated users are permitted to perform:"]), code$002Dblock("javascript")(`var changeUsername = loginRequired(function (username) {
  $.ajax({
    type: 'PUT',
    url: '/api/1.0/users/' + user.id,
    data: {username: username}
  })});

var changePassword = loginRequired(function (password) {
  $.ajax({
    type: 'PUT',
    url: '/api/1.0/users/' + user.id,
    data: {password: password}
  })});

var deleteAccount = loginRequired(function () {
  $.ajax({
    type: 'DELETE',
    url: '/api/1.0/users/' + user.id
  })});
`), p(["The CoffeeScript equivalent is quite a bit clearer:"]), code$002Dblock("coffeescript")(`changeUsername = loginRequired (username) ->
  $.ajax
    type: 'PUT'
    url: "/api/1.0/users/#{user.id}"
    data: {username}

changePassword = loginRequired (password) ->
  $.ajax
    type: 'PUT'
    url: "/api/1.0/users/#{user.id}"
    data: {password}

deleteAccount = loginRequired ->
  $.ajax
    type: 'DELETE'
    url: "/api/1.0/users/#{user.id}"
`), p(["Decorators are commonly used in Python", $2014, "which provides special syntax\n    for \"decorating\" functions", $2014, "but are rarely seen in JavaScript code.\n    This despite the fact that JavaScript's first-class functions are ideally\n    suited to the task. Perhaps CoffeeScript's lighter-weight function syntax\n    will result in decorators making more frequent appearances in JavaScript\n    code."])];
export default {
  id: 89,
  slug: "decorators-in-javascript",
  title: ["Decorators in JavaScript"],
  datetime: datetime("2011-07-26")("22:00:00")("America/Los_Angeles"),
  tags: ["coffeescript", "javascript", "programming"],
  body
};
