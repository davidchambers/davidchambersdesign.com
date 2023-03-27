const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, construct, flip, map, not} = Prelude;
const NullLiteral = {
  type: "NullLiteral"
};
const BooleanLiteral = value => ({
  type: "BooleanLiteral",
  value
});
const NumberLiteral = value => ({
  type: "NumberLiteral",
  value
});
const StringLiteral = value => ({
  type: "StringLiteral",
  value
});
const TemplateLiteral = quasis => expressions => ({
  type: "TemplateLiteral",
  quasis,
  expressions
});
const MemberExpression = object => property => ({
  type: "MemberExpression",
  object,
  property
});
const IdentifierPlaceholder = desiredName => ({
  type: "IdentifierPlaceholder",
  desiredName
});
const Identifier = name => ({
  type: "Identifier",
  name
});
const SpreadElement = argument => ({
  type: "SpreadElement",
  argument
});
const ArrayExpression = elements => ({
  type: "ArrayExpression",
  elements
});
const Property = key => value => ({
  type: "Property",
  key,
  value
});
const ObjectExpression = properties => ({
  type: "ObjectExpression",
  properties
});
const ArrayPattern = elements => ({
  type: "ArrayPattern",
  elements
});
const Elision = {
  type: "Elision"
};
const ObjectPattern = properties => ({
  type: "ObjectPattern",
  properties
});
const RestElement = argument => ({
  type: "RestElement",
  argument
});
const ArrowFunctionExpression = parameters => body => ({
  type: "ArrowFunctionExpression",
  parameters,
  body
});
const PropertyAccessor = identifier => ({
  type: "PropertyAccessor",
  identifier
});
const BlockExpression = statements => ({
  type: "BlockExpression",
  statements
});
const UnaryExpression = operator => argument => ({
  type: "UnaryExpression",
  operator,
  argument
});
const CompositionExpression = left => right => ({
  type: "CompositionExpression",
  left,
  right
});
const BinaryExpression = operator => left => right => ({
  type: "BinaryExpression",
  operator,
  left,
  right
});
const MapExpression = left => right => ({
  type: "MapExpression",
  left,
  right
});
const BindExpression = left => right => ({
  type: "BindExpression",
  left,
  right
});
const LogicalExpression = operator => left => right => ({
  type: "LogicalExpression",
  operator,
  left,
  right
});
const ConditionalExpression = predicate => consequent => alternative => ({
  type: "ConditionalExpression",
  predicate,
  consequent,
  alternative
});
const SwitchExpression = discriminant => cases => default$ => ({
  type: "SwitchExpression",
  discriminant,
  cases,
  default: default$
});
const SwitchCase = predicates => consequent => ({
  type: "SwitchCase",
  predicates,
  consequent
});
const PipeExpression = head => body => ({
  type: "PipeExpression",
  head,
  body
});
const MethodCallExpression = name => ({
  type: "MethodCallExpression",
  name
});
const CallExpression = callee => args => ({
  type: "CallExpression",
  callee,
  arguments: args
});
const ImportDeclaration = source => specifiers => ({
  type: "ImportDeclaration",
  source,
  specifiers
});
const ImportAllDeclaration = source => hiding => ({
  type: "ImportAllDeclaration",
  source,
  hiding
});
const ImportDefaultSpecifier = local => ({
  type: "ImportDefaultSpecifier",
  local
});
const ImportSpecifier = local => imported => ({
  type: "ImportSpecifier",
  local,
  imported
});
const ImportNamespaceSpecifier = local => ({
  type: "ImportNamespaceSpecifier",
  local
});
const ExportNamedDeclaration = specifiers => ({
  type: "ExportNamedDeclaration",
  specifiers
});
const ExportDefaultDeclaration = declaration => ({
  type: "ExportDefaultDeclaration",
  declaration
});
const VariableDeclaration = pattern => expression => ({
  type: "VariableDeclaration",
  pattern,
  expression
});
const FunctionDeclaration = name => parameters => body => ({
  type: "FunctionDeclaration",
  name,
  parameters,
  body
});
const ExpressionStatement = expression => ({
  type: "ExpressionStatement",
  expression
});
const Module = ({imports, exports, statements}) => ({
  type: "Module",
  imports,
  exports,
  statements
});
export {NullLiteral, BooleanLiteral, NumberLiteral, StringLiteral, TemplateLiteral, MemberExpression, IdentifierPlaceholder, Identifier, SpreadElement, ArrayExpression, Property, ObjectExpression, ArrayPattern, Elision, ObjectPattern, RestElement, ArrowFunctionExpression, PropertyAccessor, BlockExpression, UnaryExpression, CompositionExpression, BinaryExpression, MapExpression, BindExpression, LogicalExpression, ConditionalExpression, SwitchExpression, SwitchCase, PipeExpression, MethodCallExpression, CallExpression, ImportDeclaration, ImportAllDeclaration, ImportDefaultSpecifier, ImportSpecifier, ImportNamespaceSpecifier, ExportNamedDeclaration, ExportDefaultDeclaration, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Module};
