import {aside$0027, p, a, code, em} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Many of those who write JavaScript do not come from programming ", "backgrounds (while I've written plenty of PHP, Python, and ", "JavaScript, I don't have much experience with \"real\" programming ", "languages", a({
  href: "#footnote"
})(["*"]), "). As a result, a significant ", "portion of JavaScript coders do not think of variables as pointers ", "to memory addresses. This leads to confusion in cases such as this:"]), code$002Dblock("javascript")("var fruits = ['orange', 'lime'];\nvar colours = fruits; // naïve attempt to duplicate array\ncolours.push('yellow');\n  "), p(["One might be surprised to learn that ", code(["fruits"]), " now contains ", "not just \"orange\" and \"lime\" but also \"yellow\". Oops! Here's how ", "it went wrong:"]), code$002Dblock("javascript")("var fruits = ['orange', 'lime'];\n// fruits points to array containing \"orange\" and \"lime\"\n\nvar colours = fruits;\n// colours now points to that same array!\n  "), p(["How, then, does one create a copy of the original array? ", em(["Slice!"])]), code$002Dblock("javascript")("var colours = fruits.slice();\n  "), aside$0027({
  id: "footnote"
})(["* Languages such as C. ", "Like ", a({
  href: "http://www.quirksmode.org/about/"
})(["ppk"]), ", ", "I take care to include quotation marks. ;)"])];
export default {
  id: 35,
  slug: "duplicating-arrays-in-javascript",
  title: ["Duplicating arrays in JavaScript"],
  datetime: datetime("2010-01-09 19:26:00 (Pacific/Auckland)"),
  tags: ["javascript"],
  body
};
