import {NullLiteral, BooleanLiteral, NumberLiteral, StringLiteral, TemplateLiteral, MetaProperty, MemberExpression, IdentifierPlaceholder, Identifier, SpreadElement, ArrayExpression, Property, ObjectExpression, ArrayPattern, Elision, ObjectPattern, RestElement, ArrowFunctionExpression, PropertyAccessor, BlockExpression, UnaryExpression, CompositionExpression, BinaryExpression, MapExpression, BindExpression, LogicalExpression, ConditionalExpression, SwitchExpression, SwitchCase, PipeExpression, MethodCallExpression, CallExpression, ImportExpression, ImportDeclaration, ImportEverythingDeclaration, ImportDefaultSpecifier, ImportSpecifier, ImportNamespaceSpecifier, ExportNamedDeclaration, ExportDefaultDeclaration, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Module} from "./types.js";
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
const {} = Prelude;
const isArray = name => CallExpression(MemberExpression(Identifier("Array"))(StringLiteral("isArray")))([Identifier(name)]);
const isString = name => BinaryExpression("is")(UnaryExpression("typeof")(Identifier(name)))(StringLiteral("string"));
const _apply = ArrowFunctionExpression([Identifier("name")])(ArrowFunctionExpression([Identifier("args")])(ArrowFunctionExpression([Identifier("target")])(CallExpression(MemberExpression(MemberExpression(Identifier("target"))(Identifier("name")))(StringLiteral("apply")))([Identifier("target"), Identifier("args")]))));
const apply = ArrowFunctionExpression([Identifier("args")])(ArrowFunctionExpression([Identifier("target")])(CallExpression(MemberExpression(Identifier("target"))(StringLiteral("apply")))([Identifier("target"), Identifier("args")])));
const const_ = ArrowFunctionExpression([Identifier("x")])(ArrowFunctionExpression([Identifier("y")])(Identifier("x")));
const not = ArrowFunctionExpression([Identifier("b")])(UnaryExpression("!")(Identifier("b")));
const concat = ArrowFunctionExpression([Identifier("this")])(ArrowFunctionExpression([Identifier("that")])(ConditionalExpression(LogicalExpression("or")(isArray("this"))(isString("this")))(CallExpression(MemberExpression(Identifier("this"))(StringLiteral("concat")))([Identifier("that")]))(CallExpression(MemberExpression(Identifier("this"))(StringLiteral("fantasy-land/concat")))([Identifier("that")]))));
const map = ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("functor")])(ConditionalExpression(isArray("functor"))(CallExpression(MemberExpression(Identifier("functor"))(StringLiteral("map")))([ArrowFunctionExpression([Identifier("x")])(CallExpression(Identifier("f"))([Identifier("x")]))]))(CallExpression(MemberExpression(Identifier("functor"))(StringLiteral("fantasy-land/map")))([Identifier("f")]))));
const flip = ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("y")])(ArrowFunctionExpression([Identifier("x")])(CallExpression(CallExpression(Identifier("f"))([Identifier("x")]))([Identifier("y")]))));
const chain = ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("chain")])(ConditionalExpression(isArray("chain"))(CallExpression(MemberExpression(Identifier("chain"))(StringLiteral("flatMap")))([ArrowFunctionExpression([Identifier("x")])(CallExpression(Identifier("f"))([Identifier("x")]))]))(CallExpression(MemberExpression(Identifier("chain"))(StringLiteral("fantasy-land/chain")))([Identifier("f")]))));
export {_apply, apply, const_, not, concat, map, flip, chain};
