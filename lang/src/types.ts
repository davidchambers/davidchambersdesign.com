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

export interface TemplateElement {
  readonly type: 'TemplateElement';
  readonly tail: boolean;
  readonly raw: string;
}

export const TemplateElement = (
  tail: boolean,
  raw: string,
): TemplateElement => ({
  type: 'TemplateElement',
  tail,
  raw,
});

export interface TemplateLiteral {
  readonly type: 'TemplateLiteral';
  readonly quasis: ReadonlyNonEmptyArray<TemplateElement>;
  readonly expressions: ReadonlyArray<Expression>;
}

export const TemplateLiteral = (
  quasis: ReadonlyNonEmptyArray<TemplateElement>,
  expressions: ReadonlyArray<Expression>,
): TemplateLiteral => ({
  type: 'TemplateLiteral',
  quasis,
  expressions,
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
  readonly type: 'Property';
  readonly key: Expression;
  readonly value: Expression | Pattern;
}

export const Property = (
  key: Expression,
  value: Expression | Pattern,
): Property => ({
  type: 'Property',
  key,
  value,
});

export interface AssignmentProperty extends Property {
  readonly value: Pattern;
}

export const AssignmentProperty = (
  key: Expression,
  value: Pattern,
): AssignmentProperty => ({
  type: 'Property',
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

export type Pattern =
  | ArrayPattern
  | ObjectPattern
  | RestElement
  | Identifier
//| AssignmentPattern
//| MemberExpression

export interface ArrayPattern {
  type: 'ArrayPattern';
  elements: ReadonlyArray<Pattern | null>;
}

export const ArrayPattern = (
  elements: ReadonlyArray<Pattern | null>,
): ArrayPattern => ({
  type: 'ArrayPattern',
  elements,
});

export interface ObjectPattern {
  type: 'ObjectPattern';
  properties: ReadonlyArray<AssignmentProperty | RestElement>;
}

export const ObjectPattern = (
  properties: ReadonlyArray<AssignmentProperty | RestElement>,
): ObjectPattern => ({
  type: 'ObjectPattern',
  properties,
});

export interface RestElement {
  type: 'RestElement';
  argument: Identifier;
}

export const RestElement = (
  argument: Identifier,
): RestElement => ({
  type: 'RestElement',
  argument,
});

export interface ArrowFunctionExpression {
  readonly type: 'ArrowFunctionExpression';
  readonly parameters: ReadonlyArray<Pattern>;
  readonly body: Expression;
}

export const ArrowFunctionExpression = (
  parameters: ReadonlyArray<Pattern>,
  body: Expression,
): ArrowFunctionExpression => ({
  type: 'ArrowFunctionExpression',
  parameters,
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
  | TemplateLiteral
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

export type BinaryOperator =
  | '**'
  | '*'
  | '/'
  | '%'
  | '+'
  | '-'
  | '<<'
  | '>>'
  | '>>>'
  | '<'
  | '>'
  | '<='
  | '>='
  | 'instanceof'
  | 'in'
  | '=='
  | '!='
  | '==='
  | '!=='
  | '&'
  | '^'
  | '|'

export type BinaryOperand =
  | PrimaryExpression

export interface BinaryExpression {
  readonly type: 'BinaryExpression';
  readonly operator: BinaryOperator;
  readonly left: BinaryOperand;
  readonly right: BinaryOperand;
}

export const BinaryExpression = (
  operator: BinaryOperator,
  left: BinaryOperand,
  right: BinaryOperand,
): BinaryExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
});

export type LogicalOperator =
  | '&&'
  | '||'
  | '??'

export type LogicalOperand =
  | BinaryExpression

export interface LogicalExpression {
  readonly type: 'LogicalExpression';
  readonly operator: LogicalOperator;
  readonly left: LogicalOperand;
  readonly right: LogicalOperand;
}

export const LogicalExpression = (
  operator: LogicalOperator,
  left: LogicalOperand,
  right: LogicalOperand,
): LogicalExpression => ({
  type: 'LogicalExpression',
  operator,
  left,
  right,
});

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

export interface PipeExpression {
  readonly type: 'PipeExpression';
  readonly head: Expression;
  readonly body: Expression;
}

export const PipeExpression = (
  head: Expression,
  body: Expression,
): PipeExpression => ({
  type: 'PipeExpression',
  head,
  body,
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
  args: ReadonlyArray<SpreadElement | Expression>,
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
  args: ReadonlyArray<SpreadElement | Expression>,
): CallExpression => ({
  type: 'CallExpression',
  callee,
  arguments: args,
});

export type Expression =
  | BooleanLiteral
  | NumberLiteral
  | StringLiteral
  | TemplateLiteral
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
  | PipeExpression
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

export interface VariableDeclaration {
  readonly type: 'VariableDeclaration';
  readonly pattern: Pattern;
  readonly expression: Expression;
}

export const VariableDeclaration = (
  pattern: Pattern,
  expression: Expression,
): VariableDeclaration => ({
  type: 'VariableDeclaration',
  pattern,
  expression,
});

export interface FunctionDeclaration {
  readonly type: 'FunctionDeclaration';
  readonly name: string;
  readonly parameters: ReadonlyNonEmptyArray<Pattern>;
  readonly body: Expression;
}

export const FunctionDeclaration = (
  name: string,
  parameters: ReadonlyNonEmptyArray<Pattern>,
  body: Expression,
): FunctionDeclaration => ({
  type: 'FunctionDeclaration',
  name,
  parameters,
  body,
});

export type Declaration =
  | VariableDeclaration
  | FunctionDeclaration

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
