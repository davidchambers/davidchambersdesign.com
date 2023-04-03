import {a, dd, dl, dt, dt$0027, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
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
const excerpt = [p(["WordPress is a great piece of software, although I've never been\n    satisfied with its search functionality. Last night I decided to\n    switch to a very simple solution:"]), code$002Dblock("html")(`<form action="http://www.google.com/search" method="get">
    <div>
        <label for="q">Search davidchambersdesign.com</label>
        <input type="search" name="q" id="q" maxlength="256" placeholder="search..." />
        <input type="hidden" name="ie" value="UTF-8" />
        <input type="hidden" name="hl" value="en" />
        <input type="hidden" name="as_sitesearch" value="davidchambersdesign.com" />
        <input type="submit" value="Search" />
    </div>
</form>
`)];
const body = [...excerpt, p(["Search queries on this site are now submitted to Google with the\n    specification that only results from this domain are to be returned.\n    Here's a breakdown of the various query parameters I included:"]), dl([dt$0027({
  class: "textual"
})(["q"]), dd(["Search query as entered by the user."]), dt(["ie"]), dd(["Sets the character encoding that is used to interpret the query string."]), dt(["hl"]), dd(["Specifies the interface language (host language) of your user interface."]), dt(["as_sitesearch"]), dd(["Limits search results to documents in the specified domain."])]), p(["If you decide to implement this yourself you may find the documentation on ", a({
  href: "http://www.google.com/cse/docs/resultsxml.html#wsRequestParameters"
})(["Google custom search request parameters"]), " useful."])];
export default {
  id: 45,
  slug: "using-google-for-site-search",
  title: ["Using Google for site search"],
  datetime: datetime("2010-03-25")("22:06:00")("Pacific/Auckland"),
  tags: ["google", "search"],
  body
};
