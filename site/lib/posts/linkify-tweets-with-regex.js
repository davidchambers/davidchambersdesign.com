import {h3, h4, p, a, code, em, img} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p([img({
  alt: "",
  src: "/images/posts/decorative/right/at-sign-in-speech-bubble.png"
})]), p(["Regular expressions are powerful, useful, and", $2014, "in my opinion", $2014, "lots of fun! Thanks to the prevalence of Twitter, every web developer ", "will be exposed to regex sooner or later: before outputting tweets in ", "HTML, Twitter names and hyperlinks must be wrapped in anchor tags."]), h3(["Matching @names"]), p(["Here's the gist: a match will begin with \"@\" and the at sign ", "must be followed by one or more word (letter / number / underscore) ", "characters. The @name must either appear at the beginning of the tweet ", "or be preceded by a space. This prevents the regular expression from ", "matching \"@example\" in \"me@example.com\"."])];
const body = [...excerpt, h4(["JavaScript implementation"]), code$002Dblock("javascript")("tweet.replace(/(^|\\s)(@\\w+)/gm, '$1<a href=\"http://twitter.com/$2\">$2</a>');\n  "), p(["It would of course be nicer to write:"]), code$002Dblock("javascript")("tweet.replace(/(?<=(?:^|\\s))(@\\w+)/gm, '<a href=\"http://twitter.com/$1\">$1</a>');\n  "), p(["Unfortunately, JavaScript does not support lookbehinds in ", "regular expressions, so one's forced to capture the preceding ", "space character (if in fact there is one) and spit it out in ", "the replacement string."]), h4(["PHP implementation"]), code$002Dblock("php")("preg_replace('/(^|\\s)(@\\w+)/m', '$1<a href=\"http://twitter.com/$2\">$2</a>', $tweet);\n  "), h4(["Python implementation"]), p(["Python ", em(["does"]), " support lookbehinds, but only ", em(["fixed-width"]), " lookbehinds, so it won't allow ", code(["(?<=^|\\s)"]), ". No matter."]), code$002Dblock("python")("import re\nre.sub(r'(?m)(^|\\s)(@\\w+)',\n        lambda m: m.group(1) + '<a href=\"http://twitter.com/' + m.group(2) + '\">' + m.group(2) + '</a>',\n        tweet)\n  "), p(["For once, Python's syntax is the least elegant!"]), p(["Interestingly, while testing these snippets I found I did not ", "need to specify multi-line mode. Perhaps multi-line mode is ", "assumed? I'd like to know the answer."]), h3(["Matching hyperlinks"]), p(["The regular expression involved in matching ", "hyperlinks is more complex. I'll point you to John Gruber's ", a({
  href: "http://daringfireball.net/2009/11/liberal_regex_for_matching_urls"
})(["liberal regex for matching URLs"]), " as he's clearly put a great ", "deal of thought into what is essentially a single line of code!"])];
export default {
  id: 48,
  slug: "linkify-tweets-with-regex",
  title: ["Linkify tweets with regex"],
  datetime: datetime("2010-04-10 03:22:00 (Pacific/Auckland)"),
  tags: ["javascript", "php", "python", "regex", "regular-expressions"],
  body
};
