import S from "sanctuary";
import {a, h1, h2, li, ol, ol$0027, time} from "./elements.js";
const equals = this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that;
const map = f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f);
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
