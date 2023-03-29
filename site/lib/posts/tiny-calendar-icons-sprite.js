import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {captioned$002Dimages, code$002Dblock} from "../components.js";
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
  match: type => Prelude["match'"](type)(_ => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude.filter(x => Prelude.not(predicate(x))),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
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
