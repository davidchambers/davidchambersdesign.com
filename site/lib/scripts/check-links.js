import {attemptP, bichain, fork, parallel, resolve} from "fluture";
import S from "sanctuary";
import posts from "../posts/index.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
const absolute$003F = url => url.startsWith("http:") || url.startsWith("https:");
const links = node => node.name === "a" ? [node.attributes.href].filter(absolute$003F) : ("children" in node) ? Prelude.chain(links)(node.children) : [];
const status = url => bichain(err => resolve({
  url,
  status: err.cause.code
}))(res => resolve({
  url,
  status: res.status
}))(attemptP(() => fetch(url, {
  method: "HEAD",
  redirect: "manual"
})));
const bold = text => `\x1B[1m${text}\x1B[22m`;
const invert = text => `\x1B[7m${text}\x1B[27m`;
const red = text => `\x1B[31m${text}\x1B[0m`;
const yellow = text => `\x1B[33m${text}\x1B[0m`;
const cyan = text => `\x1B[36m${text}\x1B[0m`;
const format = ({url, status}) => (() => {
  const padding = x => (" ").repeat(S.max(0)(15 - `${x}`.length));
  const normal = s => s;
  return (discriminant => {
    switch (true) {
      case typeof status === "string":
        return red(`${padding(status)} ${invert(bold(status))} ${url}`);
      case status >= 200 && status < 300:
        return `${padding(status)} ${normal(bold(status))} ${url}`;
      case status >= 300 && status < 400:
        return yellow(`${padding(status)} ${normal(bold(status))} ${url}`);
      case status >= 400 && status < 500:
        return red(`${padding(status)} ${normal(bold(status))} ${url}`);
      default:
        return cyan(`${padding(status)} ${normal(bold(status))} ${url}`);
    }
  })(true);
})();
const program = (links => map(S.joinWith("\n"))(map(map(format))(parallel(16)(map(status)(S.sort(Array.from(Reflect.construct(Set, [links]))))))))(Prelude.chain(links)(Prelude.chain(x => x.body)(posts)));
fork(console.error)(console.log)(program);
