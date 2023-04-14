import {aside$0027, p, a, code, em} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Many of those who write JavaScript do not come from programming\n    backgrounds (while I've written plenty of PHP, Python, and\n    JavaScript, I don't have much experience with \"real\" programming\n    languages", a({
  href: "#footnote"
})(["*"]), "). As a result, a significant\n    portion of JavaScript coders do not think of variables as pointers\n    to memory addresses. This leads to confusion in cases such as this:"]), code$002Dblock("javascript")(`var fruits = ['orange', 'lime'];
var colours = fruits; // naïve attempt to duplicate array
colours.push('yellow');
`), p(["One might be surprised to learn that ", code(["fruits"]), " now contains\n    not just \"orange\" and \"lime\" but also \"yellow\". Oops! Here's how\n    it went wrong:"]), code$002Dblock("javascript")(`var fruits = ['orange', 'lime'];
// fruits points to array containing "orange" and "lime"

var colours = fruits;
// colours now points to that same array!
`), p(["How, then, does one create a copy of the original array? ", em(["Slice!"])]), code$002Dblock("javascript")(`var colours = fruits.slice();
`), aside$0027({
  id: "footnote"
})(["* Languages such as C.\n    Like ", a({
  href: "http://www.quirksmode.org/about/"
})(["ppk"]), ",\n    I take care to include quotation marks. ;)"])];
export default {
  id: 35,
  slug: "duplicating-arrays-in-javascript",
  title: ["Duplicating arrays in JavaScript"],
  datetime: datetime("2010-01-09 19:26:00 (Pacific/Auckland)"),
  tags: ["javascript"],
  body
};
