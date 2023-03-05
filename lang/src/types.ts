export interface Number {
  readonly type: 'number';
  readonly value: number;
}

export interface String {
  readonly type: 'string';
  readonly value: string;
}

export interface Symbol {
  readonly type: 'symbol';
  readonly name: string;
}

export interface MetaProperty {
  readonly type: 'MetaProperty';
  readonly meta: string;
  readonly property: string;
}

export interface MemberExpression {
  readonly type: 'MemberExpression';
  readonly object: Expression;
  readonly property: MemberExpression | Identifier | Symbol;
}

export interface Identifier {
  readonly type: 'identifier';
  readonly name: string;
}

export interface SpreadElement {
  readonly type: 'spread-element';
  readonly argument: Expression;
}

export interface Array {
  readonly type: 'array';
  readonly elements: ReadonlyArray<SpreadElement | Expression>;
}

export interface Property {
  readonly type: 'property';
  readonly key: Expression;
  readonly value: Expression;
}

export interface Object {
  readonly type: 'object';
  readonly properties: ReadonlyArray<SpreadElement | Property>;
}

export interface Lambda {
  readonly type: 'lambda';
  readonly parameter: Identifier;
  readonly body: Expression;
}

export interface BlockExpression {
  readonly type: 'BlockExpression';
  readonly statements: ReadonlyArray<Statement>;
}

export type UnaryOperator =
  | 'typeof'
  | '+'
  | '-'
  | '~'
  | '!'

export interface UnaryExpression {
  readonly type: 'UnaryExpression';
  readonly operator: UnaryOperator;
  readonly argument: Expression;
}

export type ExponentiationOperator =
  | '**'

export interface ExponentiationExpression {
  readonly type: 'BinaryExpression';
  readonly operator: ExponentiationOperator;
  readonly left: Expression;
  readonly right: Expression;
}

export type MultiplicativeOperator =
  | '*'
  | '/'
  | '%'

export interface MultiplicativeExpression {
  readonly type: 'BinaryExpression';
  readonly operator: MultiplicativeOperator;
  readonly left: Expression;
  readonly right: Expression;
}

export type AdditiveOperator =
  | '+'
  | '-'

export interface AdditiveExpression {
  readonly type: 'BinaryExpression';
  readonly operator: AdditiveOperator;
  readonly left: Expression;
  readonly right: Expression;
}

export type ShiftOperator =
  | '<<'
  | '>>'
  | '>>>'

export interface ShiftExpression {
  readonly type: 'BinaryExpression';
  readonly operator: ShiftOperator;
  readonly left: Expression;
  readonly right: Expression;
}

export type RelationalOperator =
  | '<'
  | '>'
  | '<='
  | '>='
  | 'instanceof'
  | 'in'

export interface RelationalExpression {
  readonly type: 'BinaryExpression';
  readonly operator: RelationalOperator;
  readonly left: Expression;
  readonly right: Expression;
}

export type EqualityOperator =
  | '=='
  | '!='
  | '==='
  | '!=='

export interface EqualityExpression {
  readonly type: 'BinaryExpression';
  readonly operator: EqualityOperator;
  readonly left: Expression;
  readonly right: Expression;
}

export type BitwiseANDOperator =
  | '&'

export interface BitwiseANDExpression {
  readonly type: 'BinaryExpression';
  readonly operator: BitwiseANDOperator;
  readonly left: Expression;
  readonly right: Expression;
}

export type BitwiseXOROperator =
  | '^'

export interface BitwiseXORExpression {
  readonly type: 'BinaryExpression';
  readonly operator: BitwiseXOROperator;
  readonly left: Expression;
  readonly right: Expression;
}

export type BitwiseOROperator =
  | '|'

export interface BitwiseORExpression {
  readonly type: 'BinaryExpression';
  readonly operator: BitwiseOROperator;
  readonly left: Expression;
  readonly right: Expression;
}

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

export interface LogicalANDExpression {
  readonly type: 'LogicalExpression';
  readonly operator: LogicalANDOperator;
  readonly left: Expression;
  readonly right: Expression;
}

export type LogicalOROperator =
  | '||'

export interface LogicalORExpression {
  readonly type: 'LogicalExpression';
  readonly operator: LogicalOROperator;
  readonly left: Expression;
  readonly right: Expression;
}

export type CoalesceOperator =
  | '??'

export interface CoalesceExpression {
  readonly type: 'LogicalExpression';
  readonly operator: CoalesceOperator;
  readonly left: Expression;
  readonly right: Expression;
}

export type LogicalExpression =
  | LogicalANDExpression
  | LogicalORExpression
  | CoalesceExpression

export interface And {
  readonly type: 'and';
  readonly left: Expression;
  readonly right: Expression;
}

export interface Or {
  readonly type: 'or';
  readonly left: Expression;
  readonly right: Expression;
}

export interface ConditionalExpression {
  readonly type: 'ConditionalExpression';
  readonly predicate: Expression;
  readonly consequent: Expression;
  readonly alternative: Expression;
}

export interface Placeholder {
  readonly type: 'placeholder';
}

export interface New {
  readonly type: 'new';
  readonly callee: Placeholder | Expression;
  readonly arguments: ReadonlyArray<Placeholder | Expression>;
}

export interface Invocation {
  readonly type: 'invocation';
  readonly name: string;
  readonly object: Placeholder | Expression;
  readonly arguments: ReadonlyArray<Placeholder | Expression>;
}

export interface Application {
  readonly type: 'application';
  readonly callee: Placeholder | Expression;
  readonly arguments: ReadonlyArray<Placeholder | SpreadElement | Expression>;
}

export type Expression =
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
  | And
  | Or
  | ConditionalExpression
  | New
  | Invocation
  | Application

export interface StarImport {
  readonly type: 'star-import';
  readonly source: string;
  readonly hiding: ReadonlyArray<string>;
}

export interface NamedImports {
  readonly type: 'named-imports';
  readonly names: ReadonlyArray<string>;
  readonly source: string;
}

export interface DefaultImport {
  readonly type: 'default-import';
  readonly name: string;
  readonly source: string;
}

export interface DefaultExport {
  readonly type: 'default-export';
  readonly expression: Expression;
}

export interface NamedExports {
  readonly type: 'named-exports';
  readonly names: ReadonlyArray<string>;
}

export interface Declaration {
  readonly type: 'declaration';
  readonly name: string;
  readonly parameterNames: ReadonlyArray<string>;
  readonly expression: Expression;
}

export interface ExpressionStatement {
  readonly type: 'ExpressionStatement';
  readonly expression: Expression;
}

export type Statement =
  | StarImport
  | NamedImports
  | DefaultImport
  | DefaultExport
  | NamedExports
  | Declaration
  | ExpressionStatement
