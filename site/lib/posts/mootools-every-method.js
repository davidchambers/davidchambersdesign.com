import {h3, p, ol, li, a, code, em, strong, var$} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["A reasonably common task is to determine whether a particular\n    statement evaluates as true for every item in a collection.\n    Take ", var$(["list"]), ", for example, an Array containing\n    several numbers:"]), code$002Dblock("javascript")(`var list = [4, -1, 3, 2, 5];
`), p(["One might wish to determine whether all the numbers in ", var$(["list"]), " are positive. The required logic is as follows:"]), ol([li(["assume that all the numbers in ", var$(["list"]), " are positive, then..."]), li(["loop through ", var$(["list"]), " until the assumption is proven to be\n      false, or until all items in ", var$(["list"]), " have been tested"])]), p(["In plain JavaScript, this can be achieved using a ", code(["for"]), "\n    loop..."]), code$002Dblock("javascript")(`var allPositive = true;
for (var i = 0; i < list.length; i++) {
    if (list[i] <= 0) {
        allPositive = false;
        break;
    }
}
`), p(["... or a ", code(["while"]), " loop (which is slightly more efficient)."]), code$002Dblock("javascript")(`var allPositive = true, i = list.length;
while (i--) {
    if (list[i] <= 0) {
        allPositive = false;
        break;
    }
}
`), p([strong(["Seriously, though, who is writing ", em(["vanilla"]), "\n    JavaScript in 2010?"]), " Everyone and their grandmothers are\n    using JavaScript frameworks these days, and there are plenty\n    of good ones out there. I recently made the switch to ", a({
  href: "http://mootools.net/"
})(["MooTools"]), " from ", a({
  href: "http://prototypejs.org/"
})(["Prototype"]), ",\n    after deciding that while ", a({
  href: "http://jquery.com/"
})(["jQuery"]), " is fantastic, the ", a({
  href: "http://jqueryvsmootools.com/#jsfun"
})(["MooTools philosophy"]), "\n    is more to my liking."]), p(["With MooTools, one might consider using the ", a({
  href: "http://mootools.net/docs/core/Native/Array#Array:each"
})(["Array object's each method"]), "\n    instead of a ", code(["for"]), " or ", code(["while"]), " loop."]), code$002Dblock("javascript")(`var allPositive = true;
list.each(function (item) {
    if (item <= 0) {
        allPositive = false;
    }
});
`), p(["While this gets the job done, it's suboptimal for two reasons: the\n    positiveness of ", em(["every"]), " item is evaluated, which will often\n    not be necessary; and, well, ", strong(["it ain't pretty"]), ". ;)"]), h3(["Enter ", code(["every"])]), p(["As is so often the case in programming, if something seems fiddly and\n    difficult there's probably a better tool for the job. In this case the ", a({
  href: "http://mootools.net/docs/core/Native/Array#Array:every"
})(["Array object's every method"]), " is the perfect tool for the job."]), code$002Dblock("javascript")(`var allPositive = list.every(function (item) {
    return item > 0;
});
`), p(["This is terser than is possible with vanilla JavaScript.\n    It reads better too, in my opinion!"])];
export default {
  id: 41,
  slug: "mootools-every-method",
  title: ["MooTools every method"],
  datetime: datetime("2010-03-18 00:40:00 (Pacific/Auckland)"),
  tags: ["javascript", "mootools"],
  body
};
