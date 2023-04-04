import {code, em, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["I've spent the afternoon creating a custom scrollbar for a\n    products viewer which utilizes CSS transitions, reflections,\n    and other goodness."]), p(["Simple arithmetic dictates how long to make the scrollbar\n    and where to position it, but I could not get my theoretical\n    calculations to play out in the browser."]), p(["It turns out that I'd been calling the wrong MooTools method.\n    I'd been doing..."]), code$002Dblock("javascript")(`element.setStyle('left', offset);
`), p(["rather than..."]), code$002Dblock("javascript")(`element.setPosition({ x: offset });
`), p(["Frustratingly, ", code(["setStyle('left', offset)"]), " ", em(["appeared"]), " to work, but its behaviour was unpredictable.\n    I'm still confused by this, but at least I'm no longer stuck."])];
export default {
  id: 60,
  slug: "positioning-elements-using-mootools",
  title: ["Positioning elements using MooTools"],
  datetime: datetime("2010-07-19")("17:45:00")("Pacific/Auckland"),
  tags: ["javascript", "mootools"],
  body
};
