import {text, html, head, title, link, meta, body, nav$0027, header, footer, p, hr, ul, li, div as $div, a, script, span, strong} from "./elements.js";
const map = f => xs => (function () {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const base$002Dtemplate = document$002Dtitle => main => html([head([meta({
  charset: "utf-8"
}), title(map(String)(document$002Dtitle)), link({
  rel: "alternate",
  type: "application/atom+xml",
  href: "/feed/"
}), link({
  rel: "stylesheet",
  href: "/css/reset.css",
  media: "all"
}), link({
  rel: "stylesheet",
  href: "/css/print.css",
  media: "print"
}), link({
  rel: "stylesheet",
  href: "/css/screen.css",
  media: "screen"
}), link({
  rel: "shortcut icon",
  type: "image/x-icon",
  href: "http://static.davidchambersdesign.com/favicon.ico"
}), script({
  src: "http://use.typekit.com/jhk0ogh.js"
})([]), script({})([text("try{Typekit.load();}catch(e){}")])]), body([$div({
  id: "skip"
})([a({
  href: "#main"
})(["Skip to main content"])]), $div({
  id: "wrap"
})([$div({
  id: "header"
})([header([a({
  id: "title",
  href: "/"
})(["David Chambers Design"]), hr, p(["It's where I share interesting info with other web geeks"]), nav$0027({
  id: "nav"
})([ul([li([a({
  href: "/about/"
})([span({})([strong(["About."]), " ", "Who I am and what I do."])])]), li([a({
  href: "/contact/"
})([span({})([strong(["Contact."]), " ", "Just in case you want to get in touch."])])]), li([a({
  href: "/archives/"
})([span({})([strong(["Archives."]), " ", "Old posts, recent posts, they're all here."])])]), li([a({
  href: "/tags/"
})([span({})([strong(["Tags."]), " ", "Helpful if you're after posts on a particular topic."])])]), li([a({
  href: "https://bitbucket.org/davidchambers"
})([span({})([strong(["Bitbucket."]), " ", "Home to most of my open-source projects."])])]), li([a({
  href: "/twitter/"
})([span({})([strong(["Twitter."]), " ", "It's where I chirrup… or chirp… or something."])])])])])])]), $div({
  id: "main"
})(main)]), footer([p(["Powered by ", a({
  href: "http://mango.io/wtf?",
  ["data-version"]: "0.9dev"
})(["Mango"]), ". Hosted on ", a({
  href: "http://www.linode.com/?r=ce523c9eeda64e4bceaf7011dc9e8558b909711d"
})(["Linode"]), ". Original content ", a({
  href: "/copying/"
})(["WTFPL-licensed"]), "."])])])]);
export default base$002Dtemplate;
