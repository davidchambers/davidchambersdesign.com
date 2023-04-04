import {a, p, strong} from "../elements.js";
import {captioned$002Dimages, code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["If you have ever found yourself command-clicking the\n    title of a Finder window to find out where you are (", strong(["/Library/Fonts"]), " or ", strong(["~/Library/Fonts"]), "\n    is one I've double-checked many times), you'll understand how\n    pleased I was to discover that there is a command which can be\n    entered in Terminal to ", a({
  href: "http://osxdaily.com/2007/12/02/show-full-directory-path-in-finder-window-title-bars/"
})(["show full directory paths in Finder window title bars"]), "."])];
const body = [...excerpt, captioned$002Dimages([{
  alt: "Finder windows without paths",
  src: "/images/posts/2/finder-windows-without-paths.png",
  caption: [strong(["Before:"]), "\n      Finder windows with directory name only in title bar"]
}]), p(["In the screenshot above, it is clear that the two Finder windows are\n    displaying different Fonts folders, but it is unclear which is which."]), p(["To display the full path, copy and paste the following into Terminal\n    and hit ", strong(["return"]), "."]), code$002Dblock("console")(`defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES
`), p(["For the changes to take effect, you will need to restart Finder:"]), code$002Dblock("console")(`killall Finder
`), captioned$002Dimages([{
  alt: "Finder windows with paths",
  src: "/images/posts/2/finder-windows-with-paths.png",
  caption: [strong(["After:"]), "\n      Finder windows with full directory path in title bar"]
}]), p(["Confusion resolved! Please note that this is ", strong(["only applicable for OS X 10.5"]), " users."]), p(["To revert to the default title bar treatment, simply enter:"]), code$002Dblock("console")(`defaults write com.apple.finder _FXShowPosixPathInTitle -bool NO
`), p(["Then, restart Finder once again:"]), code$002Dblock("console")(`killall Finder
`)];
export default {
  id: 2,
  slug: "show-full-directory-path-in-finder-window-title-bar",
  title: ["Show full directory path in Finder window title bar"],
  datetime: datetime("2008-11-29")("19:07:00")("Pacific/Auckland"),
  tags: ["mac-os-x"],
  body
};
