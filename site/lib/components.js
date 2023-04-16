import {text, h4, pre, dl, dt, dd, div as $div, code, time, img} from "./elements.js";
const chain = f => x => (function () {
  switch (globalThis.Object.prototype.toString.call(x)) {
    case "[object Array]":
      return x.flatMap(x => f(x));
    case "[object Function]":
      return y => x(f(y))(y);
    default:
      return x["fantasy-land/chain"](f);
  }
})();
const captioned$002Dimages = images => dl(chain(function ({alt, src, caption}) {
  return [dt([img({
    alt,
    src
  })]), dd(caption)];
})(images));
const code$002Dblock = language => source$002Dcode => pre([code([text(source$002Dcode)])]);
const update = datetime => body => $div({
  class: "update"
})([h4(["Update — ", time({
  datetime: (args => target => target.toISO.apply(target, args))([])(datetime)
})([(args => target => target.toFormat.apply(target, args))(["d MMMM y"])(datetime)])]), ...body]);
const $2014 = text(" — ");
export {captioned$002Dimages, code$002Dblock, update, $2014};
