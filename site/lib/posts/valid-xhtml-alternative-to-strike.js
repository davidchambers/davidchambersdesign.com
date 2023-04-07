import {a, code, del, ins, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Today I noticed that a page on this site failed validation. ", a({
  href: "http://validator.w3.org/"
})(["W3C's markup validation service"]), "\n    gave the following error:"]), code$002Dblock("plain-text")(`element "strike" undefined
`), p([code(["<strike>"]), " is not valid XHTML; I'd forgotten the correct\n    XHTML markup for this purpose:"]), code$002Dblock("html")(`my favourite colour is <del>red</del> <ins>white</ins>
`), p(["The above gives:\n    my favourite colour is ", del(["red"]), " ", ins(["white"])]), p(["It's a good idea to explicitly define the appearance of deleted\n    and inserted text in your style sheet:"]), code$002Dblock("css")(`del { text-decoration: line-through; }
ins { text-decoration: underline; }
`)];
export default {
  id: 8,
  slug: "valid-xhtml-alternative-to-strike",
  title: ["Valid XHTML alternative to ", code(["<strike>"])],
  datetime: datetime("2009-03-17 21:53:00 (Pacific/Auckland)"),
  tags: ["css", "html"],
  body
};
