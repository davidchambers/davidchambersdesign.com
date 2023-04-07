import {code, p} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["This site's search field has been virtually unusable in Chrome\n    and Safari on Windows for several months. Fixing it was not high\n    on my priority list, but I finally got to it this evening."]), captioned$002Dimages([{
  alt: "-webkit-box-sizing: border-box",
  src: "/images/posts/58/-webkit-box-sizing=border-box.png",
  caption: ["Before"]
}]), p(["I did my best to get these browsers to respect the padding values\n    that I'd assigned in my style sheet, getting aggressive in the Web\n    Inspector. No joy."]), p(["I then noticed a curious property, ", code(["-webkit-box-sizing"]), ".\n    Sure enough, this was the culprit. Safari and Chrome both use ", code(["border-box"]), " as the default value, which means that\n    padding does not add to an element's dimensions the way it does\n    in the standard box model."]), p(["Specifying ", code(["content-box"]), " fixed the problem."]), captioned$002Dimages([{
  alt: "-webkit-box-sizing: content-box",
  src: "/images/posts/58/-webkit-box-sizing=content-box.png",
  caption: ["After"]
}]), p(["This is an extremely satisfying solution as it neatly targets\n    the source of the problem."]), p(["The question remains as to why these browsers default to ", code(["border-box"]), " as the ", code(["box-sizing"]), " for ", code(["input"]), " elements with ", code(["type=\"search\""]), ".\n    I don't know whether default styles are specified at the\n    rendering engine level or at the browser level, but either\n    way I would say that it's the result of Apple fiddling with\n    the controls to make search inputs look sexy on Mac OS X\n    (where they're rendered very differently)."])];
export default {
  id: 58,
  slug: "-webkit-box-sizing",
  title: ["-webkit-box-sizing"],
  datetime: datetime("2010-07-18 21:30:00 (Pacific/Auckland)"),
  tags: ["css", "webkit"],
  body
};
