const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
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
const MetaProperty = meta => property => ({
  type: "MetaProperty",
  meta,
  property
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
const CallExpression = callee => args => ({
  type: "CallExpression",
  callee,
  arguments: args
});
const ImportExpression = source => ({
  type: "ImportExpression",
  source
});
const ImportDeclaration = source => specifiers => ({
  type: "ImportDeclaration",
  source,
  specifiers
});
const ImportEverythingDeclaration = source => hiding => ({
  type: "ImportDeclaration",
  source,
  specifiers: "*",
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
export {NullLiteral, BooleanLiteral, NumberLiteral, StringLiteral, TemplateLiteral, MetaProperty, MemberExpression, IdentifierPlaceholder, Identifier, SpreadElement, ArrayExpression, Property, ObjectExpression, ArrayPattern, Elision, ObjectPattern, RestElement, ArrowFunctionExpression, PropertyAccessor, BlockExpression, UnaryExpression, CompositionExpression, BinaryExpression, MapExpression, BindExpression, LogicalExpression, ConditionalExpression, SwitchExpression, SwitchCase, PipeExpression, CallExpression, ImportExpression, ImportDeclaration, ImportEverythingDeclaration, ImportDefaultSpecifier, ImportSpecifier, ImportNamespaceSpecifier, ExportNamedDeclaration, ExportDefaultDeclaration, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Module};
