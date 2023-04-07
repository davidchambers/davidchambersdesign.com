import {a, blockquote, em, p, time} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["On ", time({
  datetime: "2010-03-19T13:58-00:00"
})(["19 March 2010"]), ",\n    David Chambers wrote:"]), blockquote([p(["Hi Douglas,"]), p(["[...] Moments ago I used ", a({
  href: "http://www.jslint.com/"
})(["JSLint"]), "\n      for the first time; I plan to use it frequently\n      from this point forward. I have one question,\n      though, concerning the acceptability of extra\n      commas. Consider the following code snippet:"]), code$002Dblock("javascript")(`var ninja = {
    name: 'Hattori Hanzou Masashige',
    shuriken: 5,
    attack: function () {
        if (ninja.shuriken) {
            ninja.shuriken -= 1;
            window.alert('Hai-Ya!');
        }
    },
};
`), p(["JSLint returns an ", em(["extra comma"]), " error for the unnecessary\n      comma preceding the closing brace. I would argue, though, that this in\n      not an error. As far as I'm aware, this comma will not cause problems."]), p(["In fact, quite the opposite is true. If one were to insert an\n      additional property or method after ", em(["attack"]), " one would\n      not need to remember to first add a comma. In Django it's considered\n      best practice to include a comma after every item (including the last)\n      in a one item per line collection for this very reason."]), p(["I thought I'd give you my two cents, anyway. :)"]), p(["Regards,"]), p(["David Chambers"])]), p(["On ", time({
  datetime: "2010-03-19T15:13-00:00"
})(["19 March 2010"]), ",\n    Douglas Crockford wrote:"]), blockquote([p(["Your awareness is incorrect. Have you tested on IE6?"])])];
export default {
  id: 46,
  slug: "extra-comma-considered-harmful",
  title: ["Extra comma considered harmful"],
  datetime: datetime("2010-03-29 15:30:00 (Pacific/Auckland)"),
  tags: ["best-practice", "javascript"],
  body
};
