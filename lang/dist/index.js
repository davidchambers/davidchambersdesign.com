import {attempt} from "fluture";
import esModuleFromSerifModule from "./codegen.js";
import * as grammar from "./grammar.js";
import rewrite from "./rewrite.js";
import {NullLiteral, BooleanLiteral, NumberLiteral, StringLiteral, TemplateLiteral, MemberExpression, IdentifierPlaceholder, Identifier, SpreadElement, ArrayExpression, Property, ObjectExpression, ArrayPattern, Elision, ObjectPattern, RestElement, ArrowFunctionExpression, PropertyAccessor, BlockExpression, UnaryExpression, CompositionExpression, BinaryExpression, MapExpression, BindExpression, LogicalExpression, ConditionalExpression, SwitchExpression, SwitchCase, PipeExpression, MethodCallExpression, CallExpression, ImportDeclaration, ImportAllDeclaration, ImportDefaultSpecifier, ImportSpecifier, ImportNamespaceSpecifier, ExportNamedDeclaration, ExportDefaultDeclaration, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Module} from "./types.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b,
  reject: predicate => Prelude.filter(x => !predicate(x))
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, map, not, reject} = Prelude;
const parse = filename => sourceText => attempt(() => apply([sourceText, {
  grammarSource: filename
}])(grammar.parse));
const changeExtensionInImportDeclaration = ({source, specifiers}) => (() => {
  const source$0027 = StringLiteral(Prelude._apply("replace")([RegExp("[.]serif$"), ".js"])(source.value));
  return ImportDeclaration(source$0027)(specifiers);
})();
const changeExtensions = ({imports, exports, statements}) => Module({
  imports: Prelude.map(changeExtensionInImportDeclaration)(imports),
  exports,
  statements
});
const trans = module => namesExportedFrom => Prelude.map(x => esModuleFromSerifModule(changeExtensions(x)))(rewrite(module)(namesExportedFrom));
export {parse, rewrite, changeExtensions, esModuleFromSerifModule, trans};
