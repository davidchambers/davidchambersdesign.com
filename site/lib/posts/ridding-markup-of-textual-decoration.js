import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => Prelude["match'"](type)(_ => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
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
const {_apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
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
