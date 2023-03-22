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
  readonly expressions: ReadonlyArray<Node>;
}

export const TemplateLiteral = (
  quasis: ReadonlyNonEmptyArray<TemplateElement>,
  expressions: ReadonlyArray<Node>,
): TemplateLiteral => ({
  type: 'TemplateLiteral',
  quasis,
  expressions,
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
  readonly object: Node;
  readonly property: Node;
}

export const MemberExpression = (
  object: Node,
  property: Node,
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
  readonly argument: Node;
}

export const SpreadElement = (
  argument: Node,
): SpreadElement => ({
  type: 'SpreadElement',
  argument,
});

export interface ArrayExpression {
  readonly type: 'ArrayExpression';
  readonly elements: ReadonlyArray<Node>;
}

export const ArrayExpression = (
  elements: ReadonlyArray<Node>,
): ArrayExpression => ({
  type: 'ArrayExpression',
  elements,
});

export interface Property {
  readonly type: 'Property';
  readonly key: Node;
  readonly value: Node;
}

export const Property = (
  key: Node,
  value: Node,
): Property => ({
  type: 'Property',
  key,
  value,
});

export interface AssignmentProperty extends Property {
  readonly value: Pattern;
}

export const AssignmentProperty = (
  key: Node,
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
  elements: ReadonlyArray<Node | null>;
}

export const ArrayPattern = (
  elements: ReadonlyArray<Node | null>,
): ArrayPattern => ({
  type: 'ArrayPattern',
  elements,
});

export interface ObjectPattern {
  type: 'ObjectPattern';
  properties: ReadonlyArray<Node>;
}

export const ObjectPattern = (
  properties: ReadonlyArray<Node>,
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
  readonly body: Node;
}

export const ArrowFunctionExpression = (
  parameters: ReadonlyArray<Pattern>,
  body: Node,
): ArrowFunctionExpression => ({
  type: 'ArrowFunctionExpression',
  parameters,
  body,
});

export interface BlockExpression {
  readonly type: 'BlockExpression';
  readonly statements: ReadonlyNonEmptyArray<Node>;
}

export const BlockExpression = (
  statements: ReadonlyNonEmptyArray<Node>,
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

export interface MapExpression {
  readonly type: 'MapExpression';
  readonly left: Node;
  readonly right: Node;
}

export const MapExpression = (
  left: Node,
  right: Node,
): MapExpression => ({
  type: 'MapExpression',
  left,
  right,
});

export type LogicalOperator =
  | 'and'
  | 'or'
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
  readonly predicate: Node;
  readonly consequent: Node;
  readonly alternative: Node;
}

export const ConditionalExpression = (
  predicate: Node,
  consequent: Node,
  alternative: Node,
): ConditionalExpression => ({
  type: 'ConditionalExpression',
  predicate,
  consequent,
  alternative,
});

export interface PipeExpression {
  readonly type: 'PipeExpression';
  readonly head: Node;
  readonly body: Node;
}

export const PipeExpression = (
  head: Node,
  body: Node,
): PipeExpression => ({
  type: 'PipeExpression',
  head,
  body,
});

export interface CallExpression {
  readonly type: 'CallExpression';
  readonly callee: Node;
  readonly arguments: ReadonlyArray<Node>;
}

export const CallExpression = (
  callee: Node,
  args: ReadonlyArray<Node>,
): CallExpression => ({
  type: 'CallExpression',
  callee,
  arguments: args,
});

export type Node =
  | BooleanLiteral
  | NumberLiteral
  | StringLiteral
  | TemplateLiteral
  | MetaProperty
  | MemberExpression
  | Identifier
  | ArrayExpression
  | ObjectExpression
  | ArrowFunctionExpression
  | BlockExpression
  | UnaryExpression
  | BinaryExpression
  | MapExpression
  | LogicalExpression
  | ConditionalExpression
  | PipeExpression
  | CallExpression
  | SpreadElement
  | VariableDeclaration
  | FunctionDeclaration
  | ExpressionStatement
  | Pattern
  | Property
  | ImportDeclaration
  | ExportNamedDeclaration
  | ExportDefaultDeclaration

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
  readonly specifiers: ReadonlyArray<ImportSpecifier | ImportNamespaceSpecifier>
}

export const ImportDeclaration = (
  source: StringLiteral,
  specifiers: ReadonlyArray<ImportSpecifier | ImportNamespaceSpecifier>,
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

export interface ImportNamespaceSpecifier {
  readonly type: 'ImportNamespaceSpecifier';
  readonly local: Identifier;
}

export const ImportNamespaceSpecifier = (
  local: Identifier,
): ImportNamespaceSpecifier => ({
  type: 'ImportNamespaceSpecifier',
  local,
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
  readonly declaration: Node;
}

export const ExportDefaultDeclaration = (
  declaration: Node,
): ExportDefaultDeclaration => ({
  type: 'ExportDefaultDeclaration',
  declaration,
});

export interface VariableDeclaration {
  readonly type: 'VariableDeclaration';
  readonly pattern: Pattern;
  readonly expression: Node;
}

export const VariableDeclaration = (
  pattern: Pattern,
  expression: Node,
): VariableDeclaration => ({
  type: 'VariableDeclaration',
  pattern,
  expression,
});

export interface FunctionDeclaration {
  readonly type: 'FunctionDeclaration';
  readonly name: string;
  readonly parameters: ReadonlyNonEmptyArray<Pattern>;
  readonly body: Node;
}

export const FunctionDeclaration = (
  name: string,
  parameters: ReadonlyNonEmptyArray<Pattern>,
  body: Node,
): FunctionDeclaration => ({
  type: 'FunctionDeclaration',
  name,
  parameters,
  body,
});

export interface ExpressionStatement {
  readonly type: 'ExpressionStatement';
  readonly expression: Node;
}

export const ExpressionStatement = (
  expression: Node,
): ExpressionStatement => ({
  type: 'ExpressionStatement',
  expression,
});

export interface Module {
  readonly type: 'Module';
  readonly imports: ReadonlyArray<ImportDeclaration>;
  readonly exports: ReadonlyArray<ExportNamedDeclaration | ExportDefaultDeclaration>;
  readonly statements: ReadonlyArray<Node>;
}

export const Module = ({
  imports,
  exports,
  statements,
}: {
  imports: ReadonlyArray<ImportDeclaration>,
  exports: ReadonlyArray<ExportNamedDeclaration | ExportDefaultDeclaration>,
  statements: ReadonlyArray<Node>,
}): Module => ({
  type: 'Module',
  imports,
  exports,
  statements,
});
