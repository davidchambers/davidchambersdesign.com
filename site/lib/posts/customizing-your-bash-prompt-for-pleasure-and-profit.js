import {code, em, h3, h4, p, strong} from "../elements.js";
import {captioned$002Dimages, code$002Dblock, update} from "../components.js";
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
const excerpt = [p(["Mac OS X's default bash prompt is dull and uninformative."]), captioned$002Dimages([{
  alt: "Mac OS X's default bash prompt",
  src: "/images/posts/80/windows/default-os-x-bash-prompt.png",
  caption: ["Mac OS X's default bash prompt"]
}]), p(["Since only the current directory name is visible, I find myself running ", code(["pwd"]), " more often than is healthy. Also, I find the uneven prompt\n    length jarring."])];
const body = [...excerpt, p(["My solution to both of these problems is to include the full path ", em(["on its own line"]), " (with a preceding ", code(["\\n"]), "\n    providing much-needed breathing room)."]), captioned$002Dimages([{
  alt: "Custom bash prompt which displays the full path",
  src: "/images/posts/80/windows/custom-bash-prompt.png",
  caption: ["Custom bash prompt which displays the full path"]
}]), h3(["Configuring the bash prompt"]), p(["Add something like the following to your ", strong(["~/.bashrc"]), "."]), code$002Dblock("bash")(`PS1="\\n\\[\\e[1;36m\\]\\w\\n\\[\\e[1;32m\\]> \\[\\e[0m\\]"
`), h4(["What the heck does all this mean?"]), p([code(["PS1"]), " refers to the bash prompt. ", code(["PS2"]), ", ", code(["PS3"]), ", and ", code(["PS4"]), " relate to similar things."]), p([code(["\\n"]), " is a newline."]), p([code(["\\["]), " begins a sequence of non-printing characters."]), p([code(["\\e[1;36m"]), " is the code for \"light cyan\"."]), p([code(["\\]"]), " ends the sequence of non-printing characters."]), p([code(["\\w"]), " is the current working directory\n    (with a tilde used in place of ", code(["$HOME"]), ")."]), p([code(["\\n"]), " is another newline."]), p([code(["\\[\\e[1;32m\\]"]), " is a sequence of non-printing\n    characters containing the code for \"light green\"."]), p([code(["> "]), " is simply a \">\" followed by a space."]), p([code(["\\[\\e[0m\\]"]), " puts an end to the colouring,\n    preventing it from \"spilling out\"."]), update(datetime("2011-04-03")("21:00:00")("America/Los_Angeles"))([p(["When first this post was published colour codes were not\n      preceded by ", code(["\\["]), ". The colour codes themselves\n      were thus considered when calculating the prompt's length,\n      meaning that the first several characters of a command\n      would sometimes remain visible when arrowing up and down.\n      >.<"])]), update(datetime("2012-04-20")("01:15:00")("America/Los_Angeles"))([p(["I've recently taken up Vim. In Vim, one can enter ", code([":shell"]), " while in command mode to open a shell.\n      The first time I did so I noticed that the colour codes\n      appeared in the prompt. Feature detection can be used to\n      ensure that colour codes are only provided to \"smart\"\n      terminals:"]), code$002Dblock("bash")(`[[ "$TERM" == dumb ]] && PS1="\\n\\w\\n> "
[[ "$TERM" != dumb ]] && PS1="\\n\\[\\e[1;36m\\]\\w\\n\\[\\e[1;32m\\]> \\[\\e[0m\\]"
`)]), h4(["Note for Mac OS X users"]), p(["Terminal loads your ", strong(["~/.bash_profile"]), " but not your ", strong(["~/.bashrc"]), ". As a result, your ", strong(["~/.bash_profile"]), "\n    should contain the following snippet."]), code$002Dblock("bash")(`if [ -f ~/.bashrc ]; then
  source ~/.bashrc
fi
`)];
export default {
  id: 80,
  slug: "customizing-your-bash-prompt-for-pleasure-and-profit",
  title: ["Customizing your bash prompt for pleasure and profit"],
  datetime: datetime("2011-02-13")("01:30:00")("America/Los_Angeles"),
  tags: ["mac-os-x", "productivity", "terminal.app"],
  body
};
