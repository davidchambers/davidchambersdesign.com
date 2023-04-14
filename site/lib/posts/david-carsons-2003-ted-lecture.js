import {p, dl, dt, dd, object, a, strong, param} from "../elements.js";
import datetime from "../datetime.js";
const body = [p(["One of my flatmates linked me to this clip recently. It's titled ", a({
  href: "http://www.ted.com/index.php/talks/david_carson_on_design.html"
})(["Design, discovery and humor"]), " and certainly delivers the\n    entertainment it promises. It's well worth a look."]), dl([dt([object({
  type: "application/x-shockwave-flash",
  width: "446",
  height: "326",
  data: "http://video.ted.com/assets/player/swf/EmbedPlayer.swf"
})([param({
  name: "movie",
  value: "http://video.ted.com/assets/player/swf/EmbedPlayer.swf"
}), param({
  name: "wmode",
  value: "transparent"
}), param({
  name: "allowFullScreen",
  value: "true"
}), param({
  name: "flashvars",
  value: "vu=http://video.ted.com/talks/embed/DavidCarson_2003-embed_high.flv&su=http://images.ted.com/images/ted/tedindex/embed-posters/DavidCarson-2003.embed_thumbnail.jpg&vw=432&vh=240&ap=0&ti=436"
})])]), dd([p(["David Carson presents ", strong(["Design, discovery and humor"]), "\n        at TED, February 2003"])])])];
export default {
  id: 6,
  slug: "david-carsons-2003-ted-lecture",
  title: ["David Carson's 2003 TED lecture"],
  datetime: datetime("2009-02-10 11:21:00 (Pacific/Auckland)"),
  tags: ["design", "typography", "video"],
  body
};
