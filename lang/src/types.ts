interface ReadonlyNonEmptyArray<A> extends ReadonlyArray<A> {
  readonly 0: A;
}

export interface BooleanLiteral {
  readonly type: 'BooleanLiteral';
  readonly value: boolean;
}

export const BooleanLiteral = (
  value: boolean,
): BooleanLiteral => ({
  type: 'BooleanLiteral',
  value,
});

export interface NumberLiteral {
  readonly type: 'NumberLiteral';
  readonly value: number;
}

export const NumberLiteral = (
  value: number,
): NumberLiteral => ({
  type: 'NumberLiteral',
  value,
});

export interface StringLiteral {
  readonly type: 'StringLiteral';
  readonly value: string;
}

export const StringLiteral = (
  value: string,
): StringLiteral => ({
  type: 'StringLiteral',
  value,
});

export interface SymbolLiteral {
  readonly type: 'SymbolLiteral';
  readonly name: string;
}

export const SymbolLiteral = (
  name: string,
): SymbolLiteral => ({
  type: 'SymbolLiteral',
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
  readonly type: 'Identifier';
  readonly name: string;
}

export const Identifier = (
  name: string,
): Identifier => ({
  type: 'Identifier',
  name,
});

export interface SpreadElement {
  readonly type: 'SpreadElement';
  readonly argument: Expression;
}

export const SpreadElement = (
  argument: Expression,
): SpreadElement => ({
  type: 'SpreadElement',
  argument,
});

export interface ArrayExpression {
  readonly type: 'ArrayExpression';
  readonly elements: ReadonlyArray<SpreadElement | Expression>;
}

export const ArrayExpression = (
  elements: ReadonlyArray<SpreadElement | Expression>,
): ArrayExpression => ({
  type: 'ArrayExpression',
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

export interface ObjectExpression {
  readonly type: 'ObjectExpression';
  readonly properties: ReadonlyArray<SpreadElement | Property>;
}

export const ObjectExpression = (
  properties: ReadonlyArray<SpreadElement | Property>,
): ObjectExpression => ({
  type: 'ObjectExpression',
  properties,
});

export interface ArrowFunctionExpression {
  readonly type: 'ArrowFunctionExpression';
  readonly parameter: Identifier;
  readonly body: Expression;
}

export const ArrowFunctionExpression = (
  parameter: Identifier,
  body: Expression,
): ArrowFunctionExpression => ({
  type: 'ArrowFunctionExpression',
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
  | Identifier
  | BooleanLiteral
  | NumberLiteral
  | StringLiteral
  | SymbolLiteral
  | ArrayExpression
  | ObjectExpression

export type UnaryOperator =
  | 'typeof'
  | '+'
  | '-'
  | '~'
  | '!'

export type UnaryOperand =
  | PrimaryExpression

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

export interface NewExpression {
  readonly type: 'NewExpression';
  readonly callee: Expression;
  readonly arguments: ReadonlyArray<Expression>;
}

export const NewExpression = (
  callee: Expression,
  args: ReadonlyArray<Expression>,
): NewExpression => ({
  type: 'NewExpression',
  callee,
  arguments: args,
});

export interface Application {
  readonly type: 'Application';
  readonly callee: Expression;
  readonly arguments: ReadonlyArray<SpreadElement | Expression>;
}

export const Application = (
  callee: Expression,
  args: ReadonlyArray<Expression>,
): Application => ({
  type: 'Application',
  callee,
  arguments: args,
});

export interface CallExpression {
  readonly type: 'CallExpression';
  readonly callee: Expression;
  readonly arguments: ReadonlyArray<SpreadElement | Expression>;
}

export const CallExpression = (
  callee: Expression,
  args: ReadonlyArray<Expression>,
): CallExpression => ({
  type: 'CallExpression',
  callee,
  arguments: args,
});

export type Expression =
  | BooleanLiteral
  | NumberLiteral
  | StringLiteral
  | SymbolLiteral
  | MetaProperty
  | MemberExpression
  | Identifier
  | ArrayExpression
  | ObjectExpression
  | ArrowFunctionExpression
  | BlockExpression
  | UnaryExpression
  | BinaryExpression
  | LogicalExpression
  | ConditionalExpression
  | NewExpression
  | Application
  | CallExpression

interface _ImportDeclarationBase {
  readonly type: 'ImportDeclaration';
  readonly source: StringLiteral;
}

interface _ImportDefaultDeclaration extends _ImportDeclarationBase {
  readonly specifiers: ReadonlyArray<ImportDefaultSpecifier>
}

export const ImportDefaultDeclaration = (
  source: StringLiteral,
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
  source: StringLiteral,
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
  source: StringLiteral,
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
  readonly type: 'Declaration';
  readonly name: string;
  readonly parameterNames: ReadonlyArray<string>;
  readonly expression: Expression;
}

export const Declaration = (
  name: string,
  parameterNames: ReadonlyArray<string>,
  expression: Expression,
): Declaration => ({
  type: 'Declaration',
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
  readonly statements: ReadonlyArray<
    | ImportDeclaration
    | ExportNamedDeclaration
    | ExportDefaultDeclaration
    | Statement
  >;
}

export const Module = (
  statements: ReadonlyArray<
    | ImportDeclaration
    | ExportNamedDeclaration
    | ExportDefaultDeclaration
    | Statement
  >,
): Module => ({
  type: 'Module',
  statements,
});
