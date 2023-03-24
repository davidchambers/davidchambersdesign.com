import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import datetime from "../datetime.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
const excerpt = [p(["Over the past few months I've reached a startling realization: ", strong(["JavaScript is a tremendously capable language."])]), p(["The reason that it took me so long to discover this is that\n    the playing field has never been fair. On the one hand I've been\n    writing application code for the server, a stable, predictable\n    environment. On the other hand I've been adding interactivity\n    on the client's side, dealing with inconsistencies on multiple\n    fronts, not least of which is the DOM API."]), p(["Comparing Python and JavaScript, for example, by using\n    the former to quickly put together a website using the\n    excellent Django framework while using the latter to add\n    drag and drop functionality is to compare apples and oranges. ", strong(["Actually, it's more like comparing apples to root canals."])])];
const body = [...excerpt, p(["Had I been writing application code in JavaScript (without\n    touching the DOM), I'd have been in a much better position\n    to weigh each on its merits. Thanks to some terrifically\n    exciting developments in the JS world, it is now possible to\n    write application code ", em(["entirely"]), " in JavaScript."]), p(["When I was first exposed to the idea of having JavaScript on\n    the server, the thing that appealed to me was the potential to\n    share code between server and client. This seemed preferable\n    to the situation that is currently prevalent, whereby objects\n    are created on the server (probably using an ORM such as that\n    provided by Rails or Django) and are then sent down the wire\n    as JSON (or XML for the masochists) at which point they are\n    parsed to create JS objects."]), p([a({
  href: "http://www.sproutcore.com/"
})(["SproutCore"]), "\n    rewrites the client–server relationship by moving ", em(["all"]), "\n    programming logic to the client. This new approach was motivated\n    by a desire to improve performance, but has two consequential\n    benefits. No longer do objects need to be represented on both\n    sides of the wire (in violation of the DRY principle). This\n    brings another benefit, which is the separation of concerns:\n    the server is freed to focus on serving, and the decoupling\n    of service and application code allow the service to be used\n    (simultaneously) by other applications."]), p(["SproutCore is server-agnostic, which allows it to connect to\n    existing services, and allows new services to be created using\n    the most appropriate server-side technologies."]), dl([dt([embed({
  type: "application/x-shockwave-flash",
  src: "http://blip.tv/play/g_MngZaxYQI",
  width: 480,
  height: 300,
  allowscriptaccess: "always",
  allowfullscreen: true
})]), dd(["Mike Subelsky introducing SproutCore at JSConf Washington, April 2009"])]), p(["Exciting JavaScript-related developments are not limited to the\n    client-side, however. There are several options available if you're\n    interested in running JavaScript on the server, but the one that's\n    caught my attention is ", a({
  href: "http://nodejs.org/"
})(["Node.js"]), "."]), dl([dt([embed({
  type: "application/x-shockwave-flash",
  src: "http://blip.tv/play/AYGylE4C",
  width: 480,
  height: 300,
  allowscriptaccess: "always",
  allowfullscreen: true
})]), dd(["Ryan Dahl introducing Node.js at JSConf Berlin, November 2009"])]), p(["The idea of using an event loop on the ", em(["server"]), "-side\n    is surprising at first, but obvious in hindsight. JavaScript\n    is extremely well suited to event-driven programming, and the\n    performance gains that can be made with non-blocking request\n    handling are significant."]), p(["JavaScript is at last recieving the attention and respect it\n    has long deserved. I'm greatly looking forward to building an\n    application using non-blocking, event-driven JavaScript on both\n    sides of the wire."])];
export default {
  id: 61,
  slug: "javascript-everywhere",
  title: ["JavaScript, JavaScript, everywhere"],
  datetime: datetime("2010-07-20")("19:05:00")("Pacific/Auckland"),
  tags: ["javascript", "node.js", "sproutcore"],
  body
};
