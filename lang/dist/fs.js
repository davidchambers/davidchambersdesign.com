import fs from "node:fs/promises";
import {attemptP} from "fluture";
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
const mkdir = options => path => attemptP(() => apply([path, options])(fs.mkdir));
const readFile = filename => attemptP(() => apply([filename, "utf8"])(fs.readFile));
const writeFile = filename => data => attemptP(() => apply([filename, data])(fs.writeFile));
export {mkdir, readFile, writeFile};
