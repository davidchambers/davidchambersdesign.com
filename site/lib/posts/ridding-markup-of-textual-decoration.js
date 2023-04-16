import {h2, p, a, code, em, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["On the Web it's not uncommon to see characters with ", "no inherent meaning used for stylistic reasons. A good ", "example is the ", a({
  href: "#"
})(["Read more »"]), " link. ", "Perhaps the directionality of the \"»\" is suggestive of ", "travelling to another page, or perhaps the letterform is ", "included solely for its aesthetic appeal. Whatever the case, ", "one thing is certain: links do not require right-pointing ", "double angle quotation marks in order to function."]), p([strong(["The inclusion of such a character is therefore ", "a design decision."]), " It is decoration, not content. ", "It belongs in a style sheet, not in a page's markup."])];
const body = [...excerpt, h2(["Adding decorative textual content via CSS"]), p(["The ", a({
  href: "http://reference.sitepoint.com/css/content"
})([code(["content"])]), " property is extremely powerful. ", "It's used in conjunction with the ", a({
  href: "http://reference.sitepoint.com/css/pseudoelement-before"
})([code([":before"])]), " and ", a({
  href: "http://reference.sitepoint.com/css/pseudoelement-after"
})([code([":after"])]), " pseudo-elements."]), code$002Dblock("plain-text")("<a class=\"more\" href=\"/meaningful-markup/\">Read more</a>\n\n.more:after {\n    content: \" »\";\n}\n  "), p(["There are many other situations in which ", code([":before"]), "/", code([":after"]), " and ", code(["content"]), " can team up to great ", "effect. Often sites have footer links separated by \"pipes\". ", "These pipes commonly appear in the site's markup. ", strong(["This is wrong!"]), " Last week I was horrified to ", "discover that ", a({
  href: "http://bitbucket.org/"
})(["Bitbucket"]), " ", "is guilty of this. I've since rectified the situation ", "(although the change is yet to go live)."]), code$002Dblock("css")(".footer-nav li {\n    display: inline;\n    list-type: none;\n}\n.footer-nav li+li:before {\n    content: \" | \";\n}\n  "), p(["The second selector above may look strange unless you're ", "familiar with this approach. By using ", code(["li+li"]), " we ", "target every ", code(["li"]), " inside ", code([".footer-nav"]), " ", em(["except the first"]), "."]), p(["Another case in which there's a temptation to mark up content in ", "a certain way in order to achieve a certain visual appearance is ", "the comma-separated list."]), code$002Dblock("html")("<p><strong>Tags:</strong> Apple, iOS, iPad</p>\n  "), p(["This approach is inflexible. Displaying the tags as Twitter-style ", "hashtags, for example, would require fiddling with the markup. ", "Adding a tag icon beside each tag would require rewriting the ", "markup completely."]), p(["A better approach would be to let the ", em(["content"]), " dictate ", "the markup used. Since we have a ", em(["list"]), " of tags, we should ", "use a list of some sort. Since the list is in non-arbitrary order ", "(alphabetical), an ordered list is probably appropriate. \"Tags\" ", "is a heading that relates to the list of tags."]), code$002Dblock("html")("<h4>Tags</h4>\n<ol>\n    <li>Apple</li>\n    <li>iOS</li>\n    <li>iPad</li>\n</ol>\n  "), p(["It takes a bit of work to display this markup as a simple ", "comma-separated list, but it gives us the freedom to dramatically ", "alter the list's appearance without touching the markup."]), code$002Dblock("css")("h4, ol, li {\n    display: inline;\n}\nh4:after {\n    content: \":\";\n}\nli:after {\n    content: \",\";\n}\nli:last-child:after {\n    content: \"\";\n}\n  "), h2(["Summary"]), p(["When marking up content, one should use the elements which ", "best ", em(["describe"]), " that content. ", em(["Styling"]), " ", "content is a separate (though not unrelated) issue. With ", code([":before"]), ", ", code([":after"]), ", and ", code(["content"]), " at our disposal, let us bid farewell to ", code(["<span class=\"pipe\">|</span>"]), " and friends."])];
export default {
  id: 73,
  slug: "ridding-markup-of-textual-decoration",
  title: ["Ridding markup of textual decoration"],
  datetime: datetime("2010-11-15 01:00:00 (Australia/Sydney)"),
  tags: ["css", "html", "meaningful-markup"],
  body
};
