import {h3$0027, p, a, code} from "../elements.js";
import {code$002Dblock, update} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["In my post titled ", a({
  href: "/captions-over-images/"
})(["Captions over images"]), "\n    I advocate the use of definition lists for captioning images.\n    Earlier today I was asked whether this meaningful markup could\n    be used in conjunction with an \"image slider\" such as ", a({
  href: "http://cssglobe.com/post/4004/easy-slider-15-the-easiest-jquery-plugin-for-sliding"
})(["Easy Slider 1.5"]), "."]), p(["I had a look at the Easy Slider source code and decided to\n    write my own image slider using Prototype rather than hacking\n    someone else's code to pieces. It's a proof of concept rather\n    than a full-blown \"plugin\", but it demonstrates that such\n    functionality is achievable using elegant, meaningful markup."]), p(["Check out the ", a({
  href: "/examples/prototype-image-slider/"
})(["Prototype image slider demo"]), " to see the code in action."])];
const body = [...excerpt, update(datetime("2009-09-17 01:17:00 (Pacific/Auckland)"))([p(["I noticed that the script was failing miserably in Safari,\n      which didn't like the following line:"]), code$002Dblock("javascript")(`li: new Element('li', { class: 'prev' }),
`), p(["Wrapping the word \"class\" in quotes as per this ", a({
  href: "http://www.prototypejs.org/2007/5/12/dom-builder#comment-15777"
})(["recommendation by Tobie Langel"]), " did the trick!"])]), h3$0027({
  id: "usage"
})(["Usage"]), p(["First, you'll need to save a copy of ", a({
  href: "/examples/prototype-image-slider/prototype-image-slider.js"
})(["prototype-image-slider.js"]), "."]), p(["To create a new ", code(["Slider"]), " simply call the constructor.\n    The constructor requires one argument, either a DOM node or a string\n    that references a node's ID."]), code$002Dblock("javascript")(`new Slider('slider');
`), p(["There's nothing to prevent multiple image sliders from appearing\n    on a page. The following code turns each div with class of 'slider'\n    into a ", code(["Slider"]), " object."]), code$002Dblock("javascript")(`$$('div.slider').each(function (e) {
    new Slider(e);
})
`), p(["Of course, it's a good idea to wait until the page is ready to be\n    manipulated before... er... manipulating the page."]), code$002Dblock("javascript")(`document.observe('dom:loaded', function () {
    $$('div.slider').each(function (e) {
        new Slider(e);
    });
});
`), p(["To provide a small degree of flexibility, the constructor accepts\n    two optional arguments: a float specifying the duration of each\n    transition, and an integer specifying the number of the slide to\n    be displayed first. The default values are 1.0 and 0 (slides are\n    numbered from zero)."]), code$002Dblock("javascript")(`new Slider('slider', 0.5);     // faster transitions
new Slider('slider', 1.0, 3);  // fourth slide displayed first
new Slider('slider', 1.0, -1); // last slide displayed first
new Slider('slider', 1.5, -1); // slower transitions; last slide displayed first
`), p(["If you find this code useful and would like me to flesh it out,\n    let me know."]), update(datetime("2009-09-21 11:53:00 (Pacific/Auckland)"))([p(["I neglected to mention that this code also requires ", a({
  href: "http://script.aculo.us/"
})(["script.aculo.us"]), "."])])];
export default {
  id: 26,
  slug: "prototype-image-slider",
  title: ["Prototype image slider"],
  datetime: datetime("2009-09-16 23:43:00 (Pacific/Auckland)"),
  tags: ["css", "html", "javascript", "meaningful-markup", "prototype"],
  body
};
