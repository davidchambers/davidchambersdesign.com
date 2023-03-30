import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
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
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => Prelude.filter(x => Prelude.not(f(x))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
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
