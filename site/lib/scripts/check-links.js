import {attemptP, bichain, fork, parallel, resolve} from "fluture";
import S from "sanctuary";
import * as Set from "../Set.js";
import posts from "../posts/index.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, flip, map, not} = Prelude;
const absolute$003F = url => url.startsWith("http:") || url.startsWith("https:");
const links = node => Object.is("a", node.name) ? [node.attributes.href].filter(absolute$003F) : ("children" in node) ? Prelude.chain(links)(node.children) : [];
const status = url => bichain(err => resolve({
  url,
  status: err.cause.code
}))(res => resolve({
  url,
  status: res.status
}))(attemptP(() => apply([url, {
  method: "HEAD",
  redirect: "manual"
}])(fetch)));
const bold = text => `\x1B[1m${text}\x1B[22m`;
const invert = text => `\x1B[7m${text}\x1B[27m`;
const red = text => `\x1B[31m${text}\x1B[0m`;
const yellow = text => `\x1B[33m${text}\x1B[0m`;
const cyan = text => `\x1B[36m${text}\x1B[0m`;
const format = ({url, status}) => (() => {
  const padding = x => (" ").repeat(S.max(0)(15 - `${x}`.length));
  const normal = s => s;
  return (() => {
    switch (true) {
      case Object.is("string", typeof status):
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
  })();
})();
const program = map(S.joinWith("\n"))(map(map(format))(parallel(16)(map(status)(S.sort(Array.from(Set.from(Prelude.chain(links)(Prelude.chain(x => x.body)(posts)))))))));
fork(console.error)(console.log)(program);
