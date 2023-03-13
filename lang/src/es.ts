import type * as ES from 'estree';


export type Declaration = ES.Declaration;
export type Expression = ES.Expression;
export type Pattern = ES.Pattern;
export type Statement = ES.Statement;

export type SpreadElement = ES.SpreadElement;

export const SpreadElement = (
  argument: Expression,
): SpreadElement => ({
  type: 'SpreadElement',
  argument,
});

// 13.1 Identifiers

export type Identifier = ES.Identifier;

// 13.2.3 Literals

export type Literal = ES.Literal;

export const Literal = (
  value: null | boolean | number | string,
): Literal => ({
  type: 'Literal',
  value,
});

// 13.2.4 Array Initializer

export type ArrayExpression = ES.ArrayExpression;

export const ArrayExpression = (
  elements: Array<Expression | SpreadElement>,
): ArrayExpression => ({
  type: 'ArrayExpression',
  elements,
});

// 13.2.5 Object Initializer

export type ObjectExpression = ES.ObjectExpression;

export const ObjectExpression = (
  properties: Array<Property | SpreadElement>,
): ObjectExpression => ({
  type: 'ObjectExpression',
  properties,
});

export type Property = ES.Property;

export const Property = (
  key: Expression,
  value: Expression,
  options?: {method?: boolean; shorthand?: boolean; computed?: boolean}
): Property => ({
  type: 'Property',
  key,
  value,
  kind: 'init',
  method: options?.method ?? false,
  shorthand: options?.shorthand ?? false,
  computed: options?.computed ?? false,
});

// 13.3.2 Property Accessors

export type MemberExpression = ES.MemberExpression;

export const MemberExpression = (
  object: Expression,
  property: Expression,
  options?: {computed?: boolean; optional?: boolean}
): MemberExpression => ({
  type: 'MemberExpression',
  object,
  property,
  computed: options?.computed ?? false,
  optional: options?.optional ?? false,
});

// 13.3.5 The new Operator

export type NewExpression = ES.NewExpression;

export const NewExpression = (
  callee: Expression,
  args: Array<Expression | SpreadElement>,
): NewExpression => ({
  type: 'NewExpression',
  callee,
  arguments: args,
});

// 13.3.6 Function Calls

export type CallExpression = ES.CallExpression;

export const CallExpression = (
  callee: Expression,
  args: Array<Expression | SpreadElement>,
  options?: {optional?: boolean}
): CallExpression => ({
  type: 'CallExpression',
  callee,
  arguments: args,
  optional: options?.optional ?? false,
});

// 13.3.12 Meta Properties

export type MetaProperty = ES.MetaProperty;

export const MetaProperty = (
  meta: Identifier,
  property: Identifier,
): MetaProperty => ({
  type: 'MetaProperty',
  meta,
  property,
});

// 13.5 Unary Operators

export type UnaryOperator = ES.UnaryOperator;
export type UnaryExpression = ES.UnaryExpression;

export const UnaryExpression = (
  operator: UnaryOperator,
  argument: Expression,
): UnaryExpression => ({
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

export type BinaryOperator = ES.BinaryOperator;
export type BinaryExpression = ES.BinaryExpression;

export const BinaryExpression = (
  operator: BinaryOperator,
  left: Expression,
  right: Expression,
): BinaryExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

// 13.13 Binary Logical Operators

export type LogicalOperator = ES.LogicalOperator;
export type LogicalExpression = ES.LogicalExpression;

export const LogicalExpression = (
  operator: LogicalOperator,
  left: Expression,
  right: Expression,
): LogicalExpression => ({
  type: 'LogicalExpression',
  operator,
  left,
  right,
});

// 13.14 Conditional Operator

export type ConditionalExpression = ES.ConditionalExpression;

export const ConditionalExpression = (
  test: Expression,
  consequent: Expression,
  alternate: Expression,
): ConditionalExpression => ({
  type: 'ConditionalExpression',
  test,
  consequent,
  alternate,
});

// 14.2 Block

export type BlockStatement = ES.BlockStatement;

export const BlockStatement = (
  body: Array<Statement>,
): BlockStatement => ({
  type: 'BlockStatement',
  body,
});

// 14.3 Declarations and the Variable Statement

export type VariableDeclaration = ES.VariableDeclaration;

export const VariableDeclaration = (
  declarations: Array<VariableDeclarator>,
): VariableDeclaration => ({
  type: 'VariableDeclaration',
  kind: 'const',
  declarations,
});

export type VariableDeclarator = ES.VariableDeclarator;

export const VariableDeclarator = (
  id: Pattern,
  init: Expression,
): VariableDeclarator => ({
  type: 'VariableDeclarator',
  id,
  init,
});

// 14.5 Expression Statement

export type ExpressionStatement = ES.ExpressionStatement;

export const ExpressionStatement = (
  expression: Expression,
): ExpressionStatement => ({
  type: 'ExpressionStatement',
  expression,
});

// 14.10 The return Statement

export type ReturnStatement = ES.ReturnStatement;

export const ReturnStatement = (
  argument: Expression,
): ReturnStatement => ({
  type: 'ReturnStatement',
  argument,
});

// 15.2 Function Definitions

export type FunctionExpression = ES.FunctionExpression;

export const FunctionExpression = (
  id: Identifier,
  params: Array<Pattern>,
  body: BlockStatement,
): FunctionExpression => ({
  type: 'FunctionExpression',
  id,
  params,
  body,
});

// 15.3 Arrow Function Definitions

export type ArrowFunctionExpression = ES.ArrowFunctionExpression;

export const ArrowFunctionExpression = (
  params: Array<Pattern>,
  body: BlockStatement | Expression,
): ArrowFunctionExpression => ({
  type: 'ArrowFunctionExpression',
  params,
  body,
  expression: body.type !== 'BlockStatement',
});

// 16.2 Modules

export type ModuleDeclaration = ES.ModuleDeclaration;
export type Program = ES.Program;

export const Program = (
  body: Array<ModuleDeclaration | Statement>,
): Program => ({
  type: 'Program',
  sourceType: 'module',
  body,
});

// 16.2.2 Imports

export type ImportDeclaration = ES.ImportDeclaration;

export const ImportDeclaration = (
  specifiers: Array<
    | ES.ImportDefaultSpecifier
    | ES.ImportNamespaceSpecifier
    | ES.ImportSpecifier
  >,
  source: string,
): ImportDeclaration => ({
  type: 'ImportDeclaration',
  specifiers,
  source: Literal(source),
});

export type ImportDefaultSpecifier = ES.ImportDefaultSpecifier;

export const ImportDefaultSpecifier = (
  local: Identifier,
): ImportDefaultSpecifier => ({
  type: 'ImportDefaultSpecifier',
  local,
});

export type ImportSpecifier = ES.ImportSpecifier;

export const ImportSpecifier = (
  local: Identifier,
  imported: Identifier,
): ImportSpecifier => ({
  type: 'ImportSpecifier',
  local,
  imported,
});

// 16.2.3 Exports

export type ExportNamedDeclaration = ES.ExportNamedDeclaration;

export const ExportNamedDeclaration = (
  specifiers: Array<ExportSpecifier>,
): ExportNamedDeclaration => ({
  type: 'ExportNamedDeclaration',
  specifiers,
});

export type ExportSpecifier = ES.ExportSpecifier;

export const ExportSpecifier = (
  local: Identifier,
  exported: Identifier = local,
): ExportSpecifier => ({
  type: 'ExportSpecifier',
  local,
  exported,
});

export type ExportDefaultDeclaration = ES.ExportDefaultDeclaration;

export const ExportDefaultDeclaration = (
  declaration: Declaration | Expression,
): ExportDefaultDeclaration => ({
  type: 'ExportDefaultDeclaration',
  declaration,
});
