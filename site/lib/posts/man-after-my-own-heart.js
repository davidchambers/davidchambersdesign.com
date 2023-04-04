import {a, blockquote, i, p} from "../elements.js";
import datetime from "../datetime.js";
const body = [p(["From Wikipedia on Mies van der Rohe's ", a({
  href: "http://en.wikipedia.org/wiki/Seagram_Building"
})(["Seagram Building"]), ":"]), blockquote([p(["[An] interesting feature of the Seagram Building is the window blinds.\n      As was common with International Style architects, Mies wanted the\n      building to have a uniform appearance. One aspect of a façade which\n      Mies disliked, was the disordered irregularity when window blinds are\n      drawn. Inevitably, people using different windows will draw blinds to\n      different heights, making the building appear disorganized. To reduce\n      this disproportionate appearance, Mies specified window blinds which\n      only operated in three positions – fully open, halfway open/closed,\n      or fully closed."])]), p(["This, taken from Werner Blaser's ", i(["Mies van der Rohe"]), ",\n    is also brilliant:"]), blockquote([p(["The plan of the brick villa is a good example of the\n      way in which Mies van der Rohe developed the art of\n      structure from the very beginning. The structure of\n      a brick wall begins with the smallest unit into which\n      the whole can be divided: the brick. The dimensions are\n      calculated in terms of the basic unit of the brick."])])];
export default {
  id: 64,
  slug: "man-after-my-own-heart",
  title: ["Man after my own heart"],
  datetime: datetime("2010-07-23")("00:07:00")("Pacific/Auckland"),
  tags: ["architecture", "design"],
  body
};
