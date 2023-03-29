import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
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
const body = [p([img({
  alt: "DigitalColor Meter",
  src: "/images/posts/windows/digitalcolor-meter.png"
})]), p(["I thought this recent ", a({
  href: "http://minimalmac.com/post/836796290/"
})(["post on the Minimal Mac blog"]), " well worth sharing:"]), blockquote([p(["When was the last time you checked out your Utilities folder?\n      Well, if your answer was “What’s that?” then let me explain.\n      Inside of your Applications folder is another folder called\n      Utilities that is filled with all sorts of wondrous things\n      that most people either don’t know or completely forget are\n      there. Even veteran Mac users are guilty of this. I know I am."]), p([strong(["DigitalColor Meter"]), " is one example of this. The other\n      day, I wanted to find out the ", strong(["web safe color"]), " of a\n      particular item on the screen of my Mac for a web design project\n      I was working on. My first step was to go searching the Internet\n      for such a tool (preferably free). Then, in the midst of said\n      search, I was reminded that this little tool was not only already\n      on my Mac, did exactly what I wanted, but also did it better than\n      any of the tools I was able to find."]), p(["The point is that, even the tools we think we know can ", strong(["always reveal a little something we don’t"]), ". The Mac is\n      an incredibly deep and rich OS and there are few that know it all.\n      I’m going to spend some time every day for the next little while\n      spending some time getting to know some more of these built-in\n      tools I largely have ignored and see if I have any practical\n      applications for using them. You will likely see more posts\n      like this in the coming days."])]), p([a({
  href: "http://tumblr.frijole.info/post/836825948/"
})(["Reblogged by ¡ɜɿoɾɪɹℲ"]), " with this extremely nifty addition:"]), blockquote([p(["To take your Digital Color Metering to the next level, you can drag the\n      color off of the well on the right (next to the R G B labels) into any\n      standard color picker to bring it over. Sometimes, you can even drop it\n      straight into an object in another app!"]), p(["Give it a try: sample a color, press cmd-shift-h to hold it, then drag\n      and drop from the swatch an object in Pages or Keynote."])]), p(["I'm going to find this incredibly useful. No more grabbing a portion of\n    the screen, switching to Photoshop, creating a new document, hitting ⌘V,\n    switching to the eyedropper tool, double-clicking the foreground colour\n    swatch to invoke the Color Picker, and ", em(["then"]), " clicking on the\n    appropriate pixel to find its colour value."]), p(["I don't think I'll miss this process, somehow, although my flatmate'll\n    miss the camera shutter sound that accompanies screen captures on OS X\n    (he really likes it, for some reason)."])];
export default {
  id: 65,
  slug: "digitalcolor-meter",
  title: ["DigitalColor Meter"],
  datetime: datetime("2010-07-23")("01:45:00")("Pacific/Auckland"),
  tags: ["mac-os-x", "photoshop"],
  body
};
