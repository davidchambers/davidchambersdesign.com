import {article$0027, h1, h3$0027, h4, header, footer$0027, ol, ul, li$0027, li, a, time} from "./elements.js";
import tags from "./tags.js";
const equals = this$ => that => (function () {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return (function () {
        switch (globalThis.Object.prototype.toString.call(that)) {
          case "[object Array]":
            return this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]));
          default:
            return false;
        }
      })();
    default:
      return this$ === that;
  }
})();
const map = f => xs => (function () {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const render$002Dpost = post => related$002Dposts => [article$0027(equals(undefined)(post["article-id"]) ? {} : {
  id: post["article-id"]
})([header([h1(post.title), time({
  datetime: (args => target => target.toFormat.apply(target, args))(["yyyy-MM-dd'T'HH:mm:ssZZ"])(post.datetime),
  pubdate: "pubdate"
})([(args => target => target.toFormat.apply(target, args))(["d MMMM y"])(post.datetime)])]), ...post.body, footer$0027({
  class: "metadata"
})([ul([li$0027({
  class: "shorturl"
})([a({
  href: "http://dċd.ws/" + post.id + "/"
})(["Short URL"])])]), ...equals([])(post.tags) ? [] : [h4(["This post has the following tags:"]), ol(map(function (tag) {
  return li([a({
    href: "/tag/" + tag + "/"
  })([tags[tag]])]);
})(post.tags))]]), ...equals([])(related$002Dposts) ? [] : [h3$0027({
  id: "related"
})(["Possibly related posts"]), ul(map(function (post) {
  return li([a({
    href: "/" + post.slug + "/"
  })(post.title)]);
})(related$002Dposts))]])];
export default render$002Dpost;
