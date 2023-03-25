import {NullLiteral, BooleanLiteral, NumberLiteral, StringLiteral, TemplateLiteral, MetaProperty, MemberExpression, IdentifierPlaceholder, Identifier, SpreadElement, ArrayExpression, Property, ObjectExpression, ArrayPattern, Elision, ObjectPattern, RestElement, ArrowFunctionExpression, PropertyAccessor, BlockExpression, UnaryExpression, CompositionExpression, BinaryExpression, MapExpression, BindExpression, LogicalExpression, ConditionalExpression, SwitchExpression, SwitchCase, PipeExpression, CallExpression, ImportExpression, ImportDeclaration, ImportEverythingDeclaration, ImportDefaultSpecifier, ImportSpecifier, ImportNamespaceSpecifier, ExportNamedDeclaration, ExportDefaultDeclaration, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Module} from "./types.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {} = Prelude;
const isArray = name => CallExpression(MemberExpression(Identifier("Array"))(StringLiteral("isArray")))([Identifier(name)]);
const isString = name => BinaryExpression("is")(UnaryExpression("typeof")(Identifier(name)))(StringLiteral("string"));
const not = ArrowFunctionExpression([Identifier("b")])(UnaryExpression("!")(Identifier("b")));
const concat = ArrowFunctionExpression([Identifier("this")])(ArrowFunctionExpression([Identifier("that")])(ConditionalExpression(LogicalExpression("or")(isArray("this"))(isString("this")))(CallExpression(MemberExpression(Identifier("this"))(StringLiteral("concat")))([Identifier("that")]))(CallExpression(MemberExpression(Identifier("this"))(StringLiteral("fantasy-land/concat")))([Identifier("that")]))));
const map = ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("functor")])(ConditionalExpression(isArray("functor"))(CallExpression(MemberExpression(Identifier("functor"))(StringLiteral("map")))([ArrowFunctionExpression([Identifier("x")])(CallExpression(Identifier("f"))([Identifier("x")]))]))(CallExpression(MemberExpression(Identifier("functor"))(StringLiteral("fantasy-land/map")))([Identifier("f")]))));
const chain = ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("chain")])(ConditionalExpression(isArray("chain"))(CallExpression(MemberExpression(Identifier("chain"))(StringLiteral("flatMap")))([ArrowFunctionExpression([Identifier("x")])(CallExpression(Identifier("f"))([Identifier("x")]))]))(CallExpression(MemberExpression(Identifier("chain"))(StringLiteral("fantasy-land/chain")))([Identifier("f")]))));
export {not, concat, map, chain};
