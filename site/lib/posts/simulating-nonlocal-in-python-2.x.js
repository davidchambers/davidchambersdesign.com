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
