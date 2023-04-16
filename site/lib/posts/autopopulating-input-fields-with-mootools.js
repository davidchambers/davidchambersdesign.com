import {p, a, code} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Early this year I wrote a post titled ", a({
  href: "/autopopulating-input-fields-with-prototype/"
})(["Auto-populating input fields with Prototype"]), ". ", "Looking at the code now, I realize that it's not very pretty. ", "I'm rewriting this site's JavaScript in MooTools, and the new ", "code is quite a bit more elegant."]), code$002Dblock("javascript")("// provide input hints\nwindow.addEvent('domready', function () {\n    $$('input[placeholder]').addEvents({\n        focus: function () {\n            if (this.hasClass('placeholder')) {\n                this.removeClass('placeholder').set('value', '');\n            }\n        },\n        blur: function () {\n            if (this.get('value') === '') {\n                this.addClass('placeholder').set('value', this.get('placeholder'));\n            }\n        }\n    }).fireEvent('blur');\n});\n  "), p(["I really appreciate the fact that MooTools provides ", code(["addEvents"]), " in addition to ", code(["addEvent"]), ". ", "As a result, the code above is clearer than a well-written ", "Prototype equivalent."])];
export default {
  id: 52,
  slug: "autopopulating-input-fields-with-mootools",
  title: ["Auto-populating input fields with MooTools"],
  datetime: datetime("2010-06-09 23:23:00 (Pacific/Auckland)"),
  tags: ["html5", "javascript", "mootools", "ux"],
  body
};
