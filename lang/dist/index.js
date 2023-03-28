import {attempt} from "fluture";
import Node from "./Node.js";
import esModuleFromSerifModule from "./codegen.js";
import * as grammar from "./grammar.js";
import rewrite from "./rewrite.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  flip: f => y => x => f(x)(y),
  id: x => x,
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  match: type => type[Symbol.for("match")],
  not: b => !b,
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  reject: predicate => Prelude.filter(x => !predicate(x))
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, id, map, match, not, reduce, reduceRight, reject} = Prelude;
const parse = filename => sourceText => attempt(() => apply([sourceText, {
  grammarSource: filename
}])(grammar.parse));
const changeExtensionInImportDeclaration = ({source, specifiers}) => (() => {
  const source$0027 = Node.StringLiteral(Prelude._apply("replace")([RegExp("[.]serif$"), ".js"])(source.value));
  return Node.ImportDeclaration(source$0027)(specifiers);
})();
const changeExtensions = ({imports, exports, statements}) => Node.Module(Prelude.map(changeExtensionInImportDeclaration)(imports))(exports)(statements);
const trans = module => namesExportedFrom => Prelude.map(x => esModuleFromSerifModule(changeExtensions(x)))(rewrite(module)(namesExportedFrom));
export {parse, rewrite, changeExtensions, esModuleFromSerifModule, trans};
