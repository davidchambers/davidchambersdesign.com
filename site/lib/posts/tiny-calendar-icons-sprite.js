import {a, p, strong} from "../elements.js";
import {captioned$002Dimages, code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["Recently I've been on a mission to minimize the number\n    of HTTP requests made while loading pages on this site.\n    Until yesterday, the ", a({
  href: "/archives/"
})(["archives"]), "\n    page was making an HTTP request for each of the ", a({
  href: "/tiny-calendar-icon-set/"
})(["tiny calendar icons"]), "\n    used on the page. Therefore, up to 31 HTTP requests were\n    required just to retrieve the calendar icons. Not good."]), p(["The same result can be achieved with a single HTTP request\n    through the use of a sprite:"]), captioned$002Dimages([{
  alt: "Tiny calendar icons sprite",
  src: "/images/posts/23/calendar.png",
  caption: ["Tiny calendar icons sprite, which you're welcome to save and use"]
}])];
const body = [...excerpt, p(["One uses a sprite by applying a background image to an element\n    using CSS. One could start with an empty span element:"]), code$002Dblock("html")(`<span class="day-1"></span>
`), p(["The following CSS sets the width and height of the element and\n    sets the sprite as its background image:"]), code$002Dblock("css")(`span.day-1
{
    display: block;
    width: 16px;
    height: 16px;
    background-image: url(/path/to/images/calendar.png);
    background-repeat: no-repeat;
}
`), p(["By default the top left corner of an element's background image\n    is aligned with the element's top left corner, so at this stage\n    all that's displayed is a 16px by 16px white box:"]), captioned$002Dimages([{
  alt: `Calendar sprite applied as background image using default positioning
`,
  src: "/images/posts/23/calendar-span-default-bg-pos.png",
  caption: ["Calendar sprite applied as background image using ", strong(["default"]), " positioning"]
}]), p([`To have the "1" icon displayed, the element's background position
    is specified:`]), code$002Dblock("css")(`span.day-1
{
    display: block;
    width: 16px;
    height: 16px;
    background-image: url(/path/to/images/calendar.png);
    background-repeat: no-repeat;
    background-position: -60px -20px;
}
`), p(["This drags the background image 60px to the left, and lifts it 20px:"]), captioned$002Dimages([{
  alt: `Calendar sprite applied as background image using correct positioning
`,
  src: "/images/posts/23/calendar-span-specified-bg-pos.png",
  caption: ["Calendar sprite applied as background image using correct positioning"]
}]), p(["Here's the final CSS:"]), code$002Dblock("css")(`span.day
{
    display: block;
    float: left;
    margin: 0.167em 0.5em 0 0;
    width: 16px;
    height: 16px;
    background-image: url(/path/to/images/calendar.png);
    background-repeat: no-repeat;
}

span.day-1  { background-position:  -60px  -20px; }
span.day-2  { background-position:  -80px  -20px; }
span.day-3  { background-position: -100px  -20px; }
span.day-4  { background-position: -120px  -20px; }
span.day-5  { background-position: -140px  -20px; }

span.day-6  { background-position:  -20px  -40px; }
span.day-7  { background-position:  -40px  -40px; }
span.day-8  { background-position:  -60px  -40px; }
span.day-9  { background-position:  -80px  -40px; }
span.day-10 { background-position: -100px  -40px; }
span.day-11 { background-position: -120px  -40px; }
span.day-12 { background-position: -140px  -40px; }

span.day-13 { background-position:  -20px  -60px; }
span.day-14 { background-position:  -40px  -60px; }
span.day-15 { background-position:  -60px  -60px; }
span.day-16 { background-position:  -80px  -60px; }
span.day-17 { background-position: -100px  -60px; }
span.day-18 { background-position: -120px  -60px; }
span.day-19 { background-position: -140px  -60px; }

span.day-20 { background-position:  -20px  -80px; }
span.day-21 { background-position:  -40px  -80px; }
span.day-22 { background-position:  -60px  -80px; }
span.day-23 { background-position:  -80px  -80px; }
span.day-24 { background-position: -100px  -80px; }
span.day-25 { background-position: -120px  -80px; }
span.day-26 { background-position: -140px  -80px; }

span.day-27 { background-position:  -20px -100px; }
span.day-28 { background-position:  -40px -100px; }
span.day-29 { background-position:  -60px -100px; }
span.day-30 { background-position:  -80px -100px; }
span.day-31 { background-position: -100px -100px; }
`), p(["Note that I introduced the class name ", strong(["day"]), " to streamline\n    the CSS. This must appear in the HTML, as in this example:"]), code$002Dblock("html")(`<span class="day day-31"></span>
`)];
export default {
  id: 23,
  slug: "tiny-calendar-icons-sprite",
  title: ["Tiny calendar icons sprite"],
  datetime: datetime("2009-08-28")("18:04:00")("Pacific/Auckland"),
  tags: ["css", "design", "html", "icons"],
  body
};
