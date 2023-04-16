import {h3$0027, h3, p, ul, li, a, code, em, strong} from "../elements.js";
import {code$002Dblock, update} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["Yesterday I wrote a simple class which auto-populates ", "input fields, and thought it worth sharing. I was originally ", "inspired to write this code by Roger Johansson's post titled ", a({
  href: "http://www.456bereastreet.com/archive/200710/autopopulating_text_input_fields_with_javascript/"
})(["Autopopulating text input fields with JavaScript"]), ". ", "While I approached the problem from a slightly different angle, ", "I made sure to avoid the pitfalls Roger mentions."])];
const body = [...excerpt, update(datetime("2010-06-09 23:31:00 (Pacific/Auckland)"))(["I've written an update to this article for those interested in ", a({
  href: "/autopopulating-input-fields-with-mootools/"
})(["auto-populating input fields with MooTools"]), "."]), h3(["Contents"]), ul([li([a({
  href: "#behaviour"
})(["Behaviour"])]), li([a({
  href: "#html5-placeholder-text"
})(["HTML5 placeholder text"])]), li([a({
  href: "#markup"
})(["Markup"])]), li([a({
  href: "#styling"
})(["Styling"])]), li([a({
  href: "#placeholder-class"
})(["Placeholder class"])]), li([a({
  href: "#usage"
})(["Usage"])])]), h3$0027({
  id: "behaviour"
})(["Behaviour"]), ul([li(["Placeholder text should be inserted into input field ", "upon page load."]), li(["Placeholder text should be targetable via CSS."]), li(["Clicking or tabbing into input field should remove ", "placeholder text."]), li(["Placeholder text should be reinserted if input field ", "is empty when it loses focus."])]), h3$0027({
  id: "html5-placeholder-text"
})(["HTML5 placeholder text"]), p(["HTML5 allows placeholder text to be specified in the markup ", "through the ", code(["placeholder"]), " attribute. In supporting ", "browsers (currently Chrome and Safari) this produces the ", "behaviour described above with no reliance on JavaScript."]), h3$0027({
  id: "markup"
})(["Markup"]), code$002Dblock("html")("<input type=\"search\" id=\"s\" name=\"s\" placeholder=\"search...\" />\n  "), h3$0027({
  id: "styling"
})(["Styling"]), code$002Dblock("css")("input.placeholder { color: #a9a9a9 !important; }\n  "), p(["I decided to use ", code(["#a9a9a9"]), " as Safari uses this colour ", "for placeholder text."]), h3$0027({
  id: "placeholder-class"
})(["Placeholder class"]), code$002Dblock("javascript")("var Placeholder = Class.create({\n    initialize: function (element) {\n        this.element = element;\n        this.placeholder = element.readAttribute('placeholder');\n        this.blur();\n        Event.observe(this.element, 'focus', this.focus.bindAsEventListener(this));\n        Event.observe(this.element, 'blur', this.blur.bindAsEventListener(this));\n    },\n    focus: function () {\n        if (this.element.hasClassName('placeholder'))\n            this.element.clear().removeClassName('placeholder');\n    },\n    blur: function () {\n        if (this.element.value === '')\n            this.element.addClassName('placeholder').value = this.placeholder;\n    }\n});\n  "), p(["The Placeholder class requires ", a({
  href: "http://prototypejs.org/"
})(["Prototype"]), "."]), h3$0027({
  id: "usage"
})(["Usage"]), p(["To create a new instance of the Placeholder class, simply pass ", "the constructor a Prototype extended element:"]), code$002Dblock("javascript")("new Placeholder($('s'));\n  "), p(["Ensure that the DOM is ready by wrapping everything in Prototype's ", code(["dom:loaded"]), " event listener. This also avoids polluting the ", "global namespace."]), code$002Dblock("javascript")("document.observe('dom:loaded', function () {\n    var Placeholder = Class.create({\n        ...\n    });\n    $$('input[placeholder]').each(function (input) {\n        new Placeholder(input);\n    });\n});\n  "), update(datetime("2010-03-30 17:17:00 (Pacific/Auckland)"))([p(["I've updated the selector used in the above example. Selecting ", "all inputs with placeholder attributes is far more elegant than ", "listing each input explicitly. It also means that an input added ", "anywhere on the site will automatically receive this special ", "treatment (provided that it has a placeholder attribute)."])]), p([strong(["This site's search field shows the code in action."])]), update(datetime("2010-04-16 00:59:00 (Pacific/Auckland)"))([p(["For those that would like placeholder text in ", em(["password"]), " ", "input fields not to appear as dots or asterisks in older browsers, ", "I've written an alternative snippet. I drew inspiration from a post on ", a({
  href: "http://blog.decaf.de/2009/07/iphone-like-password-fields-using-jquery/"
})(["iPhone-like password fields using jQuery"]), "."]), code$002Dblock("javascript")("// provide input hints\ndocument.observe('dom:loaded', function () {\n    var PLACEHOLDER_SUFFIX = '_placeholder'; // used for password inputs\n\n    $$('input[placeholder]').each(function (input) {\n        var label, placeholder,\n            placeholder_text = input.readAttribute('placeholder');\n\n        if (input.readAttribute('type') == 'password') {\n            placeholder = input.clone();\n            placeholder.type = 'text'; // not \"password\"\n            placeholder.value = placeholder_text;\n            placeholder.addClassName('placeholder');\n\n            if (input.id) {\n                // update input id and label\n                placeholder.id += PLACEHOLDER_SUFFIX;\n                label = $$('label[for=\"' + input.id + '\"]')\n                label.invoke('writeAttribute', 'for', input.id +\n                        PLACEHOLDER_SUFFIX);\n            }\n\n            input.writeAttribute({ 'accesskey': '', 'tabindex': '' });\n            input.hide().insert({ 'before': placeholder });\n\n            // when placeholder input gains focus,\n            // hide it and show \"real\" password input\n            Event.observe(placeholder, 'focus', function () {\n                this.hide();\n                input.show();\n                Form.Element.focus(input);\n            });\n\n            // when \"real\" password input loses focus,\n            // if it's empty, hide it and show placeholder input\n            Event.observe(input, 'blur', function () {\n                if (this.value === '') {\n                    this.hide();\n                    placeholder.show();\n                }\n            });\n        } else {\n            // insert placeholder text\n            input.addClassName('placeholder').value = placeholder_text;\n\n            Event.observe(input, 'focus', function () {\n                if (this.hasClassName('placeholder')) {\n                    this.clear().removeClassName('placeholder');\n                }\n            });\n            Event.observe(input, 'blur', function () {\n                if (this.value === '') {\n                    this.addClassName('placeholder').value = placeholder_text;\n                }\n            });\n        }\n    });\n});\n    ")])];
export default {
  id: 33,
  slug: "autopopulating-input-fields-with-prototype",
  title: ["Auto-populating input fields with Prototype"],
  datetime: datetime("2010-01-07 22:03:00 (Pacific/Auckland)"),
  tags: ["html5", "javascript", "prototype", "ux"],
  body
};
