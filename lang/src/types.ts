interface ReadonlyNonEmptyArray<A> extends ReadonlyArray<A> {
  readonly 0: A;
}

export interface Boolean {
  readonly type: 'BooleanLiteral';
  readonly value: boolean;
}

export const Boolean = (
  value: boolean,
): Boolean => ({
  type: 'BooleanLiteral',
  value,
});

export interface Number {
  readonly type: 'number';
  readonly value: number;
}

export const Number = (
  value: number,
): Number => ({
  type: 'number',
  value,
});

export interface String {
  readonly type: 'string';
  readonly value: string;
}

export const String = (
  value: string,
): String => ({
  type: 'string',
  value,
});

export interface Symbol {
  readonly type: 'symbol';
  readonly name: string;
}

export const Symbol = (
  name: string,
): Symbol => ({
  type: 'symbol',
  name,
});

export interface MetaProperty {
  readonly type: 'MetaProperty';
  readonly meta: string;
  readonly property: string;
}

export const MetaProperty = (
  meta: string,
  property: string,
): MetaProperty => ({
  type: 'MetaProperty',
  meta,
  property,
});

export interface MemberExpression {
  readonly type: 'MemberExpression';
  readonly object: Expression;
  readonly property: Expression;
}

export const MemberExpression = (
  object: Expression,
  property: Expression,
): MemberExpression => ({
  type: 'MemberExpression',
  object,
  property,
});

export interface Identifier {
  readonly type: 'identifier';
  readonly name: string;
}

export const Identifier = (
  name: string,
): Identifier => ({
  type: 'identifier',
  name,
});

export interface SpreadElement {
  readonly type: 'spread-element';
  readonly argument: Expression;
}

export const SpreadElement = (
  argument: Expression,
): SpreadElement => ({
  type: 'spread-element',
  argument,
});

export interface Array {
  readonly type: 'array';
  readonly elements: ReadonlyArray<SpreadElement | Expression>;
}

export const Array = (
  elements: ReadonlyArray<SpreadElement | Expression>,
): Array => ({
  type: 'array',
  elements,
});

export interface Property {
  readonly type: 'property';
  readonly key: Expression;
  readonly value: Expression;
}

export const Property = (
  key: Expression,
  value: Expression,
): Property => ({
  type: 'property',
  key,
  value,
});

export interface Object {
  readonly type: 'object';
  readonly properties: ReadonlyArray<SpreadElement | Property>;
}

export const Object = (
  properties: ReadonlyArray<SpreadElement | Property>,
): Object => ({
  type: 'object',
  properties,
});

export interface Lambda {
  readonly type: 'lambda';
  readonly parameter: Identifier;
  readonly body: Expression;
}

export const Lambda = (
  parameter: Identifier,
  body: Expression,
): Lambda => ({
  type: 'lambda',
  parameter,
  body,
});

export interface BlockExpression {
  readonly type: 'BlockExpression';
  readonly statements: ReadonlyNonEmptyArray<Statement>;
}

export const BlockExpression = (
  statements: ReadonlyNonEmptyArray<Statement>,
): BlockExpression => ({
  type: 'BlockExpression',
  statements,
});

export type PrimaryExpression =
  | Placeholder
  | Identifier
  | Boolean
  | Number
  | String
  | Symbol
  | Array
  | Object

export type CallExpression =
  | PrimaryExpression

export type UnaryOperator =
  | 'typeof'
  | '+'
  | '-'
  | '~'
  | '!'

export type UnaryOperand =
  | CallExpression

export interface UnaryExpression {
  readonly type: 'UnaryExpression';
  readonly operator: UnaryOperator;
  readonly argument: UnaryOperand;
}

export const UnaryExpression = (
  operator: UnaryOperator,
  argument: UnaryOperand,
): UnaryExpression => ({
  type: 'UnaryExpression',
  operator,
  argument,
});

export type ExponentiationOperator =
  | '**'

export type ExponentiationOperand =
  | UnaryExpression
  | UnaryOperand

export interface ExponentiationExpression {
  readonly type: 'BinaryExpression';
  readonly operator: ExponentiationOperator;
  readonly left: ExponentiationOperand;
  readonly right: ExponentiationOperand;
}

export const ExponentiationExpression = (
  operator: ExponentiationOperator,
  left: ExponentiationOperand,
  right: ExponentiationOperand,
): ExponentiationExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export type MultiplicativeOperator =
  | '*'
  | '/'
  | '%'

export type MultiplicativeOperand =
  | ExponentiationExpression
  | ExponentiationOperand

export interface MultiplicativeExpression {
  readonly type: 'BinaryExpression';
  readonly operator: MultiplicativeOperator;
  readonly left: MultiplicativeOperand;
  readonly right: MultiplicativeOperand;
}

export const MultiplicativeExpression = (
  operator: MultiplicativeOperator,
  left: MultiplicativeOperand,
  right: MultiplicativeOperand,
): MultiplicativeExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export type AdditiveOperator =
  | '+'
  | '-'

export type AdditiveOperand =
  | MultiplicativeExpression
  | MultiplicativeOperand

export interface AdditiveExpression {
  readonly type: 'BinaryExpression';
  readonly operator: AdditiveOperator;
  readonly left: AdditiveOperand;
  readonly right: AdditiveOperand;
}

export const AdditiveExpression = (
  operator: AdditiveOperator,
  left: AdditiveOperand,
  right: AdditiveOperand,
): AdditiveExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export type ShiftOperator =
  | '<<'
  | '>>'
  | '>>>'

export type ShiftOperand =
  | AdditiveExpression
  | AdditiveOperand

export interface ShiftExpression {
  readonly type: 'BinaryExpression';
  readonly operator: ShiftOperator;
  readonly left: ShiftOperand;
  readonly right: ShiftOperand;
}

export const ShiftExpression = (
  operator: ShiftOperator,
  left: ShiftOperand,
  right: ShiftOperand,
): ShiftExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export type RelationalOperator =
  | '<'
  | '>'
  | '<='
  | '>='
  | 'instanceof'
  | 'in'

export type RelationalOperand =
  | ShiftExpression
  | ShiftOperand

export interface RelationalExpression {
  readonly type: 'BinaryExpression';
  readonly operator: RelationalOperator;
  readonly left: RelationalOperand;
  readonly right: RelationalOperand;
}

export const RelationalExpression = (
  operator: RelationalOperator,
  left: RelationalOperand,
  right: RelationalOperand,
): RelationalExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export type EqualityOperator =
  | '=='
  | '!='
  | '==='
  | '!=='

export type EqualityOperand =
  | RelationalExpression
  | RelationalOperand

export interface EqualityExpression {
  readonly type: 'BinaryExpression';
  readonly operator: EqualityOperator;
  readonly left: EqualityOperand;
  readonly right: EqualityOperand;
}

export const EqualityExpression = (
  operator: EqualityOperator,
  left: EqualityOperand,
  right: EqualityOperand,
): EqualityExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export type BitwiseANDOperator =
  | '&'

export type BitwiseANDOperand =
  | EqualityExpression
  | EqualityOperand

export interface BitwiseANDExpression {
  readonly type: 'BinaryExpression';
  readonly operator: BitwiseANDOperator;
  readonly left: BitwiseANDOperand;
  readonly right: BitwiseANDOperand;
}

export const BitwiseANDExpression = (
  operator: BitwiseANDOperator,
  left: BitwiseANDOperand,
  right: BitwiseANDOperand,
): BitwiseANDExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export type BitwiseXOROperator =
  | '^'

export type BitwiseXOROperand =
  | BitwiseANDExpression
  | BitwiseANDOperand

export interface BitwiseXORExpression {
  readonly type: 'BinaryExpression';
  readonly operator: BitwiseXOROperator;
  readonly left: BitwiseXOROperand;
  readonly right: BitwiseXOROperand;
}

export const BitwiseXORExpression = (
  operator: BitwiseXOROperator,
  left: BitwiseXOROperand,
  right: BitwiseXOROperand,
): BitwiseXORExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export type BitwiseOROperator =
  | '|'

export type BitwiseOROperand =
  | BitwiseXORExpression
  | BitwiseXOROperand

export interface BitwiseORExpression {
  readonly type: 'BinaryExpression';
  readonly operator: BitwiseOROperator;
  readonly left: BitwiseOROperand;
  readonly right: BitwiseOROperand;
}

export const BitwiseORExpression = (
  operator: BitwiseOROperator,
  left: BitwiseOROperand,
  right: BitwiseOROperand,
): BitwiseORExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export type BinaryExpression =
  | ExponentiationExpression
  | MultiplicativeExpression
  | AdditiveExpression
  | ShiftExpression
  | RelationalExpression
  | EqualityExpression
  | BitwiseANDExpression
  | BitwiseXORExpression
  | BitwiseORExpression

export type LogicalANDOperator =
  | '&&'

export type LogicalANDOperand =
  | BitwiseORExpression
  | BitwiseOROperand

export interface LogicalANDExpression {
  readonly type: 'LogicalExpression';
  readonly operator: LogicalANDOperator;
  readonly left: LogicalANDOperand;
  readonly right: LogicalANDOperand;
}

export const LogicalANDExpression = (
  operator: LogicalANDOperator,
  left: LogicalANDOperand,
  right: LogicalANDOperand,
): LogicalANDExpression => ({
  type: 'LogicalExpression',
  operator,
  left,
  right,
});

export type LogicalOROperator =
  | '||'

export type LogicalOROperand =
  | LogicalANDExpression
  | LogicalANDOperand

export interface LogicalORExpression {
  readonly type: 'LogicalExpression';
  readonly operator: LogicalOROperator;
  readonly left: LogicalOROperand;
  readonly right: LogicalOROperand;
}

export const LogicalORExpression = (
  operator: LogicalOROperator,
  left: LogicalOROperand,
  right: LogicalOROperand,
): LogicalORExpression => ({
  type: 'LogicalExpression',
  operator,
  left,
  right,
});

export type CoalesceOperator =
  | '??'

export type CoalesceOperand =
  | LogicalORExpression
  | LogicalOROperand

export interface CoalesceExpression {
  readonly type: 'LogicalExpression';
  readonly operator: CoalesceOperator;
  readonly left: CoalesceOperand;
  readonly right: CoalesceOperand;
}

export const CoalesceExpression = (
  operator: CoalesceOperator,
  left: CoalesceOperand,
  right: CoalesceOperand,
): CoalesceExpression => ({
  type: 'LogicalExpression',
  operator,
  left,
  right,
});

export type LogicalExpression =
  | LogicalANDExpression
  | LogicalORExpression
  | CoalesceExpression

export interface ConditionalExpression {
  readonly type: 'ConditionalExpression';
  readonly predicate: Expression;
  readonly consequent: Expression;
  readonly alternative: Expression;
}

export const ConditionalExpression = (
  predicate: Expression,
  consequent: Expression,
  alternative: Expression,
): ConditionalExpression => ({
  type: 'ConditionalExpression',
  predicate,
  consequent,
  alternative,
});

export interface Placeholder {
  readonly type: 'placeholder';
}

export const Placeholder: Placeholder = {
  type: 'placeholder',
};

export interface New {
  readonly type: 'new';
  readonly callee: Expression;
  readonly arguments: ReadonlyArray<Expression>;
}

export const New = (
  callee: Expression,
  args: ReadonlyArray<Expression>,
): New => ({
  type: 'new',
  callee,
  arguments: args,
});

export interface Application {
  readonly type: 'application';
  readonly callee: Expression;
  readonly arguments: ReadonlyArray<SpreadElement | Expression>;
}

export const Application = (
  callee: Expression,
  args: ReadonlyArray<Expression>,
): Application => ({
  type: 'application',
  callee,
  arguments: args,
});

export interface CallExpression_ {
  readonly type: 'CallExpression_';
  readonly callee: Expression;
  readonly arguments: ReadonlyArray<SpreadElement | Expression>;
}

export const CallExpression_ = (
  callee: Expression,
  args: ReadonlyArray<Expression>,
): CallExpression_ => ({
  type: 'CallExpression_',
  callee,
  arguments: args,
});

export type Expression =
  | Placeholder
  | Boolean
  | Number
  | String
  | Symbol
  | MetaProperty
  | MemberExpression
  | Identifier
  | Array
  | Object
  | Lambda
  | BlockExpression
  | UnaryExpression
  | BinaryExpression
  | LogicalExpression
  | ConditionalExpression
  | New
  | Application
  | CallExpression_

interface _ImportDeclarationBase {
  readonly type: 'ImportDeclaration';
  readonly source: String;
}

interface _ImportDefaultDeclaration extends _ImportDeclarationBase {
  readonly specifiers: ReadonlyArray<ImportDefaultSpecifier>
}

export const ImportDefaultDeclaration = (
  source: String,
  specifier: ImportDefaultSpecifier,
): _ImportDefaultDeclaration => ({
  type: 'ImportDeclaration',
  source,
  specifiers: [specifier],
});

interface _ImportDeclaration extends _ImportDeclarationBase {
  readonly specifiers: ReadonlyArray<ImportSpecifier>
}

export const ImportDeclaration = (
  source: String,
  specifiers: ReadonlyArray<ImportSpecifier>,
): _ImportDeclaration => ({
  type: 'ImportDeclaration',
  source,
  specifiers,
});

interface _ImportEverythingDeclaration extends _ImportDeclarationBase {
  readonly specifiers: '*';
  readonly hiding: ReadonlyArray<Identifier>
}

export const ImportEverythingDeclaration = (
  source: String,
  hiding: ReadonlyArray<Identifier>,
): _ImportEverythingDeclaration => ({
  type: 'ImportDeclaration',
  source,
  specifiers: '*',
  hiding,
});

export type ImportDeclaration =
  | _ImportDefaultDeclaration
  | _ImportDeclaration
  | _ImportEverythingDeclaration

export interface ImportDefaultSpecifier {
  readonly type: 'ImportDefaultSpecifier';
  readonly local: Identifier;
}

export const ImportDefaultSpecifier = (
  local: Identifier,
): ImportDefaultSpecifier => ({
  type: 'ImportDefaultSpecifier',
  local,
});

export interface ImportSpecifier {
  readonly type: 'ImportSpecifier';
  readonly local: Identifier;
  readonly imported: Identifier;
}

export const ImportSpecifier = (
  local: Identifier,
  imported: Identifier,
): ImportSpecifier => ({
  type: 'ImportSpecifier',
  local,
  imported,
});

export interface ExportNamedDeclaration {
  readonly type: 'ExportNamedDeclaration';
  readonly specifiers: ReadonlyArray<Identifier>;
}

export const ExportNamedDeclaration = (
  specifiers: ReadonlyArray<Identifier>,
): ExportNamedDeclaration => ({
  type: 'ExportNamedDeclaration',
  specifiers,
});

export interface ExportDefaultDeclaration {
  readonly type: 'ExportDefaultDeclaration';
  readonly declaration: Expression;
}

export const ExportDefaultDeclaration = (
  declaration: Expression,
): ExportDefaultDeclaration => ({
  type: 'ExportDefaultDeclaration',
  declaration,
});

export interface Declaration {
  readonly type: 'declaration';
  readonly name: string;
  readonly parameterNames: ReadonlyArray<string>;
  readonly expression: Expression;
}

export const Declaration = (
  name: string,
  parameterNames: ReadonlyArray<string>,
  expression: Expression,
): Declaration => ({
  type: 'declaration',
  name,
  parameterNames,
  expression,
});

export interface ExpressionStatement {
  readonly type: 'ExpressionStatement';
  readonly expression: Expression;
}

export const ExpressionStatement = (
  expression: Expression,
): ExpressionStatement => ({
  type: 'ExpressionStatement',
  expression,
});

export type Statement =
  | Declaration
  | ExpressionStatement

export interface Module {
  readonly type: 'Module';
  readonly imports: ReadonlyArray<ImportDeclaration>;
  readonly exports: ReadonlyArray<ExportNamedDeclaration | ExportDefaultDeclaration>;
  readonly statements: ReadonlyArray<Statement>;
}

export const Module = (
  imports: ReadonlyArray<ImportDeclaration>,
  exports: ReadonlyArray<ExportNamedDeclaration | ExportDefaultDeclaration>,
  statements: ReadonlyArray<Statement>,
): Module => ({
  type: 'Module',
  imports,
  exports,
  statements,
});
