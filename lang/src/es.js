export const SpreadElement = argument => ({
  type: 'SpreadElement',
  argument,
});

// 13.1 Identifiers

// https://262.ecma-international.org/13.0/#sec-keywords-and-reserved-words
export const RESERVED_WORDS = Reflect.construct(Set, [[
  // reserved words
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
  // future reserved words
  'enum',
  'implements',
  'interface',
  'package',
  'private',
  'protected',
  'public',
]]);

// 13.2.3 Literals

export const Literal = value => ({
  type: 'Literal',
  value,
});

// 13.2.4 Array Initializer

export const ArrayExpression = elements => ({
  type: 'ArrayExpression',
  elements,
});

// 13.2.5 Object Initializer

export const ObjectExpression = properties => ({
  type: 'ObjectExpression',
  properties,
});

export const Property = (key, value, options) => ({
  type: 'Property',
  key,
  value,
  kind: 'init',
  method: options?.method ?? false,
  shorthand: key.type === 'Identifier' && value.type === 'Identifier' && key.name === value.name,
  computed: options?.computed ?? false,
});

export const AssignmentProperty = (key, value, options) => ({
  type: 'Property',
  key,
  value,
  kind: 'init',
  method: options?.method ?? false,
  shorthand: options?.shorthand ?? false,
  computed: options?.computed ?? false,
});

// 13.2.8 Template Literals

export const TemplateLiteral = (
  quasis,
  expressions,
) => ({
  type: 'TemplateLiteral',
  quasis,
  expressions,
});

export const TemplateElement = (
  value,
  tail,
) => ({
  type: 'TemplateElement',
  value: {
    raw: value,
  },
  tail,
});

// 13.3.2 Property Accessors

export const MemberExpression = (object, property, options) => ({
  type: 'MemberExpression',
  object,
  property,
  computed: options?.computed ?? false,
  optional: options?.optional ?? false,
});

// 13.3.6 Function Calls

export const CallExpression = (callee, args, options) => ({
  type: 'CallExpression',
  callee,
  arguments: args,
  optional: options?.optional ?? false,
});

// 13.3.12 Meta Properties

export const MetaProperty = (meta, property) => ({
  type: 'MetaProperty',
  meta,
  property,
});

// 13.5 Unary Operators

export const UnaryExpression = (operator, argument) => ({
  type: 'UnaryExpression',
  operator,
  argument,
  prefix: true,
});

// 13.6 Exponentiation Operator
// 13.7 Multiplicative Operators
// 13.8 Additive Operators
// 13.9 Bitwise Shift Operators
// 13.10 Relational Operators
// 13.11 Equality Operators
// 13.12 Binary Bitwise Operators

export const BinaryExpression = (operator, left, right) => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

// 13.13 Binary Logical Operators

export const LogicalExpression = (operator, left, right) => ({
  type: 'LogicalExpression',
  operator,
  left,
  right,
});

// 13.14 Conditional Operator

export const ConditionalExpression = (test, consequent, alternate) => ({
  type: 'ConditionalExpression',
  test,
  consequent,
  alternate,
});

// 14.2 Block

export const BlockStatement = body => ({
  type: 'BlockStatement',
  body,
});

// 14.3 Declarations and the Variable Statement

export const VariableDeclaration = declarations => ({
  type: 'VariableDeclaration',
  kind: 'const',
  declarations,
});

export const VariableDeclarator = (id, init) => ({
  type: 'VariableDeclarator',
  id,
  init,
});

// 14.5 Expression Statement

export const ExpressionStatement = expression => ({
  type: 'ExpressionStatement',
  expression,
});

// 14.10 The return Statement

export const ReturnStatement = argument => ({
  type: 'ReturnStatement',
  argument,
});

// 15.3 Arrow Function Definitions

export const ArrowFunctionExpression = (params, body) => ({
  type: 'ArrowFunctionExpression',
  params,
  body,
  expression: body.type !== 'BlockStatement',
});

export const ArrayPattern = elements => ({
  type: 'ArrayPattern',
  elements,
});

export const ObjectPattern = properties => ({
  type: 'ObjectPattern',
  properties,
});

export const AssignmentPattern = (left, right) => ({
  type: 'AssignmentPattern',
  left,
  right,
});

export const RestElement = argument => ({
  type: 'RestElement',
  argument,
});

// 16.2 Modules

export const Program = body => ({
  type: 'Program',
  sourceType: 'module',
  body,
});

// 16.2.2 Imports

export const ImportDeclaration = (specifiers, source) => ({
  type: 'ImportDeclaration',
  specifiers,
  source: Literal(source),
});

export const ImportDefaultSpecifier = local => ({
  type: 'ImportDefaultSpecifier',
  local,
});

export const ImportNamespaceSpecifier = local => ({
  type: 'ImportNamespaceSpecifier',
  local,
});

export const ImportSpecifier = (local, imported) => ({
  type: 'ImportSpecifier',
  local,
  imported,
});

// 16.2.3 Exports

export const ExportNamedDeclaration = specifiers => ({
  type: 'ExportNamedDeclaration',
  specifiers,
});

export const ExportSpecifier = (local, exported = local) => ({
  type: 'ExportSpecifier',
  local,
  exported,
});

export const ExportDefaultDeclaration = declaration => ({
  type: 'ExportDefaultDeclaration',
  declaration,
});
