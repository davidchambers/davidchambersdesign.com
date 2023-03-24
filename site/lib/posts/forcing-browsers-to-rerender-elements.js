import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
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
  datetime: datetime("2010-03-22")("19:40:00")("Pacific/Auckland"),
  tags: ["dom", "ie", "javascript"],
  body
};
