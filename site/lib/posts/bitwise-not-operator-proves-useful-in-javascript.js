import {p, a, code, em} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["JavaScript is a wonderful language. Its syntax, though, leaves a ", "lot to be desired at times. String pattern matching, for example, ", "is rather ugly."]), code$002Dblock("javascript")("// ugly option 1\nif (text.indexOf('✈') != -1)\n\n// ugly option 2\nif (text.indexOf('✈') >= 0)\n\n// ugly option 3\nif (text.indexOf('✈') > -1)\n  "), p(["It'd be nice to be able to write ", code(["text.contains('✈')"]), ", ", "which is both intuitive and self-documenting. The language does provide ", "a way to make such expressions terser, but it's far from obvious."]), code$002Dblock("javascript")("// bitwise NOT\nif (~text.indexOf('✈'))\n  "), p([a({
  href: "https://developer.mozilla.org/en/JavaScript/Reference/Operators/Bitwise_Operators"
})(["Bitwise operators"]), " make my head spin, but the Perl programmer in ", "me thinks they're awesome. I don't profess to understand ", em(["why"]), " ", "exactly the bitwise NOT operator does what it does, but I've played ", "with it enough to know how it behaves. It's equivalent to the following ", "function, at least for the values that can be returned by ", a({
  href: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/indexOf"
})([code(["indexOf"])]), "."]), code$002Dblock("javascript")("function bitwiseNot(n) {\n    return -n - 1;\n}\n  "), p([code(["indexOf"]), " returns -1, 0, 1, 2, 3, or some other positive ", "integer. When these values are used as operands for the bitwise NOT ", "operator, the results are 0, -1, -2, -3, -4, and so on. Therefore, ", code(["~text.indexOf('✈')"]), " is equivalent to ", code(["text.contains('✈')"]), " in Boolean contexts."])];
export default {
  id: 75,
  slug: "bitwise-not-operator-proves-useful-in-javascript",
  title: ["Bitwise NOT operator proves useful in JavaScript"],
  datetime: datetime("2010-12-11 15:00:00 (Australia/Sydney)"),
  tags: ["javascript", "programming"],
  body
};
