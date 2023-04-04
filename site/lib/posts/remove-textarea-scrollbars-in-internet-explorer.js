import {a, code, em, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["I was delighted to discover this \"trick\"\n    over on CSS-Tricks in a post titled ", a({
  href: "http://css-tricks.com/textarea-tricks/"
})(["Textarea Tricks"]), ".\n    (See, Chris, I ", em(["do"]), " like you!)"]), p(["Internet Explorer displays a (completely pointless) inactive scrollbar in\n    empty ", code(["textarea"]), " elements, unlike other browsers which wait\n    until a scrollbar is actually ", em(["required"]), " before displaying it."]), p(["As it turns out, there's a dead simple way to prevent this,\n    and once again its everybody's friend ", code(["overflow"]), "\n    to the rescue."]), code$002Dblock("css")(`textarea { overflow: auto; }
`), p(["The ", code(["overflow"]), " property seems to be a magical remedy\n    for a variety of different ailments, most significant of which\n    is the collapsing of an element whose children are all floated.\n    Applying ", code(["overflow: auto"]), " makes the element wrap its\n    children rather than letting them \"hang\"."]), p(["One thing that I sometimes ponder, though, is why ", code(["visible"]), "\n    was selected as the default ", code(["overflow"]), " value – it seems\n    inferior to ", code(["auto"]), " in most use cases."])];
export default {
  id: 59,
  slug: "remove-textarea-scrollbars-in-internet-explorer",
  title: ["Remove textarea scrollbars in Internet Explorer"],
  datetime: datetime("2010-07-18")("22:00:00")("Pacific/Auckland"),
  tags: ["css"],
  body
};
