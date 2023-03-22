export const BooleanLiteral = value => ({
  type: 'BooleanLiteral',
  value,
});

export const NumberLiteral = value => ({
  type: 'NumberLiteral',
  value,
});

export const StringLiteral = value => ({
  type: 'StringLiteral',
  value,
});

export const TemplateElement = tail => raw => ({
  type: 'TemplateElement',
  tail,
  raw,
});

export const TemplateLiteral = quasis => expressions => ({
  type: 'TemplateLiteral',
  quasis,
  expressions,
});

export const MetaProperty = meta => property => ({
  type: 'MetaProperty',
  meta,
  property,
});

export const MemberExpression = object => property => ({
  type: 'MemberExpression',
  object,
  property,
});

export const Identifier = name => ({
  type: 'Identifier',
  name,
});

export const SpreadElement = argument => ({
  type: 'SpreadElement',
  argument,
});

export const ArrayExpression = elements => ({
  type: 'ArrayExpression',
  elements,
});

export const Property = key => value => ({
  type: 'Property',
  key,
  value,
});

export const ObjectExpression = properties => ({
  type: 'ObjectExpression',
  properties,
});

export const ArrayPattern = elements => ({
  type: 'ArrayPattern',
  elements,
});

export const ObjectPattern = properties => ({
  type: 'ObjectPattern',
  properties,
});

export const RestElement = argument => ({
  type: 'RestElement',
  argument,
});

export const ArrowFunctionExpression = parameters => body => ({
  type: 'ArrowFunctionExpression',
  parameters,
  body,
});

export const PropertyAccessor = identifier => ({
  type: 'PropertyAccessor',
  identifier,
});

export const BlockExpression = statements => ({
  type: 'BlockExpression',
  statements,
});

export const UnaryExpression = operator => argument => ({
  type: 'UnaryExpression',
  operator,
  argument,
});

export const BinaryExpression = operator => left => right => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export const MapExpression = left => right => ({
  type: 'MapExpression',
  left,
  right,
});

export const BindExpression = left => right => ({
  type: 'BindExpression',
  left,
  right,
});

export const LogicalExpression = operator => left => right => ({
  type: 'LogicalExpression',
  operator,
  left,
  right,
});

export const ConditionalExpression = predicate => consequent => alternative => ({
  type: 'ConditionalExpression',
  predicate,
  consequent,
  alternative,
});

export const PipeExpression = head => body => ({
  type: 'PipeExpression',
  head,
  body,
});

export const CallExpression = callee => args => ({
  type: 'CallExpression',
  callee,
  arguments: args,
});

export const ImportDefaultDeclaration = source => specifier => ({
  type: 'ImportDeclaration',
  source,
  specifiers: [specifier],
});

export const ImportDeclaration = source => specifiers => ({
  type: 'ImportDeclaration',
  source,
  specifiers,
});

export const ImportEverythingDeclaration = source => hiding => ({
  type: 'ImportDeclaration',
  source,
  specifiers: '*',
  hiding,
});

export const ImportDefaultSpecifier = local => ({
  type: 'ImportDefaultSpecifier',
  local,
});

export const ImportSpecifier = local => imported => ({
  type: 'ImportSpecifier',
  local,
  imported,
});

export const ImportNamespaceSpecifier = local => ({
  type: 'ImportNamespaceSpecifier',
  local,
});

export const ExportNamedDeclaration = specifiers => ({
  type: 'ExportNamedDeclaration',
  specifiers,
});

export const ExportDefaultDeclaration = declaration => ({
  type: 'ExportDefaultDeclaration',
  declaration,
});

export const VariableDeclaration = pattern => expression => ({
  type: 'VariableDeclaration',
  pattern,
  expression,
});

export const FunctionDeclaration = name => parameters => body => ({
  type: 'FunctionDeclaration',
  name,
  parameters,
  body,
});

export const ExpressionStatement = expression => ({
  type: 'ExpressionStatement',
  expression,
});

export const Module = ({imports, exports, statements}) => ({
  type: 'Module',
  imports,
  exports,
  statements,
});
