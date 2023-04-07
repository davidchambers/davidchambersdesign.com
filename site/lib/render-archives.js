import sanctuary from "sanctuary";
import {a, h1, h2, li, ol, ol$0027, time} from "./elements.js";
const equals = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return (() => {
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
const map = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const S = sanctuary.unchecked;
const render$002Dpost = ({slug, title, datetime}) => li([a({
  href: "/" + slug
})(title), " ", time({
  datetime: (args => target => target.toISO.apply(target, args))([])(datetime)
})([(args => target => target.toFormat.apply(target, args))(["d MMMM y | h:mm"])(datetime) + (args => target => target.toLowerCase.apply(target, args))([])((args => target => target.toFormat.apply(target, args))(["a"])(datetime))])]);
const render$002Dsection = posts => li([h2([posts[0]["formatted-date"]]), ol(map(render$002Dpost)(posts))]);
const render$002Darchives = posts => (archives => [h1(["Archives"]), ol$0027({
  class: "archives"
})(archives)])(map(render$002Dsection)(S.groupBy(this$ => that => equals(that["formatted-date"])(this$["formatted-date"]))(S.sortBy(post => -post.datetime)(map(post => ({
  ...post,
  ["formatted-date"]: (args => target => target.toFormat.apply(target, args))(["MMMM y"])(post.datetime)
}))(posts)))));
export default render$002Darchives;
