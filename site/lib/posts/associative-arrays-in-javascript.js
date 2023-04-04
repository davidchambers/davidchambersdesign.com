import {a, code, em, p, strong} from "../elements.js";
import datetime from "../datetime.js";
const body = [p([strong(["JavaScript does not have associative arrays."]), "\n    (This will be old news to many.)"]), p(["Confusion arises from the fact that array syntax in JavaScript is\n    very similar to array syntax in PHP, a language that ", em(["does"]), "\n    have associative arrays. Additionally, ", strong(["any object in\n    JavaScript can be treated as an associative array"]), ". This means\n    that if one creates a JavaScript ", code(["Array"]), " object and\n    proceeds to use PHP's associative array syntax in an attempt to\n    add items to it, one ", em(["will"]), " succeed in assigning it\n    attribute–value pairs. The object in question need not be an ", code(["Array"]), " for this to work, though, so for the sake of\n    clarity using a vanilla ", code(["Object"]), " is advisable."]), p(["To gain a more detailed understanding of why JavaScript ", em(["appears"]), " to have associative arrays, read ", a({
  href: "http://andrewdupont.net/2006/05/18/javascript-associative-arrays-considered-harmful/"
})([`JavaScript "Associative Arrays" Considered Harmful`]), "."])];
export default {
  id: 19,
  slug: "associative-arrays-in-javascript",
  title: ["Associative arrays in JavaScript"],
  datetime: datetime("2009-06-29")("19:14:00")("Pacific/Auckland"),
  tags: ["best-practice", "javascript"],
  body
};
