import {a, code, em, h3, i, li, ol, p, p$0027, script, ul} from "../elements.js";
import {code$002Dblock, update, $2014} from "../components.js";
import datetime from "../datetime.js";
const {XOR, OR, subtract, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, empty, reduce, reduceRight, filter, reject, map, flip, of, chain, contains} = {
  XOR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
      default:
        return lhs ^ rhs;
    }
  })(),
  OR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
      default:
        return lhs | rhs;
    }
  })(),
  subtract: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
      default:
        return lhs - rhs;
    }
  })(),
  apply: f => args => f.apply(null, args),
  construct: constructor => args => globalThis.Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[globalThis.Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : globalThis.Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  empty: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return [];
      case "Object":
        return {};
      case "String":
        return "";
      case "Set":
      case "Map":
        return globalThis.Reflect.construct(typeRep, [[]]);
      default:
        return typeRep["fantasy-land/empty"]();
    }
  })(),
  reduce: f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter(x => !f(x)),
  map: f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  of: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return globalThis.Array.of;
      case "Function":
        return x => y => x;
      case "Set":
        return x => globalThis.Reflect.construct(typeRep, [[x]]);
      default:
        return typeRep["fantasy-land/of"];
    }
  })(),
  chain: f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f),
  contains: this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these)
};
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
`), p(["For some reason wrapping the ", code(["webkitTransition*"]), "\n    declarations in an anonymous function passed to ", code(["setTimeout"]), " with no delay prevents the transition\n    from being applied retroactively. I wondered whether closure\n    would be sufficient, but no, ", code(["setTimeout"]), " seems\n    to be the remedy for this \"quirk\"."]), p(["I'd love to know whether the behaviour described here\n    is correct behaviour. If I manage to find the answer to\n    this I'll post an update. If you are able to enlighten me,\n    please do so by leaving a comment!"]), update(datetime("2010-06-02")("00:15:00")("Pacific/Auckland"))([p(["I've just been watching one of the ", a({
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
  datetime: datetime("2010-06-18")("03:12:00")("Pacific/Auckland"),
  tags: ["css3", "javascript"],
  body
};
