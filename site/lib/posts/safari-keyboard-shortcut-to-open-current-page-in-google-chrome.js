import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {update} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, flip, map, not} = Prelude;
const body = [p(["I followed ", a({
  href: "http://daringfireball.net/2010/11/flash_free_and_cheating_with_google_chrome"
})(["John Gruber's suggestion"]), " and removed Flash Player from my Mac.\n    Like John, I've come to rely upon Google Chrome for viewing the\n    occasional Flash movie. As a result I've become proficient at the\n    keyboard dance required to open in Chrome the page I'm currently\n    viewing in Safari:"]), ol([li([strong(["⌘L"]), "\n      (", strong(["File"]), " > ", strong(["Open Location..."]), ")"]), li([strong(["⌘C"]), "\n      (", strong(["Edit"]), " > ", strong(["Copy"]), ")"]), li([strong(["⌘Space"]), "\n      (invoke Quicksilver/Spotlight)"]), li([strong(["C-H-R-↩"]), "\n      (open Google Chrome)"]), li([strong(["⌘L"]), "\n      (", strong(["File"]), " > ", strong(["Open Location..."]), ")"]), li([strong(["⌘V"]), "\n      (", strong(["Edit"]), " > ", strong(["Paste"]), ")"]), li([strong(["↩"]), "\n      (go, go, go!)"])]), p(["Well, I've performed this dance for the last time.\n    I now do this instead:"]), ol([li([strong(["⌥⌘G"])])]), p(["Credit for this simple but brilliant idea goes to Rob McBroom.\n    Rob's post on ", a({
  href: "http://projects.skurfer.com/posts/2011/chrome_shortcut/"
})(["opening pages in Google Chrome"]), " lists the (very easy)\n    steps required to enable this shortcut."]), update(datetime("2011-01-30")("23:30:00")("America/Los_Angeles"))([p(["Chris points out that John himself mentioned this trick\n      in his aforelinked post."])])];
export default {
  id: 77,
  slug: "safari-keyboard-shortcut-to-open-current-page-in-google-chrome",
  title: ["Safari keyboard shortcut to open current page in Google Chrome"],
  datetime: datetime("2011-01-30")("21:35:00")("America/Los_Angeles"),
  tags: ["flash", "google-chrome", "keyboard-shortcuts", "mac-os-x", "safari"],
  body
};
