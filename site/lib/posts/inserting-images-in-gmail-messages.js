import {a, p} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Hooray! It's now possible to ", a({
  href: "http://gmailblog.blogspot.com/2009/04/new-in-labs-inserting-images.html"
})(["insert images into Gmail messages"]), ". About time, I say."]), captioned$002Dimages([{
  alt: "Gmail insert image icon",
  src: "/images/posts/10/gmail-insert-image-icon.png",
  caption: ["Gmail's insert image icon, visible in rich formatting mode"]
}])];
export default {
  id: 10,
  slug: "inserting-images-in-gmail-messages",
  title: ["Inserting images in Gmail messages"],
  datetime: datetime("2009-04-15")("20:27:00")("Pacific/Auckland"),
  tags: ["gmail", "html"],
  body
};
