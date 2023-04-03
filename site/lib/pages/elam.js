import {a, b, h3$0027, h4, i, img, li, p, ul} from "../elements.js";
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = {
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
  apply: f => args => f.apply(null, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter($ => not(f($))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
export default {
  slug: "elam",
  title: ["Elam"],
  body: [p(["I attended Elam School of Fine Arts in Auckland between 2002 and 2005.\n      After the general first-year course I majored in graphic design. Below\n      are examples of the work I produced as part of that programme."]), ul([li([a({
    href: "#2003"
  })(["2003"])]), li([a({
    href: "#2004"
  })(["2004"])]), li([a({
    href: "#2005"
  })(["2005"])])]), h3$0027({
    id: "2003"
  })(["2003"]), h4(["Design philosophies poster"]), p([b(["Brief."]), " Express your personal design philosophies in a design\n      manifesto. This may take the form of a booklet, pamphlet or poster."]), p([img({
    alt: "Design philosophies: simple, sensible, sustainable",
    src: "/images/elam/lightbox/design-philosophies-poster.png"
  })]), h4(["Sugar awareness billboard campaign"]), p([b(["Brief."]), " Create a billboard campaign to increase public awareness\n      of the dangers of excessive sugar consumption. The aim is to present the\n      dangers without coming across as \"preachy\"."]), p([img({
    alt: "Excessive sugar consumption can cause dizziness",
    src: "/images/elam/sugar-billboards/dizzy-snake.jpg"
  })]), p([img({
    alt: "Excessive sugar consumption can cause breast cancer",
    src: "/images/elam/sugar-billboards/breast-cancer.jpg"
  })]), p([img({
    alt: "Excessive sugar consumption can impair concentration",
    src: "/images/elam/sugar-billboards/plane-crash.jpg"
  })]), h3$0027({
    id: "2004"
  })(["2004"]), h4([i(["Caligula"]), " poster"]), p([b(["Brief."]), " Design a poster to promote the Auckland Theatre\n      Company's production of ", i(["Caligula"]), ". The poster must appeal\n      to young people, as this play was chosen as part of an effort to\n      attract more young people to theatre. Copy provided. A1."]), p([img({
    alt: "Poster for the play Caligula",
    src: "/images/elam/lightbox/caligula-poster.png"
  })]), p([img({
    alt: "Typography used in Caligula poster",
    src: "/images/elam/caligula-typography.png"
  })]), h4([i(["tyypo"]), " magazine"]), p([b(["Brief."]), " Design a magazine of any size and any nature.\n      (I chose to design a typography magazine, which I named ", i(["tyypo"]), ". Actual size: A4.)"]), p([img({
    alt: "tyypo magazine cover",
    src: "/images/elam/lightbox/tyypo-cover.png"
  })]), h4(["Elam open days poster"]), p([b(["Brief."]), " Design a poster to advertise the 2004 Elam open days.\n      To be displayed around the city, and sent to secondary schools. A1."]), p([img({
    alt: "Elam open days poster",
    src: "/images/elam/lightbox/elam-open-days-poster.png"
  })]), h4(["Panprint calendar competition"]), p([b(["Brief."]), " Design a page for possible inclusion in the 2004 Panprint\n      calendar. Panprint produces a calendar each year as a way to promote its\n      services, and the work of young designers. This year the theme is \"true\n      colours\". A1."]), p([img({
    alt: "Panprint poster",
    src: "/images/elam/lightbox/panprint-poster.jpg"
  })]), h3$0027({
    id: "2005"
  })(["2005"]), h4(["Gameplayer brand identity"]), p([b(["Brief."]), " Design a brand identity for Gameplayer,\n      a company that runs tournaments in Auckland for four\n      trading card games: ", i(["Magic: The Gathering"]), ", ", i(["Duel Masters"]), ", ", i(["Yu-Gi-Oh!"]), " and ", i(["VS System"]), ". The identity must appeal to those\n      between 12 and 24 years of age, without marginalizing\n      older players of the games."]), p([img({
    alt: "Gameplayer business card (James)",
    src: "/images/elam/gameplayer-business-card-james.png"
  })]), p([img({
    alt: "Gameplayer business card (Cici)",
    src: "/images/elam/gameplayer-business-card-cici.png"
  })]), p([img({
    alt: "Gameplayer promotional card",
    src: "/images/elam/gameplayer-promotional-card.png"
  })]), h4(["Playing card design"]), p(["Playing cards are an example of graphic design in its purest form.\n      Balance, composition and consistency are all vitally important\n      ingredients in playing card design. Typography, too, plays an\n      important role."]), p(["Rockwell was used as the starting point for the characters on each card.\n      As an eccentric, slab-serif typeface Rockwell has few applications, but\n      the consistent weight and overall blackness of its letterforms make it\n      suitable for this purpose. Several of the characters were tweaked to iron\n      out idiosyncrasies: Rockwell's \"A\" is not symmetrical, for example.\n      The \"J\" and the \"Q\" required complete remodelling."]), p(["Geometry was the driving force behind the design of the suit symbols.\n      Initially, the diamond was a square rotated forty-five degrees, and\n      the heart-shaped element of the spade was identical in shape and size\n      to the heart itself."]), p(["It soon became apparent that geometry should not drive the design\n      of the symbols – instead, the human eye should be the judge. Many\n      adjustments were made on this basis: the heart was increased in size\n      to bring its surface area close to that of the spade; the club's upper\n      leaf was made slightly larger so that all three leaves appear equal\n      in size; and all straight edges were given gentle concave curves to\n      prevent them from \"bulging\"."]), p([img({
    alt: "Playing cards",
    src: "/images/elam/playing-cards.jpg"
  })]), h4([i(["Exposure05"]), " catalogue"]), p([b(["Brief."]), " Design the catalogue for the annual end-of-year\n      exposition organized by the University of Auckland Postgraduate\n      Students' Association."]), p([img({
    alt: "Exposure magazine cover",
    src: "/images/elam/exposure-cover.jpg"
  })]), p([img({
    alt: "Exposure magazine spread",
    src: "/images/elam/exposure-spread.jpg"
  })]), h4(["\"Insight Drive\""]), p(["While at Insight, I was asked to design the packaging for an unusual\n      Christmas gift. Earlier in the year, Insight had sent branded model\n      Mini Coopers to its most valued clients. These cars had proven\n      extremely popular, so it was decided that a faster motor would be\n      sent to each Mini owner at the end of the year (to get a little more\n      mileage from the initiative). The engines themselves did not possess\n      much aesthetic appeal, so the challenge was to package them in an\n      exciting way."]), p([img({
    alt: "Packaged motors ready to send",
    src: "/images/elam/insight-drive.jpg"
  })])]
};
