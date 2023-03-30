import {a, blockquote, code, em, h3, p, strong} from "../elements.js";
import {code$002Dblock, update, $2014} from "../components.js";
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
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const body = [p(["I write a lot of Python. I also write a lot of JavaScript. As I switch\n    between the two (often several times in a day) I sometimes find myself\n    trying to do something in one using the syntax of the other. The most\n    common example is joining a list."]), p(["Python:"]), code$002Dblock("python")(`' '.join(['foo', 'bar'])
`), p(["JavaScript:"]), code$002Dblock("javascript")(`['foo', 'bar'].join(' ')
`), p(["Often", $2014, "as is the case above", $2014, "the syntactical differences\n    are minor, but there are times when there's no direct translation."]), p([a({
  href: "http://mootools.net/"
})(["MooTools"]), ", for example, adds the ", a({
  href: "http://mootools.net/docs/core/Native/Array#Array:every"
})([code(["every"]), " method"]), "\n    to the ", code(["Array"]), " object. This makes it possible\n    to write some rather terse conditional statements."]), code$002Dblock("javascript")(`var numbers = [87, 33, 21, 75];
if (numbers.every(function (n) { return n % 3 == 0; })) {
    window.alert('The numbers are all divisible by 3.');
}
`), p(["Python lists have no comparable method, so how would one write\n    this in Python?"]), code$002Dblock("python")(`numbers = [87, 33, 21, 75]
if [n for n in numbers if n % 3 == 0] == numbers:
    print 'The numbers are all divisible by 3.'
`), p(["This approach involves using a list comprehension to create a\n    list of numbers which are divisible by 3, and comparing this list\n    to ", code(["numbers"]), ". If the lists are equal, everything in ", code(["numbers"]), " is divisible by 3."]), update(datetime("2012-06-20")("14:15:00")("America/Los_Angeles"))([p(["As ", a({
  href: "https://twitter.com/rafael_ab/status/215428832872771584"
})(["Rafael Almeida pointed out on Twitter"]), ",\n     there ", em(["is"]), " an elegant way to express this in Python:"]), code$002Dblock("python")(`if all((n % 3 == 0 for n in numbers)):
     print 'The numbers are all divisible by 3.'
`)]), h3(["Now for something a bit more challenging"]), p(["Assume that we have a list of documents, and we want to know which\n    of the documents contain all the terms in a list of search terms."]), code$002Dblock("javascript")(`// (MooTools) JavaScript

var terms = ['python', 'list', 'methods'], matches = [];
documents.each(function (document) {
    if (terms.every(function (term) {
        return document.body.indexOf(term) != -1;
    })) matches.append(document);
});
`), p(["Here, we ", em(["could"]), " use the list comprehension approach\n    as before."]), code$002Dblock("python")(`# Python

terms = ['python', 'list', 'methods']
matches = []
for document in documents:
    if [t for t in terms if document.body.find(t) != -1] == terms:
        matches.append(document)
`), p(["This is reasonably succinct, but not terribly efficient since each\n    document is checked for ", em(["every"]), " search term. Given that\n    we're not interested in documents that lack even a single search\n    term, it should be possible to rewrite this code so that we don't\n    waste time on lost causes."]), p(["It turns out that Python has just the thing for the job: ", strong(["in Python, a loop statements may have an ", code(["else"]), "\n    clause!"])]), code$002Dblock("python")(`terms = ['python', 'list', 'methods']
matches = []
for document in documents:
    for term in terms:
        if document.body.find(term) == -1:
            break
    else: # every term was found
        matches.append(document)
`), p(["From ", a({
  href: "http://docs.python.org/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops"
})(["4. More Control Flow Tools"]), ":"]), blockquote([p(["Loop statements may have an ", code(["else"]), " clause; it is\n      executed when the loop terminates through exhaustion of the\n      list (with ", code(["for"]), ") or when the condition becomes\n      false (with ", code(["while"]), "), but not when the loop is\n      terminated by a ", code(["break"]), " statement."])]), p([strong(["I'm looking forward to finding more good spots to make\n    use of ", code(["else"]), " clauses with my Python loops."]), " :D"])];
export default {
  id: 66,
  slug: "python-loops-can-have-else-clause",
  title: ["Python loops can have else clause?!"],
  datetime: datetime("2010-07-25")("18:11:00")("Pacific/Auckland"),
  tags: ["javascript", "mootools", "programming", "python"],
  body
};
