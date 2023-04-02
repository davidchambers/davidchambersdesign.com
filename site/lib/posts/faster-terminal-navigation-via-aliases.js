import {a, code, em, h3, p, strong} from "../elements.js";
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
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const excerpt = [p(["Workmates will be quick to confirm that I'm ", strong(["not exactly leet"]), " on the command line.\n    Efforts to advance beyond ", code(["cd"]), " and ", code(["ls"]), " have been hampered by the fact that\n    many posts and discussion threads assume a level\n    of competency which as yet I lack."]), p(["When I sit down to write a post, oftentimes ", strong(["I write the post I wish I'd read an hour earlier"]), ".\n    As I unravel the mysteries of ack and bash and Emacs and the\n    like, I'll publish tips and explanations so that others can\n    benefit from my discoveries (or, as will likely be the case,\n    so that you people can further enlighten ", em(["me"]), ")."])];
const body = [...excerpt, h3(["Aliases"]), p(["Do you find yourself ", code(["cd"]), "-ing to a particular directory\n    dozens of times each day? Perhaps you", $2014, "like me", $2014, "forget ", strong(["where the heck Python's site-packages directory lives"]), ",\n    and resort to Googling to find out? Aliases to the rescue!"]), p(["Aliases can be placed in your ", strong([".bashrc"]), " or ", strong([".bash_profile"]), ", or in a separate file which either\n    one of these imports."]), code$002Dblock("bash")(`alias site-packages="cd /Library/Frameworks/Python.framework/Versions/2.6/lib/python2.6/site-packages"
`), p(["Thanks to this alias I can enter ", code(["site-packages"]), " and be taken\n    straight there. Another cool thing to know about is ", code(["cd -"]), ",\n    which takes you to the directory you were in most recently."]), code$002Dblock("console")(`$ cd ~/Desktop
$ site-packages
$ pwd
/Library/Frameworks/Python.framework/Versions/2.6/lib/python2.6/site-packages
$ cd -
/Users/dc/Desktop
`), p([a({
  href: "https://github.com/r00k/dotfiles/blob/master/bash/aliases"
})(["r00k's bash aliases"]), " provide some ideas as to other ways\n    in which aliases can be put to use. :D"]), h3(["Finder.app"]), p([`I've sworn off it, and I'm pleased to have done so. It's great
    to be able to edit settings files on a server in place, rather
    than opening Transmit, navigating to the relevant directory,
    right-clicking and selecting "Open", making the change in Coda,
    and saving to have the updated file sent back via FTP.`])];
export default {
  id: 79,
  slug: "faster-terminal-navigation-via-aliases",
  title: ["Faster Terminal navigation via aliases"],
  datetime: datetime("2011-02-12")("22:10:00")("America/Los_Angeles"),
  tags: ["mac-os-x", "productivity", "terminal.app"],
  body
};
