import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude.filter(x => !predicate(x)),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {_apply, apply, construct, match, id, const: const$, not, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
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
