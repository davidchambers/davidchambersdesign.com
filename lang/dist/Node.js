const {XOR, OR, subtract, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, empty, reduce, reduceRight, filter, reject, map, flip, of, chain, contains} = {
  XOR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
      default:
        return lhs ^ rhs;
    }
  })(),
  OR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
      default:
        return lhs | rhs;
    }
  })(),
  subtract: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
      default:
        return lhs - rhs;
    }
  })(),
  apply: f => args => f.apply(null, args),
  construct: constructor => args => globalThis.Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[globalThis.Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : globalThis.Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  empty: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return [];
      case "Object":
        return {};
      case "String":
        return "";
      case "Set":
      case "Map":
        return globalThis.Reflect.construct(typeRep, [[]]);
      default:
        return typeRep["fantasy-land/empty"]();
    }
  })(),
  reduce: f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter(x => !f(x)),
  map: f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  of: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return globalThis.Array.of;
      case "Function":
        return x => y => x;
      case "Set":
        return x => globalThis.Reflect.construct(typeRep, [[x]]);
      default:
        return typeRep["fantasy-land/of"];
    }
  })(),
  chain: f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f),
  contains: this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these)
};
const Node = {
  [Symbol.for("match")]: default$ => cases => node => Object.hasOwn(cases, node[Symbol.for("tag")]) ? (() => {
    switch (node[Symbol.for("tag")]) {
      case "NullLiteral":
        return cases.NullLiteral;
      case "BooleanLiteral":
        return cases.BooleanLiteral(node.value);
      case "NumberLiteral":
        return cases.NumberLiteral(node.value);
      case "StringLiteral":
        return cases.StringLiteral(node.value);
      case "TemplateLiteral":
        return cases.TemplateLiteral(node.quasis)(node.expressions);
      case "MemberExpression":
        return cases.MemberExpression(node.object)(node.property);
      case "Identifier":
        return cases.Identifier(node.name);
      case "SpreadElement":
        return cases.SpreadElement(node.argument);
      case "ArrayExpression":
        return cases.ArrayExpression(node.elements);
      case "Property":
        return cases.Property(node.key)(node.value);
      case "ObjectExpression":
        return cases.ObjectExpression(node.properties);
      case "ArrayPattern":
        return cases.ArrayPattern(node.elements);
      case "Elision":
        return cases.Elision;
      case "ObjectPattern":
        return cases.ObjectPattern(node.properties);
      case "RestElement":
        return cases.RestElement(node.argument);
      case "ArrowFunctionExpression":
        return cases.ArrowFunctionExpression(node.parameters)(node.body);
      case "PropertyAccessor":
        return cases.PropertyAccessor(node.identifier);
      case "BlockExpression":
        return cases.BlockExpression(node.statements)(node.result);
      case "BlockStatement":
        return cases.BlockStatement(node.statements);
      case "DoBlockExpression":
        return cases.DoBlockExpression(node.operations)(node.result);
      case "ArrowAssignmentStatement":
        return cases.ArrowAssignmentStatement(node.pattern)(node.expression);
      case "UnaryExpression":
        return cases.UnaryExpression(node.operator)(node.argument);
      case "CompositionExpression":
        return cases.CompositionExpression(node.left)(node.right);
      case "InfixCallExpression":
        return cases.InfixCallExpression(node.operator)(node.left)(node.right);
      case "BinaryExpression":
        return cases.BinaryExpression(node.operator)(node.left)(node.right);
      case "ConcatenationExpression":
        return cases.ConcatenationExpression(node.left)(node.right);
      case "MapExpression":
        return cases.MapExpression(node.left)(node.right);
      case "BindExpression":
        return cases.BindExpression(node.left)(node.right);
      case "LogicalExpression":
        return cases.LogicalExpression(node.operator)(node.left)(node.right);
      case "ConditionalExpression":
        return cases.ConditionalExpression(node.predicate)(node.consequent)(node.alternative);
      case "SwitchExpression":
        return cases.SwitchExpression(node.discriminant)(node.cases);
      case "SwitchCase":
        return cases.SwitchCase(node.predicates)(node.consequent);
      case "PipeExpression":
        return cases.PipeExpression(node.head)(node.body);
      case "MethodCallExpression":
        return cases.MethodCallExpression(node.name);
      case "CallExpression":
        return cases.CallExpression(node.callee)(node.arguments);
      case "ImportDeclaration":
        return cases.ImportDeclaration(node.source)(node.specifiers);
      case "ImportAllDeclaration":
        return cases.ImportAllDeclaration(node.source)(node.hiding);
      case "ImportDefaultSpecifier":
        return cases.ImportDefaultSpecifier(node.local);
      case "ImportSpecifier":
        return cases.ImportSpecifier(node.imported)(node.local);
      case "ImportNamespaceSpecifier":
        return cases.ImportNamespaceSpecifier(node.local);
      case "ExportNamedDeclaration":
        return cases.ExportNamedDeclaration(node.specifiers);
      case "ExportDefaultDeclaration":
        return cases.ExportDefaultDeclaration(node.declaration);
      case "ExportSpecifier":
        return cases.ExportSpecifier(node.local)(node.exported);
      case "VariableDeclaration":
        return cases.VariableDeclaration(node.pattern)(node.expression);
      case "FunctionDeclaration":
        return cases.FunctionDeclaration(node.name)(node.parameters)(node.body);
      case "ExpressionStatement":
        return cases.ExpressionStatement(node.expression);
      case "Module":
        return cases.Module(node.imports)(node.exports)(node.statements);
      case "DataTypeDeclaration":
        return cases.DataTypeDeclaration(node.name)(node.constructors);
    }
  })() : default$(node),
  NullLiteral: {
    [Symbol.for("tag")]: "NullLiteral"
  },
  BooleanLiteral: value => ({
    [Symbol.for("tag")]: "BooleanLiteral",
    value
  }),
  NumberLiteral: value => ({
    [Symbol.for("tag")]: "NumberLiteral",
    value
  }),
  StringLiteral: value => ({
    [Symbol.for("tag")]: "StringLiteral",
    value
  }),
  TemplateLiteral: quasis => expressions => ({
    [Symbol.for("tag")]: "TemplateLiteral",
    quasis,
    expressions
  }),
  MemberExpression: object => property => ({
    [Symbol.for("tag")]: "MemberExpression",
    object,
    property
  }),
  Identifier: name => ({
    [Symbol.for("tag")]: "Identifier",
    name
  }),
  SpreadElement: argument => ({
    [Symbol.for("tag")]: "SpreadElement",
    argument
  }),
  ArrayExpression: elements => ({
    [Symbol.for("tag")]: "ArrayExpression",
    elements
  }),
  Property: key => value => ({
    [Symbol.for("tag")]: "Property",
    key,
    value
  }),
  ObjectExpression: properties => ({
    [Symbol.for("tag")]: "ObjectExpression",
    properties
  }),
  ArrayPattern: elements => ({
    [Symbol.for("tag")]: "ArrayPattern",
    elements
  }),
  Elision: {
    [Symbol.for("tag")]: "Elision"
  },
  ObjectPattern: properties => ({
    [Symbol.for("tag")]: "ObjectPattern",
    properties
  }),
  RestElement: argument => ({
    [Symbol.for("tag")]: "RestElement",
    argument
  }),
  ArrowFunctionExpression: parameters => body => ({
    [Symbol.for("tag")]: "ArrowFunctionExpression",
    parameters,
    body
  }),
  PropertyAccessor: identifier => ({
    [Symbol.for("tag")]: "PropertyAccessor",
    identifier
  }),
  BlockExpression: statements => result => ({
    [Symbol.for("tag")]: "BlockExpression",
    statements,
    result
  }),
  BlockStatement: statements => ({
    [Symbol.for("tag")]: "BlockStatement",
    statements
  }),
  DoBlockExpression: operations => result => ({
    [Symbol.for("tag")]: "DoBlockExpression",
    operations,
    result
  }),
  ArrowAssignmentStatement: pattern => expression => ({
    [Symbol.for("tag")]: "ArrowAssignmentStatement",
    pattern,
    expression
  }),
  UnaryExpression: operator => argument => ({
    [Symbol.for("tag")]: "UnaryExpression",
    operator,
    argument
  }),
  CompositionExpression: left => right => ({
    [Symbol.for("tag")]: "CompositionExpression",
    left,
    right
  }),
  InfixCallExpression: operator => left => right => ({
    [Symbol.for("tag")]: "InfixCallExpression",
    operator,
    left,
    right
  }),
  BinaryExpression: operator => left => right => ({
    [Symbol.for("tag")]: "BinaryExpression",
    operator,
    left,
    right
  }),
  ConcatenationExpression: left => right => ({
    [Symbol.for("tag")]: "ConcatenationExpression",
    left,
    right
  }),
  MapExpression: left => right => ({
    [Symbol.for("tag")]: "MapExpression",
    left,
    right
  }),
  BindExpression: left => right => ({
    [Symbol.for("tag")]: "BindExpression",
    left,
    right
  }),
  LogicalExpression: operator => left => right => ({
    [Symbol.for("tag")]: "LogicalExpression",
    operator,
    left,
    right
  }),
  ConditionalExpression: predicate => consequent => alternative => ({
    [Symbol.for("tag")]: "ConditionalExpression",
    predicate,
    consequent,
    alternative
  }),
  SwitchExpression: discriminant => cases => ({
    [Symbol.for("tag")]: "SwitchExpression",
    discriminant,
    cases
  }),
  SwitchCase: predicates => consequent => ({
    [Symbol.for("tag")]: "SwitchCase",
    predicates,
    consequent
  }),
  PipeExpression: head => body => ({
    [Symbol.for("tag")]: "PipeExpression",
    head,
    body
  }),
  MethodCallExpression: name => ({
    [Symbol.for("tag")]: "MethodCallExpression",
    name
  }),
  CallExpression: callee => arguments$ => ({
    [Symbol.for("tag")]: "CallExpression",
    callee,
    arguments: arguments$
  }),
  ImportDeclaration: source => specifiers => ({
    [Symbol.for("tag")]: "ImportDeclaration",
    source,
    specifiers
  }),
  ImportAllDeclaration: source => hiding => ({
    [Symbol.for("tag")]: "ImportAllDeclaration",
    source,
    hiding
  }),
  ImportDefaultSpecifier: local => ({
    [Symbol.for("tag")]: "ImportDefaultSpecifier",
    local
  }),
  ImportSpecifier: imported => local => ({
    [Symbol.for("tag")]: "ImportSpecifier",
    imported,
    local
  }),
  ImportNamespaceSpecifier: local => ({
    [Symbol.for("tag")]: "ImportNamespaceSpecifier",
    local
  }),
  ExportNamedDeclaration: specifiers => ({
    [Symbol.for("tag")]: "ExportNamedDeclaration",
    specifiers
  }),
  ExportDefaultDeclaration: declaration => ({
    [Symbol.for("tag")]: "ExportDefaultDeclaration",
    declaration
  }),
  ExportSpecifier: local => exported => ({
    [Symbol.for("tag")]: "ExportSpecifier",
    local,
    exported
  }),
  VariableDeclaration: pattern => expression => ({
    [Symbol.for("tag")]: "VariableDeclaration",
    pattern,
    expression
  }),
  FunctionDeclaration: name => parameters => body => ({
    [Symbol.for("tag")]: "FunctionDeclaration",
    name,
    parameters,
    body
  }),
  ExpressionStatement: expression => ({
    [Symbol.for("tag")]: "ExpressionStatement",
    expression
  }),
  Module: imports => exports => statements => ({
    [Symbol.for("tag")]: "Module",
    imports,
    exports,
    statements
  }),
  DataTypeDeclaration: name => constructors => ({
    [Symbol.for("tag")]: "DataTypeDeclaration",
    name,
    constructors
  })
};
export default Node;
