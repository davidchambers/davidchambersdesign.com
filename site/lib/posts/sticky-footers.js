import {p, a, em, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p([strong(["Sticky footers should be ubiquitous. They are not."])]), p(["This leads me to believe that many developers are unaware ", "of how to prevent footers from floating up on pages without ", "much content."])];
const body = [...excerpt, p(["I'll explain how it's done. The markup must look something like ", "the following:"]), code$002Dblock("html")("<body>\n    <div id=\"wrap\">\n        <div id=\"main\">\n        </div>\n    </div>\n    <div id=\"footer\">\n    </div>\n</body>\n  "), p(["The required CSS is also straightforward. First, set the heights ", "of the html and body elements to the height of the viewport:"]), code$002Dblock("css")("html    { height: 100%; }\nbody    { height: 100%; }\n  "), p(["This makes it possible to set the ", em(["minimum"]), " height of ", "the wrapper div to the height of the viewport:"]), code$002Dblock("css")("#wrap   { min-height: 100%; }\n  "), p(["Next, pull up the footer so that it's visible without scrolling ", "on pages without a lot of content:"]), code$002Dblock("css")("#footer { margin-top: -5em; height: 5em; }\n  "), p(["Finally, apply bottom padding to the main content div to ensure ", "that nothing is covered by the footer:"]), code$002Dblock("css")("#main   { padding-bottom: 5em; }\n  "), p(["Putting it all together gives the following:"]), code$002Dblock("css")("html    { height: 100%; }\nbody    { height: 100%; }\n#wrap   { min-height: 100%; }\n#main   { padding-bottom: 5em; }\n#footer { margin-top: -5em; height: 5em; }\n  "), p(["This CSS works in all modern browsers. If you need to support ", "antiquated browsers, you should have a look at the hacks suggested ", "at ", a({
  href: "http://www.cssstickyfooter.com/"
})(["CSS Sticky Footer"]), "."]), p([strong(["Check out the ", a({
  href: "/examples/sticky-footers/"
})(["sticky footer demo"]), " ", "to see all this theory in action."])])];
export default {
  id: 27,
  slug: "sticky-footers",
  title: ["Sticky footers"],
  datetime: datetime("2009-09-20 01:08:00 (Pacific/Auckland)"),
  tags: ["css", "html"],
  body
};
