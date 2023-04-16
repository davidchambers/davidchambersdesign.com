import {h3, p, ul, li$0027, li, a, code, em, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["I began this post three months ago, got stuck, and put it in ", "the too hard basket. I wanted to devise a workable solution ", "to my stumbling block before publishing this information. ", "I'm getting ahead of myself, though. First, the background."]), p(["As I began writing this post, I had just completed a redesign ", "of this site. The new design removed unnecessary distractions ", "to allow readers to focus on the clearly presented content. ", "I moved site navigation from the sidebar (which I axed ", "altogether) to the header. I decided to fix the header in ", "place so that the navigation and search form would always be ", "visible. This required very little effort, but overcoming the ", a({
  href: "http://css-tricks.com/forums/viewtopic.php?t=3496"
})(["problem posed by fixed-position headers"]), " took a great ", "deal of trial and error. To save others from going through ", "this tortuous process I'll describe my various approaches, ", "and list the benefits and drawbacks of each."])];
const body = [...excerpt, h3(["Requirements"]), ul([li(["An additional vertical scrollbar must not be introduced."]), li(["Appending ", strong(["#example"]), " to a URL should result in ", "the element whose id is \"example\" being displayed at the ", "top of the content area (not hidden behind the header)."]), li(["Additional markup may be used only if the requirements above ", "cannot be met without extra markup."])]), p(["The CSS for the header initially looked like this:"]), code$002Dblock("css")("#header\n{\n    position: fixed;\n    top: 0;\n    left: 0;\n    height: 160px;\n}\n  "), h3(["Approach 1: positive top padding + negative bottom margins"]), p(["Here's the CSS:"]), code$002Dblock("css")("h1, h2, h3, h4, h5, h6, p\n{\n    padding-top: 160px;\n    margin-bottom: -160px;\n}\n  "), p(["This approach adds top padding (equal to the height of the header) ", "to each of the block-level elements in the content area. This ensures ", "that elements are in the correct position when jumped to using #id. ", "An equal and opposite bottom margin is also applied to prevent the ", "padding from adding unwanted white space between elements."]), ul([li$0027({
  class: "pro"
})(["No additional markup is required."]), li$0027({
  class: "pro"
})(["Straightforward CSS."]), li$0027({
  class: "con"
})(["The CSS selector needs to contain all block-level elements ", "that may have ids in some instances. This is likely to include ", "elements such as divs and forms. Since it is hard to foresee ", "all the situations in which a link may direct a user to a ", "uniquely identified element, it is difficult to ensure that ", "this approach will work in all cases."]), li$0027({
  class: "con"
})([strong(["The negative bottom margin causes each block-level ", "element to overlap the preceding element, making \"overlapped\" ", "links unclickable!"])])]), h3(["Approach 2: preceding divs"]), p(["Again, the CSS:"]), code$002Dblock("css")("div.id\n{\n    position: relative;\n    top: -160px;\n}\n  "), p(["This approach introduces meaningless markup. Where previously we may ", "have had something like this:"]), code$002Dblock("html")("<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus volutpat risus nec mollis. Integer dapibus dictum ultrices. Aenean vel lectus odio. Nam a mi ligula. Nam in dolor quis metus pretium imperdiet sit amet sed elit.</p>\n<h3 id=\"example\">Example</h3>\n<p>Suspendisse potenti. Proin convallis lacinia nibh, nec auctor ligula mattis consectetur. Mauris vel elit sit amet nibh volutpat varius id vel sem. Pellentesque id purus ligula. Vivamus vel nulla vel justo tempor ultricies.</p>\n  "), p(["We now have the following:"]), code$002Dblock("html")("<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus volutpat risus nec mollis. Integer dapibus dictum ultrices. Aenean vel lectus odio. Nam a mi ligula. Nam in dolor quis metus pretium imperdiet sit amet sed elit.</p>\n<div id=\"example\" class=\"id\"></div>\n<h3>Example</h3>\n<p>Suspendisse potenti. Proin convallis lacinia nibh, nec auctor ligula mattis consectetur. Mauris vel elit sit amet nibh volutpat varius id vel sem. Pellentesque id purus ligula. Vivamus vel nulla vel justo tempor ultricies.</p>\n  "), p(["With this approach, each uniquely identified block-level ", "element within the content area gives its id to a div which ", "appears immediately before it in the HTML. Each of these divs ", "is offset by the height of the header, ensuring that the ", "element of interest is not obscured by the header."]), ul([li$0027({
  class: "pro"
})(["Straightforward CSS."]), li$0027({
  class: "pro"
})(["Links are always clickable!"]), li$0027({
  class: "con"
})(["Additional markup is required, necessitating that ", "existing content be updated (or JavaScript used to ", "insert the additional elements dynamically)."]), li$0027({
  class: "con"
})(["Not only is this extra markup meaningless, ", "but it actually removes ids from the elements ", "to which they were additionally assigned. Any ", "existing CSS selectors that refer to one of these ", "elements will need to be updated. (For example, ", code(["h3#comments"]), " would need to change to ", code(["div#comments + h3"]), "."])]), p(["This approach does not have any fatal flaws, but it may require ", "template files, static HTML files, style sheets, and database ", "records to be updated. Additionally, it is inelegant. In other ", "words, it ", em(["is"]), " as option, but not a good one."]), h3(["Approach 3: JavaScript trickery"]), p(["The previous approach got the job done, but introduced meaningless ", "elements. This task is best performed with JavaScript."]), code$002Dblock("javascript")("// accommodate fixed-position header\ndocument.observe('dom:loaded', function () {\n    $$('h2[id]', 'h3[id]', 'h4[id]', 'h5[id]', 'h6[id]').each(function (e) {\n        var div = new Element('div', { id: e.id });\n        e.writeAttribute({ id: null });\n        e.addClassName('unidentified');\n        e.insert({ 'top': div });\n    })\n});\n  "), p(["The above snippet locates all the h2, h3, h4, h5, and h6 elements ", "on the page that have an id attribute. It then loops through this ", "collection of elements and inserts an empty div element into each ", "one. This div \"steals\" its parent's id."]), p(["CSS can be used to position these empty divs in such a way that ", "headings are visible when jumped to:"]), code$002Dblock("css")("h2.unidentified div, h3.unidentified div\n{\n    float: left;\n    margin: -160px 0 0 0;\n}\n  "), ul([li$0027({
  class: "pro"
})(["No additional markup is required."]), li$0027({
  class: "pro"
})(["Straightforward CSS."]), li$0027({
  class: "pro"
})(["Links are always clickable."]), li$0027({
  class: "con"
})(["JavaScript (and in this case ", a({
  href: "http://prototypejs.org/"
})(["Prototype"]), ") required."]), li$0027({
  class: "con"
})(["Association between an id and the element it identifies ", "is broken."])]), h3(["Summary"]), p(["I have implemented the JavaScript approach, and it works nicely. ", "I am still hopeful that there exists a simpler and/or more universal ", "solution to the problem posed by fixed-position headers. Please let ", "me know if you have any ideas or suggestions."])];
export default {
  id: 30,
  slug: "css-fixed-position-headers",
  title: ["CSS fixed-position headers"],
  datetime: datetime("2009-10-30 18:25:00 (Pacific/Auckland)"),
  tags: ["css", "html", "javascript", "prototype"],
  body
};
