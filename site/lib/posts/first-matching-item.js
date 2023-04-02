import {code, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
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
  apply: f => args => f.apply(null, args),
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
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const body = [p(["When writing code one often needs to grab the first item in\n    a collection that has certain characteristics. For example,\n    one may have a list of ", code(["Student"]), " objects and\n    need to fetch the one with a certain id."]), p(["The task is trivial: loop through the list and compare each\n    student's id until a match is found or all the students in\n    the list have been inspected, whichever comes first."]), p(["In the past, I've tended to take advantage of return statements\n    to exit the loop as soon as a match is found. The examples here\n    are in Python, but the same patterns apply to other languages."]), code$002Dblock("python")(`def student_by_id(students, id):
    for student in students:
        if student.id == id:
            return student
    return None
`), p(["This appoach strikes me as inelegant when the function is called\n    in one place only. Today a different approached occurred to me."]), code$002Dblock("python")(`student = None
for student in students:
    if student.id == id:
        break
    student = None
`), p(["Here, we break out of the loop as soon as a match\n    is found, preserving the student of interest in the\n    variable ", code(["student"]), ". Each time through the\n    loop ", code(["student"]), " is cleared to ensure that ", code(["student"]), " is empty once we've finished looping\n    if there are no matches."]), p(["The first line is required to handle empty lists."]), p(["I think I'll use this approach from time to time.\n    Let me know if you're aware of another option."])];
export default {
  id: 54,
  slug: "first-matching-item",
  title: ["First matching item"],
  datetime: datetime("2010-06-17")("23:17:00")("Pacific/Auckland"),
  tags: ["programming"],
  body
};
