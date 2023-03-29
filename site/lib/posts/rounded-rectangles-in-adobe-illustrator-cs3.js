import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["<<"]: rhs => lhs => lhs << rhs,
      [">>"]: rhs => lhs => lhs >> rhs,
      [">>>"]: rhs => lhs => lhs >>> rhs,
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => Prelude.filter(x => Prelude.not(f(x))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const excerpt = [p([img({
  alt: "",
  src: "/images/posts/decorative/left/adobe-illustrator-cs3-icon.png"
})]), p(["Not so long ago I was talking to my brother online as he\n    worked on a poster for a presentation. He is an engineer;\n    using Illustrator was a new experience for him. He generally\n    picks up new things easily, but as you may appreciate,\n    Illustrator is often far from logical. We reached a point\n    where he asked me about scaling rounded rectangles – this\n    is where things started to get hairy."]), ol([li$0027({
  class: "interviewer"
})([strong(["him:"]), "\n      if I have a rounded rectangle and resize it, it there a\n      way to stop it from changing the rounding of the corners\n      (which I want constant for all my rectangles)?"]), li([strong(["me:"]), "\n      you can work out how large you want it to be and then\n      double-click with the rectangle tool and you'll be able\n      to enter all the correct values"]), li$0027({
  class: "interviewer"
})([strong(["him:"]), "\n      is there a way to change how curved they are after placing them?"]), li([strong(["me:"]), "\n      InDesign has a much better was of dealing with this issue than\n      does Illustrator... in InDesign, the rectangle is treated as an\n      object, and its corner radius is treated as a property in just\n      the same way as its width, height, and position... this means\n      that you can change the corner radius at any time..."]), li$0027({
  class: "interviewer"
})([strong(["him:"]), "\n      that's how it should be"])])];
const body = [...excerpt, p(["Hmm. Since InDesign deals with rounded rectangles effortlessly,\n    why does Illustrator make them such a pain? I did a quick Google\n    search and found out how to create a rounded rectangle which can\n    be scaled without affecting the corners. As with many simple tasks,\n    Illustrator requires the user to carry out several steps:"]), ol([li(["draw a rectangle of any size"]), li(["select it and go to ", strong(["Effect"]), " > ", strong(["Convert to Shape"]), " > ", strong(["Rounded Rectangle..."])]), li(["in the ", strong(["Shape Options"]), " dialogue, check the ", strong(["Relative"]), " radio button, and set ", strong(["Extra Width"]), " and ", strong(["Extra Height"]), " to 0"]), li(["enter your desired corner radius, and off you go!"])]), captioned$002Dimages([{
  alt: "Illustrator's Shape Options dialog",
  src: "/images/posts/windows/illustrator-shape-options-dialog.png",
  caption: ["Illustrator's ", strong(["Shape Options"]), " dialog,\n      set up to enable rounded rectangles which scale correctly"]
}]), p(["Now that the shape has been converted to a rounded rectangle,\n    the ", strong(["Shape Options"]), " dialog can be accessed by\n    double-clicking on ", strong(["Rounded Rectangle"]), " in the ", strong(["Appearance"]), " palette."])];
export default {
  id: 3,
  slug: "rounded-rectangles-in-adobe-illustrator-cs3",
  title: ["Rounded rectangles in Adobe Illustrator CS3"],
  datetime: datetime("2008-12-03")("12:49:00")("Pacific/Auckland"),
  tags: ["adobe", "cs3", "illustrator"],
  body
};
