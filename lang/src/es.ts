import type * as ES from 'estree';


export const SpreadElement = (
  argument: ES.Expression,
): ES.SpreadElement => ({
  type: 'SpreadElement',
  argument,
});

// 13.1 Identifiers

// 13.2.3 Literals

export const Literal = (
  value: null | boolean | number | string,
): ES.Literal => ({
  type: 'Literal',
  value,
});

// 13.2.4 Array Initializer

export const ArrayExpression = (
  elements: Array<ES.Expression | ES.SpreadElement>,
): ES.ArrayExpression => ({
  type: 'ArrayExpression',
  elements,
});

// 13.2.5 Object Initializer

export const ObjectExpression = (
  properties: Array<ES.Property | ES.SpreadElement>,
): ES.ObjectExpression => ({
  type: 'ObjectExpression',
  properties,
});

export const Property = (
  key: ES.Expression,
  value: ES.Expression,
  options?: {method?: boolean; shorthand?: boolean; computed?: boolean}
): ES.Property => ({
  type: 'Property',
  key,
  value,
  kind: 'init',
  method: options?.method ?? false,
  shorthand: options?.shorthand ?? false,
  computed: options?.computed ?? false,
});

// 13.3.2 Property Accessors

export const MemberExpression = (
  object: ES.Expression,
  property: ES.Expression,
  options?: {computed?: boolean; optional?: boolean}
): ES.MemberExpression => ({
  type: 'MemberExpression',
  object,
  property,
  computed: options?.computed ?? false,
  optional: options?.optional ?? false,
});

// 13.3.5 The new Operator

export const NewExpression = (
  callee: ES.Expression,
  args: Array<ES.Expression | ES.SpreadElement>,
): ES.NewExpression => ({
  type: 'NewExpression',
  callee,
  arguments: args,
});

// 13.3.6 Function Calls

export const CallExpression = (
  callee: ES.Expression,
  args: Array<ES.Expression | ES.SpreadElement>,
  options?: {optional?: boolean}
): ES.CallExpression => ({
  type: 'CallExpression',
  callee,
  arguments: args,
  optional: options?.optional ?? false,
});

// 13.3.12 Meta Properties

export const MetaProperty = (
  meta: ES.Identifier,
  property: ES.Identifier,
): ES.MetaProperty => ({
  type: 'MetaProperty',
  meta,
  property,
});

// 13.5 Unary Operators

export const UnaryExpression = (
  operator: ES.UnaryOperator,
  argument: ES.Expression,
): ES.UnaryExpression => ({
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

export const BinaryExpression = (
  operator: ES.BinaryOperator,
  left: ES.Expression,
  right: ES.Expression,
): ES.BinaryExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

// 13.13 Binary Logical Operators

export const LogicalExpression = (
  operator: ES.LogicalOperator,
  left: ES.Expression,
  right: ES.Expression,
): ES.LogicalExpression => ({
  type: 'LogicalExpression',
  operator,
  left,
  right,
});

// 13.14 Conditional Operator

export const ConditionalExpression = (
  test: ES.Expression,
  consequent: ES.Expression,
  alternate: ES.Expression,
): ES.ConditionalExpression => ({
  type: 'ConditionalExpression',
  test,
  consequent,
  alternate,
});

// 14.2 Block

export const BlockStatement = (
  body: Array<ES.Statement>,
): ES.BlockStatement => ({
  type: 'BlockStatement',
  body,
});

// 14.3 Declarations and the Variable Statement

export const VariableDeclaration = (
  declarations: Array<ES.VariableDeclarator>,
): ES.VariableDeclaration => ({
  type: 'VariableDeclaration',
  kind: 'const',
  declarations,
});

export const VariableDeclarator = (
  id: ES.Pattern,
  init: ES.Expression,
): ES.VariableDeclarator => ({
  type: 'VariableDeclarator',
  id,
  init,
});

// 14.5 Expression Statement

export const ExpressionStatement = (
  expression: ES.Expression,
): ES.ExpressionStatement => ({
  type: 'ExpressionStatement',
  expression,
});

// 14.10 The return Statement

export const ReturnStatement = (
  argument: ES.Expression,
): ES.ReturnStatement => ({
  type: 'ReturnStatement',
  argument,
});

// 14.12 The switch Statement

export const SwitchStatement = (
  discriminant: ES.Expression,
  cases: Array<ES.SwitchCase>,
): ES.SwitchStatement => ({
  type: 'SwitchStatement',
  discriminant,
  cases,
});

export const SwitchCase = (
  test: ES.Expression | null,
  consequent: Array<ES.Statement>,
): ES.SwitchCase => ({
  type: 'SwitchCase',
  test,
  consequent,
});

// 15.2 Function Definitions

export const FunctionExpression = (
  id: ES.Identifier,
  params: Array<ES.Pattern>,
  body: ES.BlockStatement,
): ES.FunctionExpression => ({
  type: 'FunctionExpression',
  id,
  params,
  body,
});

// 15.3 Arrow Function Definitions

export const ArrowFunctionExpression = (
  params: Array<ES.Pattern>,
  body: ES.BlockStatement | ES.Expression,
): ES.ArrowFunctionExpression => ({
  type: 'ArrowFunctionExpression',
  params,
  body,
  expression: body.type !== 'BlockStatement',
});

// 16.2 Modules

export const Program = (
  body: Array<ES.ModuleDeclaration | ES.Statement>,
): ES.Program => ({
  type: 'Program',
  sourceType: 'module',
  body,
});

// 16.2.2 Imports

export const ImportDeclaration = (
  specifiers: Array<
    | ES.ImportDefaultSpecifier
    | ES.ImportNamespaceSpecifier
    | ES.ImportSpecifier
  >,
  source: string,
): ES.ImportDeclaration => ({
  type: 'ImportDeclaration',
  specifiers,
  source: Literal(source),
});

export const ImportDefaultSpecifier = (
  local: ES.Identifier,
): ES.ImportDefaultSpecifier => ({
  type: 'ImportDefaultSpecifier',
  local,
});

export const ImportSpecifier = (
  local: ES.Identifier,
  imported: ES.Identifier,
): ES.ImportSpecifier => ({
  type: 'ImportSpecifier',
  local,
  imported,
});

// 16.2.3 Exports

export const ExportNamedDeclaration = (
  specifiers: Array<ES.ExportSpecifier>,
): ES.ExportNamedDeclaration => ({
  type: 'ExportNamedDeclaration',
  specifiers,
});

export const ExportSpecifier = (
  local: ES.Identifier,
  exported: ES.Identifier = local,
): ES.ExportSpecifier => ({
  type: 'ExportSpecifier',
  local,
  exported,
});

export const ExportDefaultDeclaration = (
  declaration: ES.Declaration | ES.Expression,
): ES.ExportDefaultDeclaration => ({
  type: 'ExportDefaultDeclaration',
  declaration,
});
