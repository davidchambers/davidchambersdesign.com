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

export interface Binding {
  readonly name: string;
  readonly parameterNames: ReadonlyArray<string>;
  readonly expression: Expression;
}

export interface Let {
  readonly type: 'let';
  readonly bindings: ReadonlyArray<Binding>;
  readonly body: Expression;
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

export interface If {
  readonly type: 'if';
  readonly predicate: Expression;
  readonly consequent: Expression;
  readonly alternative: Expression;
}

export interface Case {
  readonly predicate: Expression;
  readonly consequent: Expression;
}

export interface Switch {
  readonly type: 'switch';
  readonly discriminant: Expression;
  readonly cases: ReadonlyArray<Case>;
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
  | Let
  | And
  | Or
  | If
  | Switch
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

export type Statement =
  | StarImport
  | NamedImports
  | DefaultImport
  | DefaultExport
  | NamedExports
  | Declaration
  | Expression
