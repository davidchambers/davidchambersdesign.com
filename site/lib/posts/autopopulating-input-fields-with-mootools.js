import {a, code, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Early this year I wrote a post titled ", a({
  href: "/autopopulating-input-fields-with-prototype/"
})(["Auto-populating input fields with Prototype"]), ".\n    Looking at the code now, I realize that it's not very pretty.\n    I'm rewriting this site's JavaScript in MooTools, and the new\n    code is quite a bit more elegant."]), code$002Dblock("javascript")(`// provide input hints
window.addEvent('domready', function () {
    $$('input[placeholder]').addEvents({
        focus: function () {
            if (this.hasClass('placeholder')) {
                this.removeClass('placeholder').set('value', '');
            }
        },
        blur: function () {
            if (this.get('value') === '') {
                this.addClass('placeholder').set('value', this.get('placeholder'));
            }
        }
    }).fireEvent('blur');
});
`), p(["I really appreciate the fact that MooTools provides ", code(["addEvents"]), " in addition to ", code(["addEvent"]), ".\n    As a result, the code above is clearer than a well-written\n    Prototype equivalent."])];
export default {
  id: 52,
  slug: "autopopulating-input-fields-with-mootools",
  title: ["Auto-populating input fields with MooTools"],
  datetime: datetime("2010-06-09 23:23:00 (Pacific/Auckland)"),
  tags: ["html5", "javascript", "mootools", "ux"],
  body
};
