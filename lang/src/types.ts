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

export type PrimaryExpression =
  | Identifier
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
  | ConditionalExpression
  | And
  | Or
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
