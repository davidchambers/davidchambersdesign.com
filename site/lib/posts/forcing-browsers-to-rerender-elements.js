import {p, a, em} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Generally speaking browsers rerender elements as required\n    – in response to DOM changes effected via JavaScript, for\n    instance. There are times, though, when the browser ", em(["Internet Explorer, I'm looking at you!"]), "\n    needs a gentle nudge."]), p([a({
  href: "http://ajaxian.com/archives/forcing-a-ui-redraw-from-javascript"
})(["Forcing a UI redraw from JavaScript"]), " highlights the solution\n    employed by Thomas Fuchs, creator of the popular JavaScript library ", a({
  href: "http://script.aculo.us/"
})(["script.aculo.us"]), ":"]), code$002Dblock("javascript")(`Element.addMethods({
    redraw: function (element) {
        element = $(element);
        var n = document.createTextNode(' ');
        element.appendChild(n);
        (function () { n.parentNode.removeChild(n); }).defer();
        return element;
    }
});
`), p(["The post's first comment includes an alternative approach:"]), code$002Dblock("javascript")(`element.className = element.className;
`), p(["I gather that there are situations in which this simple solution fails", $2014, "it's no silver bullet", $2014, "but it fixed a problem I encountered in\n    IE8 earlier this evening so I'm pleased to have discovered it!"])];
export default {
  id: 42,
  slug: "forcing-browsers-to-rerender-elements",
  title: ["Forcing browsers to rerender elements"],
  datetime: datetime("2010-03-22 19:40:00 (Pacific/Auckland)"),
  tags: ["dom", "ie", "javascript"],
  body
};
