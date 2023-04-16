import {h3, h4, p, a, code, em, strong, img} from "../elements.js";
import {captioned$002Dimages, code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["Modern browsers can display exciting visual effects such ", "as drop shadows (without the use of background images). ", "CSS3 makes it possible to turn submit inputs and even links ", "into rich, Aqua-like buttons in these browsers (alternative ", "style rules can be provided for older browsers)."]), p([img({
  alt: "",
  src: "/images/posts/39/start-game-hyperlink-and-button.png"
})])];
const body = [p(["The two cornerstones of the Web as an interactive medium are the ", a({
  href: "http://en.wikipedia.org/wiki/Form_(web)"
})(["form"]), ", ", "which facilitates the submission and retrieval of data, and the ", a({
  href: "http://en.wikipedia.org/wiki/Hyperlink"
})(["hyperlink"]), ", ", "which facilitates navigation."]), p(["Since form submission buttons and hyperlinks ", em(["do"]), " ", "different things, it makes sense that browsers display them ", "differently (by default)."]), captioned$002Dimages([{
  alt: "Unstyled button and hyperlink",
  src: "/images/posts/39/unstyled-button-and-hyperlink.png",
  caption: ["Default appearance of buttons and hyperlinks in Safari on Mac OS X"]
}]), p(["Web applications, however, sometimes blur the line between ", "doing things and going places; visually distinguishing ", "links from buttons, therefore, is not always appropriate. ", "As Stephen Anderson explains in his article ", a({
  href: "http://www.alistapart.com/articles/indefenseofeyecandy"
})(["In Defense of Eye Candy"]), " on ", a({
  href: "http://www.alistapart.com/"
})(["A List Apart"]), ", an element's ", "appearance should suggest appropriate modes of interaction."]), captioned$002Dimages([{
  alt: "WordPress Publish pane",
  src: "/images/posts/39/wordpress-publish-pane.png",
  caption: ["In WordPress's ", strong(["Publish"]), " pane \"Save Draft\" is a ", "submit input, \"Preview\" is a link; both are styled as buttons"]
}]), h3(["Styling links to look like buttons"]), p([em([strong(["Beware!"]), " There's quite a bit involved in styling ", "form elements – be sure that there's a compelling reason to ", "override default browser styling before doing so."])]), p(["An unstyled submit input and an unstyled hyperlink are displayed ", "below. One must declare a number of rules in order to have the two ", "elements rendered in the same way."]), captioned$002Dimages([{
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
  caption: [code(["padding: 0.25em 0.5em; font: bold 12px/15px \"Lucida Grande\", \"Lucida Sans Unicode\", sans-serif;"])]
}]), h4(["Progressive enhancement"]), p(["The submit input and the link now look the same, and ", em(["somewhat"]), " button-like. Even antiquated browsers ", "such as Internet Explorer 6 understand the rules defined ", "thus far. The next step is to make the elements more ", "appealing and more button-like in modern browsers."]), code$002Dblock("css")("-webkit-border-radius: 1em;\n-moz-border-radius: 1em;\nborder-radius: 1em;\n  "), captioned$002Dimages([{
  alt: "Button and hyperlink with rounded corners",
  src: "/images/posts/39/start-game-button-and-hyperlink-border-radius.png",
  caption: ["Rounded corners"]
}]), code$002Dblock("css")("background: -webkit-gradient(linear, left top, left bottom,\n    from(#fc6), to(#fc6),\n    color-stop(0.1, #fff), color-stop(0.2, #fc6),\n    color-stop(0.5, #fc6), color-stop(0.5, #fa2));\nbackground: -moz-linear-gradient(-90deg,\n    #fc6 5%, #fff 15%, #fc6 25%, #fc6 50%, #fa2 50%, #fc6);\n  "), captioned$002Dimages([{
  alt: "Button and hyperlink with background gradient",
  src: "/images/posts/39/start-game-button-and-hyperlink-background-gradient.png",
  caption: ["Linear gradient with colour stops creates a sense of depth"]
}]), h3(["Styling different states"]), p(["It is important to consider the different states a button may have. ", "Apple's ", a({
  href: "http://en.wikipedia.org/wiki/Aqua_(user_interface)"
})(["Aqua"]), " ", "GUI provides three different effects, any or all of which may be ", "applied to a button: a pulsating blue background indicates that ", strong(["return"]), " activates the button; a button with an outer glow ", "can be activated via the space bar; and a static blue background is ", "used for a button's \"active\" state (which occurs while the button ", "is being clicked)."]), captioned$002Dimages([{
  alt: "TextEdit dialog featuring two different button states",
  src: "/images/posts/39/textedit-save-dialog.png",
  caption: ["In Aqua, ", strong(["return"]), " activates the blue button; ", strong(["space bar"]), " activates the button with the outer glow"]
}]), p(["On the web, submit inputs and hyperlinks have several possible ", "states, the most important of which are hover, focus, and active. ", "When creating style rules for each of these states it's important ", "to bear in mind that more than one state may apply at one time."]), captioned$002Dimages([{
  alt: "Transmission dialog featuring a button with two states",
  src: "/images/posts/windows/transmission-up-to-date.png",
  caption: ["Here the OK button exhibits both a pulsating blue background ", "and an outer glow"]
}]), h4(["Hover"]), code$002Dblock("css")(".aqua:hover {\n    border-color: #740;\n    background: #fb4;\n    background: -webkit-gradient(linear, left top, left bottom,\n        from(#fb4), to(#fb4),\n        color-stop(0.1, #fea), color-stop(0.2, #fb4),\n        color-stop(0.5, #fb4), color-stop(0.5, #f90));\n    background: -moz-linear-gradient(-90deg,\n        #fb4 5%, #fea 15%, #fb4 25%, #fb4 50%, #f90 50%, #fb4);\n    color: #740;\n    cursor: pointer;\n}\n  "), captioned$002Dimages([{
  alt: "Hover state",
  src: "/images/posts/39/start-game-button-and-hyperlink-hover.png",
  caption: ["Hover state (right) alongside default state"]
}]), h4(["Focus"]), code$002Dblock("css")(".aqua:focus {\n    -webkit-box-shadow: #740 0 1px 0.75em;\n    -moz-box-shadow: #740 0 1px 0.75em;\n    color: #740;\n    outline: none;\n}\n  "), captioned$002Dimages([{
  alt: "Focus state",
  src: "/images/posts/39/start-game-button-and-hyperlink-focus.png",
  caption: ["Focus state (right) alongside default state"]
}, {
  alt: "Focus+hover state",
  src: "/images/posts/39/start-game-button-and-hyperlink-focus-hover.png",
  caption: ["The focus and hover states play nicely together"]
}]), h4(["Active"]), code$002Dblock("css")(".aqua:active {\n    border-color: #630;\n    background: #f90;\n    background: -webkit-gradient(linear, left top, left bottom,\n        from(#f90), to(#f90),\n        color-stop(0.1, #fd8), color-stop(0.3, #fb4),\n        color-stop(0.5, #fb4), color-stop(0.5, #f90));\n    background: -moz-linear-gradient(-90deg,\n        #f90 5%, #fd8 15%, #fb4 35%, #fb4 50%, #f90 50%, #f90);\n    color: #630;\n}\n  "), captioned$002Dimages([{
  alt: "Active state",
  src: "/images/posts/39/start-game-button-and-hyperlink-active.png",
  caption: ["Active state (right) alongside default state"]
}]), h3(["Demo"]), p(["Interact with the finished styled button on the ", a({
  href: "/examples/hyperlinks-as-buttons/"
})(["Hyperlinks as buttons"]), " ", "demo page."])];
export default {
  id: 39,
  slug: "gorgeous-css3-buttons-inspired-by-aqua",
  title: ["Gorgeous CSS3 buttons inspired by Aqua"],
  datetime: datetime("2010-03-08 12:39:00 (Pacific/Auckland)"),
  tags: ["css", "css3", "html", "mac-os-x"],
  excerpt,
  body
};
