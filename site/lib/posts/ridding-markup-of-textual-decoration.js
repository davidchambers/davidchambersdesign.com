import {a, code, em, h2, p, strong} from "../elements.js";
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
const excerpt = [p(["On the Web it's not uncommon to see characters with\n    no inherent meaning used for stylistic reasons. A good\n    example is the ", a({
  href: "#"
})(["Read more »"]), " link.\n    Perhaps the directionality of the \"»\" is suggestive of\n    travelling to another page, or perhaps the letterform is\n    included solely for its aesthetic appeal. Whatever the case,\n    one thing is certain: links do not require right-pointing\n    double angle quotation marks in order to function."]), p([strong(["The inclusion of such a character is therefore\n    a design decision."]), " It is decoration, not content.\n    It belongs in a style sheet, not in a page's markup."])];
const body = [...excerpt, h2(["Adding decorative textual content via CSS"]), p(["The ", a({
  href: "http://reference.sitepoint.com/css/content"
})([code(["content"])]), " property is extremely powerful.\n    It's used in conjunction with the ", a({
  href: "http://reference.sitepoint.com/css/pseudoelement-before"
})([code([":before"])]), " and ", a({
  href: "http://reference.sitepoint.com/css/pseudoelement-after"
})([code([":after"])]), " pseudo-elements."]), code$002Dblock("plain-text")(`<a class="more" href="/meaningful-markup/">Read more</a>

.more:after {
    content: " »";
}
`), p(["There are many other situations in which ", code([":before"]), "/", code([":after"]), " and ", code(["content"]), " can team up to great\n    effect. Often sites have footer links separated by \"pipes\".\n    These pipes commonly appear in the site's markup. ", strong(["This is wrong!"]), " Last week I was horrified to\n    discover that ", a({
  href: "http://bitbucket.org/"
})(["Bitbucket"]), "\n    is guilty of this. I've since rectified the situation\n    (although the change is yet to go live)."]), code$002Dblock("css")(`.footer-nav li {
    display: inline;
    list-type: none;
}
.footer-nav li+li:before {
    content: " | ";
}
`), p(["The second selector above may look strange unless you're\n    familiar with this approach. By using ", code(["li+li"]), " we\n    target every ", code(["li"]), " inside ", code([".footer-nav"]), " ", em(["except the first"]), "."]), p(["Another case in which there's a temptation to mark up content in\n    a certain way in order to achieve a certain visual appearance is\n    the comma-separated list."]), code$002Dblock("html")(`<p><strong>Tags:</strong> Apple, iOS, iPad</p>
`), p(["This approach is inflexible. Displaying the tags as Twitter-style\n    hashtags, for example, would require fiddling with the markup.\n    Adding a tag icon beside each tag would require rewriting the\n    markup completely."]), p(["A better approach would be to let the ", em(["content"]), " dictate\n    the markup used. Since we have a ", em(["list"]), " of tags, we should\n    use a list of some sort. Since the list is in non-arbitrary order\n    (alphabetical), an ordered list is probably appropriate. \"Tags\"\n    is a heading that relates to the list of tags."]), code$002Dblock("html")(`<h4>Tags</h4>
<ol>
    <li>Apple</li>
    <li>iOS</li>
    <li>iPad</li>
</ol>
`), p(["It takes a bit of work to display this markup as a simple\n    comma-separated list, but it gives us the freedom to dramatically\n    alter the list's appearance without touching the markup."]), code$002Dblock("css")(`h4, ol, li {
    display: inline;
}
h4:after {
    content: ":";
}
li:after {
    content: ",";
}
li:last-child:after {
    content: "";
}
`), h2(["Summary"]), p(["When marking up content, one should use the elements which\n    best ", em(["describe"]), " that content. ", em(["Styling"]), "\n    content is a separate (though not unrelated) issue. With ", code([":before"]), ", ", code([":after"]), ", and ", code(["content"]), " at our disposal, let us bid farewell to ", code([`<span class="pipe">|</span>`]), " and friends."])];
export default {
  id: 73,
  slug: "ridding-markup-of-textual-decoration",
  title: ["Ridding markup of textual decoration"],
  datetime: datetime("2010-11-15")("01:00:00")("Australia/Sydney"),
  tags: ["css", "html", "meaningful-markup"],
  body
};
