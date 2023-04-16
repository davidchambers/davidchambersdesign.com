import {h3$0027, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Python and Ruby share beautiful syntax for repeating strings; ", "PHP's syntax is characteristically ugly."]), h3$0027({
  id: "python"
})(["Python"]), code$002Dblock("python")("'=' * 5\n  "), h3$0027({
  id: "ruby"
})(["Ruby"]), code$002Dblock("ruby")("'=' * 5\n  "), h3$0027({
  id: "php"
})(["PHP"]), code$002Dblock("php")("str_repeat('=', 5)\n  "), h3$0027({
  id: "javascript"
})(["JavaScript?"]), p(["True to form, repeating strings in JavaScript is ugly and ", "counterintuitive, but kinda cool."]), code$002Dblock("javascript")("new Array(5 + 1).join('=')\n  ")];
export default {
  id: 82,
  slug: "repeating-strings-in-javascript",
  title: ["Repeating strings in JavaScript"],
  datetime: datetime("2011-03-31 17:30:00 (America/Los_Angeles)"),
  tags: ["javascript", "programming"],
  body
};
