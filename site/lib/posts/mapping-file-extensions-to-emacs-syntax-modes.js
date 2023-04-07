import {p, strong} from "../elements.js";
import {captioned$002Dimages, code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["I spent much of my day at work editing Django templates in Emacs,\n    which does a decent job of applying syntax highlighting to HTML.\n    When I got home, though, and resumed work on a new Mango feature,\n    my Django templates lacked colour. :\\"]), p(["Emacs doesn't recognize the \"dhtml\" extension, but it's easy to\n    add a custom mapping (when the appropriate snippet is sitting in a\n    chat window waiting to be copied (ty, Brodie))."]), code$002Dblock("TK")(`(add-to-list 'auto-mode-alist '("[.]dhtml$" . html-mode))
`), p(["Adding the above snippet to my ", strong(["~/.emacs"]), " file did\n    the trick. :)"]), captioned$002Dimages([{
  alt: "Emacs syntax highlighting",
  src: "/images/posts/81/emacs-syntax-highlighting.png",
  caption: ["HTML in Emacs with and without syntax highlighting"]
}])];
export default {
  id: 81,
  slug: "mapping-file-extensions-to-emacs-syntax-modes",
  title: ["Mapping file extensions to Emacs syntax modes"],
  datetime: datetime("2011-02-18 23:15:00 (America/Los_Angeles)"),
  tags: ["emacs", "syntax-highlighting"],
  body
};
