import {attemptP, bichain, fork, parallel, resolve} from "fluture";
import sanctuary from "sanctuary";
import posts from "../posts/index.js";
const construct = constructor => args => globalThis.Reflect.construct(constructor, args);
const typeof$ = x => x === null ? "null" : typeof x;
const equals = this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that;
const filter = f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f);
const map = f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f);
const chain = f => x => (() => {
  switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, x, [])) {
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
const status = url => bichain(err => resolve({
  url,
  status: "XXX"
}))(res => resolve({
  url,
  status: res.status
}))(attemptP(() => fetch(url, {
  method: "HEAD",
  redirect: "manual"
})));
const bold = text => "\u001b[1m" + text + "\u001b[22m";
const invert = text => "\u001b[7m" + text + "\u001b[27m";
const red = text => "\u001b[31m" + text + "\u001b[0m";
const yellow = text => "\u001b[33m" + text + "\u001b[0m";
const cyan = text => "\u001b[36m" + text + "\u001b[0m";
const format = ({url, status}) => equals("string")(typeof$(status)) ? red(invert(bold(status)) + " " + url) : status >= 200 && status < 300 ? bold(status) + " " + url : status >= 300 && status < 400 ? yellow(bold(status) + " " + url) : status >= 400 && status < 500 ? red(bold(status) + " " + url) : cyan(bold(status) + " " + url);
const program = map($ => (args => target => target.join.apply(target, args))(["\n"])(map(format)($)))(parallel(16)(map(status)(S.sort(Array.from(construct(Set)([chain(links)(chain($ => $.body)(posts))]))))));
fork(console.error)(console.log)(program);
