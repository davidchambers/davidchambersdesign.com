import type * as Serif from './types.js';

export const Boolean = (
  value: boolean,
): Serif.Boolean => ({
  type: 'BooleanLiteral',
  value,
});

export const Number = (
  value: number,
): Serif.Number => ({
  type: 'number',
  value,
});

export const String = (
  value: string,
): Serif.String => ({
  type: 'string',
  value,
});

export const Symbol = (
  name: string,
): Serif.Symbol => ({
  type: 'symbol',
  name,
});

export const MetaProperty = (
  meta: string,
  property: string,
): Serif.MetaProperty => ({
  type: 'MetaProperty',
  meta,
  property,
});

export const MemberExpression = (
  object: Serif.Expression,
  property: Serif.Expression,
): Serif.MemberExpression => ({
  type: 'MemberExpression',
  object,
  property,
});

export const Identifier = (
  name: string,
): Serif.Identifier => ({
  type: 'identifier',
  name,
});

export const SpreadElement = (
  argument: Serif.Expression,
): Serif.SpreadElement => ({
  type: 'spread-element',
  argument,
});

export const Array = (
  elements: ReadonlyArray<Serif.SpreadElement | Serif.Expression>,
): Serif.Array => ({
  type: 'array',
  elements,
});

export const Property = (
  key: Serif.Expression,
  value: Serif.Expression,
): Serif.Property => ({
  type: 'property',
  key,
  value,
});

export const Object = (
  properties: ReadonlyArray<Serif.SpreadElement | Serif.Property>,
): Serif.Object => ({
  type: 'object',
  properties,
});

export const Lambda = (
  parameter: Serif.Identifier,
  body: Serif.Expression,
): Serif.Lambda => ({
  type: 'lambda',
  parameter,
  body,
});

export const BlockExpression = (
  statements: ReadonlyArray<Serif.Statement>,
): Serif.BlockExpression => ({
  type: 'BlockExpression',
  statements,
});

export const UnaryExpression = (
  operator: Serif.UnaryOperator,
  argument: Serif.UnaryOperand,
): Serif.UnaryExpression => ({
  type: 'UnaryExpression',
  operator,
  argument,
});

export const ExponentiationExpression = (
  operator: Serif.ExponentiationOperator,
  left: Serif.ExponentiationOperand,
  right: Serif.ExponentiationOperand,
): Serif.ExponentiationExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export const MultiplicativeExpression = (
  operator: Serif.MultiplicativeOperator,
  left: Serif.MultiplicativeOperand,
  right: Serif.MultiplicativeOperand,
): Serif.MultiplicativeExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export const AdditiveExpression = (
  operator: Serif.AdditiveOperator,
  left: Serif.AdditiveOperand,
  right: Serif.AdditiveOperand,
): Serif.AdditiveExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export const ShiftExpression = (
  operator: Serif.ShiftOperator,
  left: Serif.ShiftOperand,
  right: Serif.ShiftOperand,
): Serif.ShiftExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export const RelationalExpression = (
  operator: Serif.RelationalOperator,
  left: Serif.RelationalOperand,
  right: Serif.RelationalOperand,
): Serif.RelationalExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export const EqualityExpression = (
  operator: Serif.EqualityOperator,
  left: Serif.EqualityOperand,
  right: Serif.EqualityOperand,
): Serif.EqualityExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export const BitwiseANDExpression = (
  operator: Serif.BitwiseANDOperator,
  left: Serif.BitwiseANDOperand,
  right: Serif.BitwiseANDOperand,
): Serif.BitwiseANDExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export const BitwiseXORExpression = (
  operator: Serif.BitwiseXOROperator,
  left: Serif.BitwiseXOROperand,
  right: Serif.BitwiseXOROperand,
): Serif.BitwiseXORExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export const BitwiseORExpression = (
  operator: Serif.BitwiseOROperator,
  left: Serif.BitwiseOROperand,
  right: Serif.BitwiseOROperand,
): Serif.BitwiseORExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export const LogicalANDExpression = (
  operator: Serif.LogicalANDOperator,
  left: Serif.LogicalANDOperand,
  right: Serif.LogicalANDOperand,
): Serif.LogicalANDExpression => ({
  type: 'LogicalExpression',
  operator,
  left,
  right,
});

export const LogicalORExpression = (
  operator: Serif.LogicalOROperator,
  left: Serif.LogicalOROperand,
  right: Serif.LogicalOROperand,
): Serif.LogicalORExpression => ({
  type: 'LogicalExpression',
  operator,
  left,
  right,
});

export const CoalesceExpression = (
  operator: Serif.CoalesceOperator,
  left: Serif.CoalesceOperand,
  right: Serif.CoalesceOperand,
): Serif.CoalesceExpression => ({
  type: 'LogicalExpression',
  operator,
  left,
  right,
});

export const ConditionalExpression = (
  predicate: Serif.Expression,
  consequent: Serif.Expression,
  alternative: Serif.Expression,
): Serif.ConditionalExpression => ({
  type: 'ConditionalExpression',
  predicate,
  consequent,
  alternative,
});

export const Placeholder: Serif.Placeholder = {
  type: 'placeholder',
};

export const New = (
  callee: Serif.Placeholder | Serif.Expression,
  args: ReadonlyArray<Serif.Placeholder | Serif.Expression>,
): Serif.New => ({
  type: 'new',
  callee,
  arguments: args,
});

export const Invocation = (
  name: string,
  object: Serif.Placeholder | Serif.Expression,
  args: ReadonlyArray<Serif.Placeholder | Serif.Expression>,
): Serif.Invocation => ({
  type: 'invocation',
  name,
  object,
  arguments: args,
});

export const Application = (
  callee: Serif.Placeholder | Serif.Expression,
  args: ReadonlyArray<Serif.Placeholder | Serif.Expression>,
): Serif.Application => ({
  type: 'application',
  callee,
  arguments: args,
});

export const ImportDefaultSpecifier = (
  local: Serif.Identifier,
): Serif.ImportDefaultSpecifier => ({
  type: 'ImportDefaultSpecifier',
  local,
});

export const ImportSpecifier = (
  local: Serif.Identifier,
  imported: Serif.Identifier,
): Serif.ImportSpecifier => ({
  type: 'ImportSpecifier',
  local,
  imported,
});

export const ExportNamedDeclaration = (
  specifiers: ReadonlyArray<Serif.Identifier>,
): Serif.ExportNamedDeclaration => ({
  type: 'ExportNamedDeclaration',
  specifiers,
});

export const ExportDefaultDeclaration = (
  declaration: Serif.Expression,
): Serif.ExportDefaultDeclaration => ({
  type: 'ExportDefaultDeclaration',
  declaration,
});

export const Declaration = (
  name: string,
  parameterNames: ReadonlyArray<string>,
  expression: Serif.Expression,
): Serif.Declaration => ({
  type: 'declaration',
  name,
  parameterNames,
  expression,
});

export const ExpressionStatement = (
  expression: Serif.Expression,
): Serif.ExpressionStatement => ({
  type: 'ExpressionStatement',
  expression,
});

export const Module = (
  imports: ReadonlyArray<Serif.ImportDeclaration>,
  exports: ReadonlyArray<Serif.ExportNamedDeclaration | Serif.ExportDefaultDeclaration>,
  statements: ReadonlyArray<Serif.Statement>,
): Serif.Module => ({
  type: 'Module',
  imports,
  exports,
  statements,
});
