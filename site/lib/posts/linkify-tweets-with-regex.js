import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  flip: f => y => x => f(x)(y),
  id: x => x,
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  match: type => type[Symbol.for("match")],
  not: b => !b,
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  reject: predicate => Prelude.filter(x => !predicate(x))
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, id, map, match, not, reduce, reduceRight, reject} = Prelude;
const excerpt = [p([img({
  alt: "",
  src: "/images/posts/decorative/right/at-sign-in-speech-bubble.png"
})]), p(["Regular expressions are powerful, useful, and", $2014, "in my opinion", $2014, "lots of fun! Thanks to the prevalence of Twitter, every web developer\n    will be exposed to regex sooner or later: before outputting tweets in\n    HTML, Twitter names and hyperlinks must be wrapped in anchor tags."]), h3(["Matching @names"]), p([`Here's the gist: a match will begin with "@" and the at sign must be
    followed by one or more word (letter / number / underscore) characters.
    The @name must either appear at the beginning of the tweet or be preceded
    by a space. This prevents the regular expression from matching "@example"
    in "me@example.com".`])];
const body = [...excerpt, h4(["JavaScript implementation"]), code$002Dblock("javascript")(`tweet.replace(/(^|\\s)(@\\w+)/gm, '$1<a href="http://twitter.com/$2">$2</a>');
`), p(["It would of course be nicer to write:"]), code$002Dblock("javascript")(`tweet.replace(/(?<=(?:^|\\s))(@\\w+)/gm, '<a href="http://twitter.com/$1">$1</a>');
`), p(["Unfortunately, JavaScript does not support lookbehinds in\n    regular expressions, so one's forced to capture the preceding\n    space character (if in fact there is one) and spit it out in\n    the replacement string."]), h4(["PHP implementation"]), code$002Dblock("php")(`preg_replace('/(^|\\s)(@\\w+)/m', '$1<a href="http://twitter.com/$2">$2</a>', $tweet);
`), h4(["Python implementation"]), p(["Python ", em(["does"]), " support lookbehinds, but only ", em(["fixed-width"]), " lookbehinds, so it won't allow ", code(["(?<=^|\\s)"]), ". No matter."]), code$002Dblock("python")(`import re
re.sub(r'(?m)(^|\\s)(@\\w+)',
        lambda m: m.group(1) + '<a href="http://twitter.com/' + m.group(2) + '">' + m.group(2) + '</a>',
        tweet)
`), p(["For once, Python's syntax is the least elegant!"]), p(["Interestingly, while testing these snippets I found I did not\n    need to specify multi-line mode. Perhaps multi-line mode is\n    assumed? I'd like to know the answer."]), h3(["Matching hyperlinks"]), p(["The regular expression involved in matching\n    hyperlinks is more complex. I'll point you to John Gruber's ", a({
  href: "http://daringfireball.net/2009/11/liberal_regex_for_matching_urls"
})(["liberal regex for matching URLs"]), " as he's clearly put a great\n    deal of thought into what is essentially a single line of code!"])];
export default {
  id: 48,
  slug: "linkify-tweets-with-regex",
  title: ["Linkify tweets with regex"],
  datetime: datetime("2010-04-10")("03:22:00")("Pacific/Auckland"),
  tags: ["javascript", "php", "python", "regex", "regular-expressions"],
  body
};
