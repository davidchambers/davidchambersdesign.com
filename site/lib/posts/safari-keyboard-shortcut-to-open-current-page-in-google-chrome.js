import {a, li, ol, p, strong} from "../elements.js";
import {update} from "../components.js";
import datetime from "../datetime.js";
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
