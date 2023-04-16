import {p, blockquote, a, em, img} from "../elements.js";
import datetime from "../datetime.js";
const body = [p([img({
  alt: "Helveticards",
  src: "/images/posts/92/helveticards.jpg"
})]), blockquote([p([a({
  href: "http://helveticards.uberdm.com/"
})(["Helveticards"]), " ", "are a set of über minimalist typographic playing cards by designer ", a({
  href: "https://twitter.com/uberryan"
})(["Ryan Myers"]), "."])]), p(["I love these! I designed a set of playing cards several years ago while ", "at university, but I certainly didn't think of doing ", em(["this"]), "."]), p(["Via ", a({
  href: "http://laughingsquid.com/helveticards-minimalist-typographic-playing-cards/"
})(["Laughing Squid"]), "."])];
export default {
  id: 92,
  slug: "helveticards",
  title: ["Helveticards"],
  datetime: datetime("2011-11-20 22:00:00 (America/Los_Angeles)"),
  tags: ["design", "typography"],
  body
};
