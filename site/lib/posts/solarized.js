import {p, a} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Earlier this week I discovered ", a({
  href: "http://ethanschoonover.com/solarized"
})(["Solarized"]), ",\n    \"a sixteen color palette [...] designed for use with\n    terminal and gui applications\"."]), p(["Bundles are available for all the popular editors;\n    I went ahead and cloned the ", a({
  href: "https://github.com/bobthecow/solarized-seestyle"
})(["Coda bundle"]), ".\n    While the code on my screen immediately looked very nice, a few of\n    Justin's colour choices didn't sit well with me.* I spent an hour\n    or two trying a large number of different combinations until my\n    JavaScript file was harmoniously highlighted."]), captioned$002Dimages([{
  alt: "Solarized code snippet",
  src: "/images/posts/84/solarized-code-snippet.png",
  caption: ["Solarized code snippet"]
}]), p(["I wanted an even intensity, but didn't allow myself to deviate\n    from Ethan's prescribed colours. I'm happy with the result: the\n    soft highlighting makes the code easier to understand without\n    being a distraction. Only regular expression literals leap\n    forward, but these tend to occur infrequently."]), p(["Coda users may be surprised to see method invocations\n    highlighted. That's one of the minor enhancements I've made\n    to the default mode. If you're interested, have a look at ", a({
  href: "https://bitbucket.org/davidchambers/javascript.mode"
})(["Javascript.mode"]), " on Bitbucket."]), p(["* Blue escape sequences within red regular expression literals\n    are too striking for my liking!"])];
export default {
  id: 84,
  slug: "solarized",
  title: ["Solarized"],
  datetime: datetime("2011-04-23 02:20:00 (America/Los_Angeles)"),
  tags: ["coda", "design", "programming", "solarized"],
  body
};
