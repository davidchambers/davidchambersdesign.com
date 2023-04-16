import {h3$0027, p, a, code} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["So, you're about to style an unordered list of some sort..."]), code$002Dblock("html")("<h1>TXJS 2011 Speakers</h1>\n<ul>\n  <li>Brendan Eich</li>\n  <li>Alex Russell</li>\n  <li>Douglas Crockford</li>\n  <li>Paul Irish</li>\n</ul>\n  "), p(["You've decided upon hanging square bullets in a light grey – ", "nothing too distracting..."]), code$002Dblock("css")("ul {\n  list-style: square outside;\n  color: #ccc;\n}\nli {\n  color: #000;\n}\n  "), p(["This should do the trick, but doesn't for some reason! How the heck ", "does one target the bullets and only the bullets? As far as I know ", "it's not possible."]), h3$0027({
  id: "conventional-hack"
})(["Conventional hack"]), code$002Dblock("html")("<h1>TXJS 2011 Speakers</h1>\n<ul>\n  <li><span>Brendan Eich</span></li>\n  <li><span>Alex Russell</span></li>\n  <li><span>Douglas Crockford</span></li>\n  <li><span>Paul Irish</span></li>\n</ul>\n\n<style>\n  ul {\n    list-style: square outside;\n    color: #ccc;\n  }\n  li > span {\n    color: #000;\n  }\n</style>\n  "), p(["This gets the job done, but those ", code(["span"]), "s are ugly – ", "there are ways to achieve the desired visual effect without ", "hacking the markup."]), h3$0027({
  id: "background-image-technique"
})(["Background image technique"]), code$002Dblock("css")("ul {\n  list-style: none;\n}\nli {\n  margin-left: -12px;\n  background: url(bullet.png) no-repeat 0;\n  text-indent: 12px;\n}\n  "), p(["This requires very little CSS. To avoid incurring the overhead ", "of an extra HTTP request, one could Base64-encode the image in a ", a({
  href: "http://en.wikipedia.org/wiki/Data_URI_scheme#CSS"
})(["data URI"]), "."]), h3$0027({
  id: "pseudo-element-technique"
})(["Pseudo-element technique"]), code$002Dblock("css")("ul {\n  list-style: none;\n}\nli {\n  position: relative;\n}\nli:before {\n  position: absolute;\n  top: 8px;\n  margin: 8px 0 0 -12px;\n    /* accommodate Camino */\n    vertical-align: middle;\n    display: inline-block;\n  width: 4px;\n  height: 4px;\n  background: #ccc;\n  content: \"\";\n}\n  "), p(["So it's possible to fashion square bullets of any colour ", "with just a handful of straightforward declarations. Nice!"]), p(["Prefer round bullets? No problem. :)"]), code$002Dblock("css")("...\n-webkit-border-radius: 2px;\n-moz-border-radius: 2px;\nborder-radius: 2px;\n...\n  ")];
export default {
  id: 83,
  slug: "changing-the-colour-of-list-bullets-using-css",
  title: ["Changing the colour of list bullets using CSS"],
  datetime: datetime("2011-04-13 17:30:00 (America/Los_Angeles)"),
  tags: ["css", "meaningful-markup"],
  body
};
