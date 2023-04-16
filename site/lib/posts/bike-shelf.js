import {p, a, img} from "../elements.js";
import datetime from "../datetime.js";
const body = [p(["Simple design executed beatifully."]), p([img({
  alt: "Bike shelf",
  src: "http://knifeandsaw.files.wordpress.com/2010/09/photo_bikerack_cu_bars.jpg"
})]), p(["The article from which this photograph is lifted, entitled ", a({
  href: "http://knifeandsaw.wordpress.com/furniture/bike-shelf/"
})(["Bike Shelf"]), ", ", "is over on ", a({
  href: "http://knifeandsaw.wordpress.com/"
})(["Knife & Saw"]), "."])];
export default {
  id: 71,
  slug: "bike-shelf",
  title: ["Bike shelf"],
  datetime: datetime("2010-09-20 19:53:00 (Pacific/Auckland)"),
  tags: ["design"],
  body
};
