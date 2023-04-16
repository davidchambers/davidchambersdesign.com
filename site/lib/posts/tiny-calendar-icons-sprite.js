import {p, a, strong} from "../elements.js";
import {captioned$002Dimages, code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["Recently I've been on a mission to minimize the number ", "of HTTP requests made while loading pages on this site. ", "Until yesterday, the ", a({
  href: "/archives/"
})(["archives"]), " ", "page was making an HTTP request for each of the ", a({
  href: "/tiny-calendar-icon-set/"
})(["tiny calendar icons"]), " ", "used on the page. Therefore, up to 31 HTTP requests were ", "required just to retrieve the calendar icons. Not good."]), p(["The same result can be achieved with a single HTTP request ", "through the use of a sprite:"]), captioned$002Dimages([{
  alt: "Tiny calendar icons sprite",
  src: "/images/posts/23/calendar.png",
  caption: ["Tiny calendar icons sprite, which you're welcome to save and use"]
}])];
const body = [...excerpt, p(["One uses a sprite by applying a background image to an element ", "using CSS. One could start with an empty span element:"]), code$002Dblock("html")("<span class=\"day-1\"></span>\n  "), p(["The following CSS sets the width and height of the element and ", "sets the sprite as its background image:"]), code$002Dblock("css")("span.day-1\n{\n    display: block;\n    width: 16px;\n    height: 16px;\n    background-image: url(/path/to/images/calendar.png);\n    background-repeat: no-repeat;\n}\n  "), p(["By default the top left corner of an element's background image ", "is aligned with the element's top left corner, so at this stage ", "all that's displayed is a 16px by 16px white box:"]), captioned$002Dimages([{
  alt: "Calendar sprite applied as background image using default positioning\n    ",
  src: "/images/posts/23/calendar-span-default-bg-pos.png",
  caption: ["Calendar sprite applied as background image using ", strong(["default"]), " positioning"]
}]), p(["To have the \"1\" icon displayed, the element's background position ", "is specified:"]), code$002Dblock("css")("span.day-1\n{\n    display: block;\n    width: 16px;\n    height: 16px;\n    background-image: url(/path/to/images/calendar.png);\n    background-repeat: no-repeat;\n    background-position: -60px -20px;\n}\n  "), p(["This drags the background image 60px to the left, and lifts it 20px:"]), captioned$002Dimages([{
  alt: "Calendar sprite applied as background image using correct positioning\n    ",
  src: "/images/posts/23/calendar-span-specified-bg-pos.png",
  caption: ["Calendar sprite applied as background image using correct positioning"]
}]), p(["Here's the final CSS:"]), code$002Dblock("css")("span.day\n{\n    display: block;\n    float: left;\n    margin: 0.167em 0.5em 0 0;\n    width: 16px;\n    height: 16px;\n    background-image: url(/path/to/images/calendar.png);\n    background-repeat: no-repeat;\n}\n\nspan.day-1  { background-position:  -60px  -20px; }\nspan.day-2  { background-position:  -80px  -20px; }\nspan.day-3  { background-position: -100px  -20px; }\nspan.day-4  { background-position: -120px  -20px; }\nspan.day-5  { background-position: -140px  -20px; }\n\nspan.day-6  { background-position:  -20px  -40px; }\nspan.day-7  { background-position:  -40px  -40px; }\nspan.day-8  { background-position:  -60px  -40px; }\nspan.day-9  { background-position:  -80px  -40px; }\nspan.day-10 { background-position: -100px  -40px; }\nspan.day-11 { background-position: -120px  -40px; }\nspan.day-12 { background-position: -140px  -40px; }\n\nspan.day-13 { background-position:  -20px  -60px; }\nspan.day-14 { background-position:  -40px  -60px; }\nspan.day-15 { background-position:  -60px  -60px; }\nspan.day-16 { background-position:  -80px  -60px; }\nspan.day-17 { background-position: -100px  -60px; }\nspan.day-18 { background-position: -120px  -60px; }\nspan.day-19 { background-position: -140px  -60px; }\n\nspan.day-20 { background-position:  -20px  -80px; }\nspan.day-21 { background-position:  -40px  -80px; }\nspan.day-22 { background-position:  -60px  -80px; }\nspan.day-23 { background-position:  -80px  -80px; }\nspan.day-24 { background-position: -100px  -80px; }\nspan.day-25 { background-position: -120px  -80px; }\nspan.day-26 { background-position: -140px  -80px; }\n\nspan.day-27 { background-position:  -20px -100px; }\nspan.day-28 { background-position:  -40px -100px; }\nspan.day-29 { background-position:  -60px -100px; }\nspan.day-30 { background-position:  -80px -100px; }\nspan.day-31 { background-position: -100px -100px; }\n  "), p(["Note that I introduced the class name ", strong(["day"]), " to streamline ", "the CSS. This must appear in the HTML, as in this example:"]), code$002Dblock("html")("<span class=\"day day-31\"></span>\n  ")];
export default {
  id: 23,
  slug: "tiny-calendar-icons-sprite",
  title: ["Tiny calendar icons sprite"],
  datetime: datetime("2009-08-28 18:04:00 (Pacific/Auckland)"),
  tags: ["css", "design", "html", "icons"],
  body
};
