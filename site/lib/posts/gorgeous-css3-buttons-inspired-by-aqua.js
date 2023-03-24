import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {captioned$002Dimages, code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
const excerpt = [p(["Modern browsers can display exciting visual effects such\n    as drop shadows (without the use of background images).\n    CSS3 makes it possible to turn submit inputs and even links\n    into rich, Aqua-like buttons in these browsers (alternative\n    style rules can be provided for older browsers)."]), p([img({
  alt: "",
  src: "/images/posts/39/start-game-hyperlink-and-button.png"
})])];
const body = [p(["The two cornerstones of the Web as an interactive medium are the ", a({
  href: "http://en.wikipedia.org/wiki/Form_(web)"
})(["form"]), ",\n    which facilitates the submission and retrieval of data, and the ", a({
  href: "http://en.wikipedia.org/wiki/Hyperlink"
})(["hyperlink"]), ",\n    which facilitates navigation."]), p(["Since form submission buttons and hyperlinks ", em(["do"]), "\n    different things, it makes sense that browsers display them\n    differently (by default)."]), captioned$002Dimages([{
  alt: "Unstyled button and hyperlink",
  src: "/images/posts/39/unstyled-button-and-hyperlink.png",
  caption: ["Default appearance of buttons and hyperlinks in Safari on Mac OS X"]
}]), p(["Web applications, however, sometimes blur the line between\n    doing things and going places; visually distinguishing\n    links from buttons, therefore, is not always appropriate.\n    As Stephen Anderson explains in his article ", a({
  href: "http://www.alistapart.com/articles/indefenseofeyecandy"
})(["In Defense of Eye Candy"]), " on ", a({
  href: "http://www.alistapart.com/"
})(["A List Apart"]), ", an element's\n    appearance should suggest appropriate modes of interaction."]), captioned$002Dimages([{
  alt: "WordPress Publish pane",
  src: "/images/posts/39/wordpress-publish-pane.png",
  caption: ["In WordPress's ", strong(["Publish"]), " pane \"Save Draft\" is a\n      submit input, \"Preview\" is a link; both are styled as buttons"]
}]), h3(["Styling links to look like buttons"]), p([em([strong(["Beware!"]), " There's quite a bit involved in styling\n      form elements – be sure that there's a compelling reason to\n      override default browser styling before doing so."])]), p(["An unstyled submit input and an unstyled hyperlink are displayed\n    below. One must declare a number of rules in order to have the two\n    elements rendered in the same way."]), captioned$002Dimages([{
  alt: "Unstyled button and hyperlink",
  src: "/images/posts/39/start-game-button-and-hyperlink-unstyled.png",
  caption: ["Unstyled submit input and hyperlink"]
}, {
  alt: "Button and hyperlink with border",
  src: "/images/posts/39/start-game-button-and-hyperlink-border.png",
  caption: [code(["border: 1px solid #850; color: #850;"])]
}, {
  alt: "Button and hyperlink with background colour",
  src: "/images/posts/39/start-game-button-and-hyperlink-background-color.png",
  caption: [code(["background: #fc6; text-decoration: none;"])]
}, {
  alt: "Button and hyperlink with consistent padding and font properties",
  src: "/images/posts/39/start-game-button-and-hyperlink-padding-font.png",
  caption: [code([`padding: 0.25em 0.5em; font: bold 12px/15px "Lucida Grande", "Lucida Sans Unicode", sans-serif;`])]
}]), h4(["Progressive enhancement"]), p(["The submit input and the link now look the same, and ", em(["somewhat"]), " button-like. Even antiquated browsers\n    such as Internet Explorer 6 understand the rules defined\n    thus far. The next step is to make the elements more\n    appealing and more button-like in modern browsers."]), code$002Dblock("css")(`-webkit-border-radius: 1em;
-moz-border-radius: 1em;
border-radius: 1em;
`), captioned$002Dimages([{
  alt: "Button and hyperlink with rounded corners",
  src: "/images/posts/39/start-game-button-and-hyperlink-border-radius.png",
  caption: ["Rounded corners"]
}]), code$002Dblock("css")(`background: -webkit-gradient(linear, left top, left bottom,
    from(#fc6), to(#fc6),
    color-stop(0.1, #fff), color-stop(0.2, #fc6),
    color-stop(0.5, #fc6), color-stop(0.5, #fa2));
background: -moz-linear-gradient(-90deg,
    #fc6 5%, #fff 15%, #fc6 25%, #fc6 50%, #fa2 50%, #fc6);
`), captioned$002Dimages([{
  alt: "Button and hyperlink with background gradient",
  src: "/images/posts/39/start-game-button-and-hyperlink-background-gradient.png",
  caption: ["Linear gradient with colour stops creates a sense of depth"]
}]), h3(["Styling different states"]), p(["It is important to consider the different states a button may have.\n    Apple's ", a({
  href: "http://en.wikipedia.org/wiki/Aqua_(user_interface)"
})(["Aqua"]), "\n    GUI provides three different effects, any or all of which may be\n    applied to a button: a pulsating blue background indicates that ", strong(["return"]), " activates the button; a button with an outer glow\n    can be activated via the space bar; and a static blue background is\n    used for a button's \"active\" state (which occurs while the button\n    is being clicked)."]), captioned$002Dimages([{
  alt: "TextEdit dialog featuring two different button states",
  src: "/images/posts/39/textedit-save-dialog.png",
  caption: ["In Aqua, ", strong(["return"]), " activates the blue button; ", strong(["space bar"]), " activates the button with the outer glow"]
}]), p(["On the web, submit inputs and hyperlinks have several possible\n    states, the most important of which are hover, focus, and active.\n    When creating style rules for each of these states it's important\n    to bear in mind that more than one state may apply at one time."]), captioned$002Dimages([{
  alt: "Transmission dialog featuring a button with two states",
  src: "/images/posts/windows/transmission-up-to-date.png",
  caption: ["Here the OK button exhibits both a pulsating blue background\n      and an outer glow"]
}]), h4(["Hover"]), code$002Dblock("css")(`.aqua:hover {
    border-color: #740;
    background: #fb4;
    background: -webkit-gradient(linear, left top, left bottom,
        from(#fb4), to(#fb4),
        color-stop(0.1, #fea), color-stop(0.2, #fb4),
        color-stop(0.5, #fb4), color-stop(0.5, #f90));
    background: -moz-linear-gradient(-90deg,
        #fb4 5%, #fea 15%, #fb4 25%, #fb4 50%, #f90 50%, #fb4);
    color: #740;
    cursor: pointer;
}
`), captioned$002Dimages([{
  alt: "Hover state",
  src: "/images/posts/39/start-game-button-and-hyperlink-hover.png",
  caption: ["Hover state (right) alongside default state"]
}]), h4(["Focus"]), code$002Dblock("css")(`.aqua:focus {
    -webkit-box-shadow: #740 0 1px 0.75em;
    -moz-box-shadow: #740 0 1px 0.75em;
    color: #740;
    outline: none;
}
`), captioned$002Dimages([{
  alt: "Focus state",
  src: "/images/posts/39/start-game-button-and-hyperlink-focus.png",
  caption: ["Focus state (right) alongside default state"]
}, {
  alt: "Focus+hover state",
  src: "/images/posts/39/start-game-button-and-hyperlink-focus-hover.png",
  caption: ["The focus and hover states play nicely together"]
}]), h4(["Active"]), code$002Dblock("css")(`.aqua:active {
    border-color: #630;
    background: #f90;
    background: -webkit-gradient(linear, left top, left bottom,
        from(#f90), to(#f90),
        color-stop(0.1, #fd8), color-stop(0.3, #fb4),
        color-stop(0.5, #fb4), color-stop(0.5, #f90));
    background: -moz-linear-gradient(-90deg,
        #f90 5%, #fd8 15%, #fb4 35%, #fb4 50%, #f90 50%, #f90);
    color: #630;
}
`), captioned$002Dimages([{
  alt: "Active state",
  src: "/images/posts/39/start-game-button-and-hyperlink-active.png",
  caption: ["Active state (right) alongside default state"]
}]), h3(["Demo"]), p(["Interact with the finished styled button on the ", a({
  href: "/examples/hyperlinks-as-buttons/"
})(["Hyperlinks as buttons"]), "\n    demo page."])];
export default {
  id: 39,
  slug: "gorgeous-css3-buttons-inspired-by-aqua",
  title: ["Gorgeous CSS3 buttons inspired by Aqua"],
  datetime: datetime("2010-03-08")("12:39:00")("Pacific/Auckland"),
  tags: ["css", "css3", "html", "mac-os-x"],
  excerpt,
  body
};
