import {attemptP, bichain, fork, parallel, resolve} from "fluture";
import sanctuary from "sanctuary";
import posts from "../posts/index.js";
const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const joinWith = separator => xs => xs.join(separator);
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
const filter = f => xs => (function () {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.filter(x => f(x));
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [filter(f)([...xs])]);
    default:
      return xs["fantasy-land/filter"](f);
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
const S = sanctuary.unchecked;
const absolute$003F = url => url.startsWith("http:") || url.startsWith("https:");
const links = node => equals("a")(node.name) ? filter(absolute$003F)([node.attributes.href]) : equals(undefined)(node.children) ? [] : chain(links)(node.children);
const status = url => bichain(function (err) {
  return resolve({
    url,
    status: "XXX"
  });
})(function (res) {
  return resolve({
    url,
    status: res.status
  });
})(attemptP(function () {
  return fetch(url, {
    method: "HEAD",
    redirect: "manual"
  });
}));
const bold = text => "\u001b[1m" + text + "\u001b[22m";
const invert = text => "\u001b[7m" + text + "\u001b[27m";
const red = text => "\u001b[31m" + text + "\u001b[0m";
const yellow = text => "\u001b[33m" + text + "\u001b[0m";
const cyan = text => "\u001b[36m" + text + "\u001b[0m";
const format = ({url, status}) => equals("string")(typeof$(status)) ? red(invert(bold(status)) + " " + url) : status >= 200 && status < 300 ? bold(status) + " " + url : status >= 300 && status < 400 ? yellow(bold(status) + " " + url) : status >= 400 && status < 500 ? red(bold(status) + " " + url) : cyan(bold(status) + " " + url);
const program = map($ => joinWith("\n")(map(format)($)))(parallel(16)(map(status)(S.sort(Array.from(globalThis.Reflect.construct(Set, [chain(links)(chain($ => $.body)(posts))]))))));
fork(console.error)(console.log)(program);
