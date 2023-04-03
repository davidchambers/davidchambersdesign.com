import {attemptP, bichain, fork, parallel, resolve} from "fluture";
import S from "sanctuary";
import posts from "../posts/index.js";
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
const absolute$003F = url => url.startsWith("http:") || url.startsWith("https:");
const links = node => equals("a")(node.name) ? filter(absolute$003F)([node.attributes.href]) : ("children" in node) ? chain(links)(node.children) : [];
const status = url => bichain(err => resolve({
  url,
  status: err.cause.code
}))(res => resolve({
  url,
  status: res.status
}))(attemptP(() => apply(fetch)([url, {
  method: "HEAD",
  redirect: "manual"
}])));
const bold = text => "\u001b[1m" + text + "\u001b[22m";
const invert = text => "\u001b[7m" + text + "\u001b[27m";
const red = text => "\u001b[31m" + text + "\u001b[0m";
const yellow = text => "\u001b[33m" + text + "\u001b[0m";
const cyan = text => "\u001b[36m" + text + "\u001b[0m";
const format = ({url, status}) => (() => {
  const padding = x => (" ").repeat(S.max(0)(15 - ($ => $.length)(String(x))));
  const normal = s => s;
  return (() => {
    switch (true) {
      case equals("string")(typeof$(status)):
        return red(padding(status) + " " + invert(bold(status)) + " " + url);
      case status >= 200 && status < 300:
        return padding(status) + " " + normal(bold(status)) + " " + url;
      case status >= 300 && status < 400:
        return yellow(padding(status) + " " + normal(bold(status)) + " " + url);
      case status >= 400 && status < 500:
        return red(padding(status) + " " + normal(bold(status)) + " " + url);
      default:
        return cyan(padding(status) + " " + normal(bold(status)) + " " + url);
    }
  })();
})();
const program = map(S.joinWith("\n"))(map(map(format))(parallel(16)(map(status)(S.sort(Array.from(construct(Set)(Array.of(chain(links)(chain($ => $.body)(posts))))))))));
fork(console.error)(console.log)(program);
