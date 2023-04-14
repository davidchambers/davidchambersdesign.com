import {h3, p$0027, p, ol, ul, li, a, code, em, i, script} from "../elements.js";
import {code$002Dblock, update, $2014} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["Here's a simple animation which utilizes ", code(["webkitTransition"]), ":"]), p$0027({
  id: "transition-example-1",
  style: "position:relative;left:0;top:0;width:200px;line-height:5.25em;background-color:#ccc;text-align:center;"
})(["Click to animate"]), script({})([`(function () {
    var element = document.getElementById('transition-example-1');
    element.style.webkitTransitionProperty = 'left';
    element.style.webkitTransitionDuration = '2s';
    element.addEventListener('click', function () {
        this.style.left = '100px';
        this.addEventListener('webkitTransitionEnd', function () {
            this.style.left = 0;
        });
    });
})();
`]), p(["The code behind this example is not complicated:"]), code$002Dblock("javascript")(`element.style.webkitTransitionProperty = 'left';
element.style.webkitTransitionDuration = '2s';
element.addEventListener('click', function () {
    this.style.left = '100px';
    this.addEventListener('webkitTransitionEnd', function () {
        this.style.left = 0;
    });
});
`)];
const body = [...excerpt, p(["The following example, though, does not act as one might expect!"]), p$0027({
  id: "transition-example-2",
  style: "position:relative;left:0;top:0;width:200px;line-height:5.25em;background-color:#ccc;text-align:center;"
})(["Click to reposition"]), script({})([`(function () {
    var element = document.getElementById('transition-example-2');
    element.addEventListener('click', function () {
        this.style.left = '100px';
        this.style.webkitTransitionProperty = 'left';
        this.style.webkitTransitionDuration = '2s';
        this.addEventListener('webkitTransitionEnd', function () {
            this.innerHTML = "D'oh!";
            this.style.left = 0;
        });
    });
})();
`]), p(["The code:"]), code$002Dblock("javascript")(`element.style.left = '100px';
element.style.webkitTransitionProperty = 'left';
element.style.webkitTransitionDuration = '2s';
`), p(["Here are the instructions this code attempts to provide:"]), ol([li(["Set the element's ", code(["left"]), " value to '100px'\n      (the page should immediately be redrawn)."]), li(["Set ", code(["webkitTransitionProperty"]), " and ", code(["webkitTransitionDuration"]), ", to apply a transition to ", em(["future"]), " changes in the value of ", code(["left"]), "."])]), p(["What actually happens", $2014, "as you'll have seen if you're viewing this\n    page in a recent version of Safari or Chrome", $2014, "is that the transition\n    is applied to the preceding update. This behaviour strikes me as strange,\n    but I have very little understanding of how these transitions are meant\n    to be effected by the browser."]), p(["I did manage to get the element to behave as I had intended:"]), p$0027({
  id: "transition-example-3",
  style: "position:relative;left:0;top:0;width:200px;line-height:5.25em;background-color:#ccc;text-align:center;"
})(["Click to reposition"]), script({})([`(function () {
    var element = document.getElementById('transition-example-3');
    element.addEventListener('click', function () {
        this.style.left = '100px';
        setTimeout(function () {
            element.style.webkitTransitionProperty = 'left';
            element.style.webkitTransitionDuration = '2s';
        }, 0);
        setTimeout(function () {
            element.style.webkitTransitionProperty = 'none';
            element.style.left = 0;
        }, 2000);
    });
})();
`]), p(["The working code:"]), code$002Dblock("javascript")(`element.style.left = '100px';
setTimeout(function () {
    element.style.webkitTransitionProperty = 'left';
    element.style.webkitTransitionDuration = '2s';
}, 0);
`), p(["For some reason wrapping the ", code(["webkitTransition*"]), "\n    declarations in an anonymous function passed to ", code(["setTimeout"]), " with no delay prevents the transition\n    from being applied retroactively. I wondered whether closure\n    would be sufficient, but no, ", code(["setTimeout"]), " seems\n    to be the remedy for this \"quirk\"."]), p(["I'd love to know whether the behaviour described here\n    is correct behaviour. If I manage to find the answer to\n    this I'll post an update. If you are able to enlighten me,\n    please do so by leaving a comment!"]), update(datetime("2010-06-02 00:15:00 (Pacific/Auckland)"))([p(["I've just been watching one of the ", a({
  href: "http://developer.apple.com/videos/wwdc/2010/"
})(["WWDC 2010 session videos"]), ", and it turns out the fix\n      I stumbled upon is actually the \"correct\" solution."]), p(["From ", i(["Session 504 – CSS Effects, Part 2: Galleries and 3D Effects"]), ":"]), h3(["Aside: How Browsers Apply CSS Styles"]), ul([li(["Browsers optimize away redundant style changes"]), li(["This matters with transitions, because they are temporal"])]), code$002Dblock("javascript")(`var box = document.getElementById('box');
box.style.backgroundColor = 'red';
box.style.webkitTransition = 'background-color 2s';
window.setTimeout(function() {
  box.style.backgroundColor = 'blue';
}, 0);
`)])];
export default {
  id: 55,
  slug: "settimeout-fix-for-webkit-transition",
  title: ["setTimeout fix for -webkit-transition"],
  datetime: datetime("2010-06-18 03:12:00 (Pacific/Auckland)"),
  tags: ["css3", "javascript"],
  body
};
