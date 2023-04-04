import {a, code, em, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["JavaScript is a wonderful language. Its syntax, though, leaves a\n    lot to be desired at times. String pattern matching, for example,\n    is rather ugly."]), code$002Dblock("javascript")(`// ugly option 1
if (text.indexOf('✈') != -1)

// ugly option 2
if (text.indexOf('✈') >= 0)

// ugly option 3
if (text.indexOf('✈') > -1)
`), p(["It'd be nice to be able to write ", code(["text.contains('✈')"]), ",\n    which is both intuitive and self-documenting. The language does provide\n    a way to make such expressions terser, but it's far from obvious."]), code$002Dblock("javascript")(`// bitwise NOT
if (~text.indexOf('✈'))
`), p([a({
  href: "https://developer.mozilla.org/en/JavaScript/Reference/Operators/Bitwise_Operators"
})(["Bitwise operators"]), " make my head spin, but the Perl programmer in\n    me thinks they're awesome. I don't profess to understand ", em(["why"]), "\n    exactly the bitwise NOT operator does what it does, but I've played\n    with it enough to know how it behaves. It's equivalent to the following\n    function, at least for the values that can be returned by ", a({
  href: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/indexOf"
})([code(["indexOf"])]), "."]), code$002Dblock("javascript")(`function bitwiseNot(n) {
    return -n - 1;
}
`), p([code(["indexOf"]), " returns -1, 0, 1, 2, 3, or some other positive\n    integer. When these values are used as operands for the bitwise NOT\n    operator, the results are 0, -1, -2, -3, -4, and so on. Therefore, ", code(["~text.indexOf('✈')"]), " is equivalent to ", code(["text.contains('✈')"]), " in Boolean contexts."])];
export default {
  id: 75,
  slug: "bitwise-not-operator-proves-useful-in-javascript",
  title: ["Bitwise NOT operator proves useful in JavaScript"],
  datetime: datetime("2010-12-11")("15:00:00")("Australia/Sydney"),
  tags: ["javascript", "programming"],
  body
};
